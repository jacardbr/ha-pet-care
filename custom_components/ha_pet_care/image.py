"""Image entity with the profile photo of each pet."""

from __future__ import annotations

import mimetypes

from homeassistant.components.image import ImageEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import PetCareConfigEntry
from .const import signal_updated
from .store import PetCareStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: PetCareConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Create a photo entity for every pet."""
    store = entry.runtime_data
    async_add_entities(PetPhotoImage(hass, store, pet_id) for pet_id in store.pets)


def _read_file(path: str) -> bytes | None:
    """Read a file (runs in the executor)."""
    try:
        with open(path, "rb") as file:
            return file.read()
    except OSError:
        return None


class PetPhotoImage(ImageEntity):
    """The profile photo of a pet."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_translation_key = "photo"

    def __init__(self, hass: HomeAssistant, store: PetCareStore, pet_id: str) -> None:
        """Initialize the image entity."""
        super().__init__(hass)
        self._store = store
        self._pet_id = pet_id
        self._attr_unique_id = f"{store.entry_id}_{pet_id}_photo"
        self._attr_device_info = store.device_info(pet_id)
        self._refresh()

    def _refresh(self) -> None:
        """Update the cached timestamp and content type from the stored data."""
        pet = self._store.pets.get(self._pet_id) or {}
        updated = pet.get("photo_updated")
        self._attr_image_last_updated = (
            dt_util.parse_datetime(updated) if updated else None
        )
        path = self._store.photo_path(self._pet_id)
        self._attr_content_type = (
            mimetypes.guess_type(path)[0] if path else None
        ) or "image/jpeg"

    async def async_added_to_hass(self) -> None:
        """Subscribe to data changes."""
        await super().async_added_to_hass()
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, signal_updated(self._store.entry_id), self._handle_update
            )
        )

    @callback
    def _handle_update(self) -> None:
        self._refresh()
        self.async_write_ha_state()

    async def async_image(self) -> bytes | None:
        """Return the photo bytes."""
        path = self._store.photo_path(self._pet_id)
        if not path:
            return None
        return await self.hass.async_add_executor_job(_read_file, path)
