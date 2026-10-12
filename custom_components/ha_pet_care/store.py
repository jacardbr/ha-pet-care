"""Persistent storage and data helpers for the HA Pet Care integration."""

from __future__ import annotations

import os
import shutil
import uuid
from datetime import date
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util, slugify

from .const import DOMAIN, PHOTO_DIR, PHOTO_EXTENSIONS, STORAGE_VERSION, signal_updated


def _copy_photo(source: str, dest_dir: str, dest_name: str, old_name: str | None) -> None:
    """Copy a photo into the integration's folder (runs in the executor)."""
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, dest_name)
    if os.path.abspath(source) != os.path.abspath(dest):
        shutil.copyfile(source, dest)
    if old_name and old_name != dest_name:
        try:
            os.remove(os.path.join(dest_dir, old_name))
        except OSError:
            pass


def _remove_file(path: str) -> None:
    """Remove a file, ignoring errors (runs in the executor)."""
    try:
        os.remove(path)
    except OSError:
        pass


class PetCareStore:
    """Keeps pets and their records, persisted in .storage."""

    def __init__(self, hass: HomeAssistant, entry_id: str) -> None:
        """Initialize the store."""
        self.hass = hass
        self.entry_id = entry_id
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, f"{DOMAIN}.{entry_id}"
        )
        self._data: dict[str, Any] = {"pets": {}}

    # ------------------------------------------------------------------ io
    async def async_load(self) -> None:
        """Load data from disk."""
        data = await self._store.async_load()
        if isinstance(data, dict) and isinstance(data.get("pets"), dict):
            self._data = data

    async def async_remove_storage(self) -> None:
        """Delete the storage file."""
        await self._store.async_remove()

    async def _async_save(self) -> None:
        await self._store.async_save(self._data)
        async_dispatcher_send(self.hass, signal_updated(self.entry_id))

    # ---------------------------------------------------------------- pets
    @property
    def pets(self) -> dict[str, dict[str, Any]]:
        """Return all pets keyed by pet id."""
        return self._data["pets"]

    def device_identifier(self, pet_id: str) -> str:
        """Return the device identifier of a pet."""
        return f"{self.entry_id}_{pet_id}"

    def device_info(self, pet_id: str) -> DeviceInfo:
        """Return the device info of a pet."""
        pet = self.pets[pet_id]
        return DeviceInfo(
            identifiers={(DOMAIN, self.device_identifier(pet_id))},
            name=pet["name"],
            manufacturer="HA Pet Care",
            model=pet.get("species"),
        )

    def resolve_pet(self, value: str) -> str | None:
        """Find a pet id from an id or a (case-insensitive) name."""
        value = value.strip()
        key = slugify(value)
        if key in self.pets:
            return key
        for pet_id, pet in self.pets.items():
            if pet["name"].casefold() == value.casefold():
                return pet_id
        return None

    def get_pet_id(self, value: str) -> str:
        """Return the pet id or raise a validation error."""
        pet_id = self.resolve_pet(value)
        if pet_id is None:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="pet_not_found",
                translation_placeholders={"pet": value},
            )
        return pet_id

    async def async_add_pet(
        self, name: str, species: str, birthdate: str | None = None
    ) -> str:
        """Create a pet and return its id."""
        name = name.strip()
        if self.resolve_pet(name) is not None:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="pet_exists",
                translation_placeholders={"pet": name},
            )
        base = slugify(name) or "pet"
        pet_id, n = base, 2
        while pet_id in self.pets:
            pet_id = f"{base}_{n}"
            n += 1
        self.pets[pet_id] = {
            "name": name,
            "species": species,
            "birthdate": birthdate or None,
            "photo": None,
            "photo_updated": None,
            "records": [],
        }
        await self._async_save()
        return pet_id

    async def async_remove_pet(self, pet_id: str) -> None:
        """Delete a pet, its history and its photo."""
        pet = self.pets.pop(pet_id, None)
        if pet and pet.get("photo"):
            await self.hass.async_add_executor_job(_remove_file, self._photo_file(pet))
        await self._async_save()

    # --------------------------------------------------------------- photo
    def _photo_file(self, pet: dict[str, Any]) -> str:
        return os.path.join(self.hass.config.path(PHOTO_DIR), pet["photo"])

    def photo_path(self, pet_id: str) -> str | None:
        """Return the stored photo path of a pet, if any."""
        pet = self.pets.get(pet_id)
        if not pet or not pet.get("photo"):
            return None
        return self._photo_file(pet)

    async def async_validate_photo(self, source: str) -> str:
        """Validate a photo path and return its lowercase extension."""
        if not self.hass.config.is_allowed_path(source):
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="photo_path_not_allowed",
                translation_placeholders={"path": source},
            )
        ext = os.path.splitext(source)[1].lower()
        if ext not in PHOTO_EXTENSIONS:
            raise ServiceValidationError(
                translation_domain=DOMAIN, translation_key="photo_invalid_type"
            )
        if not await self.hass.async_add_executor_job(os.path.isfile, source):
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="photo_not_found",
                translation_placeholders={"path": source},
            )
        return ext

    async def async_set_photo(self, pet_id: str, source: str) -> None:
        """Copy a photo into the integration's folder and link it to a pet."""
        source = source.strip()
        ext = await self.async_validate_photo(source)
        pet = self.pets[pet_id]
        dest_name = f"{self.entry_id}_{pet_id}{ext}"
        await self.hass.async_add_executor_job(
            _copy_photo,
            source,
            self.hass.config.path(PHOTO_DIR),
            dest_name,
            pet.get("photo"),
        )
        pet["photo"] = dest_name
        pet["photo_updated"] = dt_util.utcnow().isoformat()
        await self._async_save()

    # ------------------------------------------------------------- records
    def records(self, pet_id: str, record_type: str | None = None) -> list[dict[str, Any]]:
        """Return records of a pet, newest first."""
        items = [
            r
            for r in self.pets[pet_id]["records"]
            if record_type is None or r["type"] == record_type
        ]
        return sorted(items, key=lambda r: (r["date"], r["created"]), reverse=True)

    async def async_add_record(
        self,
        pet_id: str,
        record_type: str,
        when: date,
        description: str | None = None,
        notes: str | None = None,
        next_due: date | None = None,
    ) -> dict[str, Any]:
        """Add a record to a pet."""
        if next_due is not None and next_due < when:
            raise ServiceValidationError(
                translation_domain=DOMAIN, translation_key="invalid_next_due"
            )
        record = {
            "id": uuid.uuid4().hex[:8],
            "type": record_type,
            "date": when.isoformat(),
            "description": (description or "").strip() or None,
            "notes": (notes or "").strip() or None,
            "next_due": next_due.isoformat() if next_due else None,
            "created": dt_util.utcnow().isoformat(),
        }
        self.pets[pet_id]["records"].append(record)
        await self._async_save()
        return record

    async def async_remove_record(self, pet_id: str, record_id: str) -> None:
        """Remove a record from a pet."""
        records = self.pets[pet_id]["records"]
        for index, record in enumerate(records):
            if record["id"] == record_id:
                del records[index]
                await self._async_save()
                return
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="record_not_found",
            translation_placeholders={"record_id": record_id},
        )
