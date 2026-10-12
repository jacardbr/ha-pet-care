"""Sensors for HA Pet Care: last occurrence of each record type and next due date."""

from __future__ import annotations

from datetime import date, datetime
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from . import PetCareConfigEntry
from .const import HISTORY_LIMIT, RECORD_TYPES, signal_updated
from .store import PetCareStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: PetCareConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Create the sensors of every pet."""
    store = entry.runtime_data
    entities: list[SensorEntity] = []
    for pet_id in store.pets:
        entities.extend(PetRecordSensor(store, pet_id, key) for key in RECORD_TYPES)
        entities.append(PetNextDueSensor(store, pet_id))
    async_add_entities(entities)


def _days_between(start: date, end: date) -> int:
    return (end - start).days


class PetBaseSensor(SensorEntity):
    """Base class: date sensors refreshed on data changes and at midnight."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_device_class = SensorDeviceClass.DATE

    def __init__(self, store: PetCareStore, pet_id: str, key: str) -> None:
        """Initialize the sensor."""
        self._store = store
        self._pet_id = pet_id
        self._key = key
        self._attr_translation_key = key
        self._attr_unique_id = f"{store.entry_id}_{pet_id}_{key}"
        self._attr_device_info = store.device_info(pet_id)

    async def async_added_to_hass(self) -> None:
        """Subscribe to data changes and to the day rollover."""
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, signal_updated(self._store.entry_id), self._handle_update
            )
        )
        self.async_on_remove(
            async_track_time_change(
                self.hass, self._handle_midnight, hour=0, minute=0, second=10
            )
        )

    @callback
    def _handle_update(self) -> None:
        self.async_write_ha_state()

    @callback
    def _handle_midnight(self, now: datetime) -> None:
        self.async_write_ha_state()


class PetRecordSensor(PetBaseSensor):
    """Date of the latest record of one type (vaccine, bath, ...)."""

    @property
    def native_value(self) -> date | None:
        """Return the date of the latest record."""
        records = self._store.records(self._pet_id, self._key)
        return date.fromisoformat(records[0]["date"]) if records else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return details of the latest record and a short history."""
        records = self._store.records(self._pet_id, self._key)
        attrs: dict[str, Any] = {"total_records": len(records)}
        if records:
            last = records[0]
            attrs.update(
                {
                    "description": last["description"],
                    "notes": last["notes"],
                    "next_due": last["next_due"],
                    "record_id": last["id"],
                    "days_since": _days_between(
                        date.fromisoformat(last["date"]), dt_util.now().date()
                    ),
                }
            )
        attrs["history"] = [
            {
                "record_id": r["id"],
                "date": r["date"],
                "description": r["description"],
                "notes": r["notes"],
                "next_due": r["next_due"],
            }
            for r in records[:HISTORY_LIMIT]
        ]
        return attrs


class PetNextDueSensor(PetBaseSensor):
    """Closest due date among the latest record of each type (overdue stays visible)."""

    def __init__(self, store: PetCareStore, pet_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(store, pet_id, "next_due")

    def _upcoming(self) -> list[tuple[str, str, dict[str, Any]]]:
        items = []
        for record_type in RECORD_TYPES:
            records = self._store.records(self._pet_id, record_type)
            if records and records[0]["next_due"]:
                items.append((records[0]["next_due"], record_type, records[0]))
        return sorted(items, key=lambda item: item[0])

    @property
    def native_value(self) -> date | None:
        """Return the closest due date."""
        upcoming = self._upcoming()
        return date.fromisoformat(upcoming[0][0]) if upcoming else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return what is due next and every pending due date."""
        upcoming = self._upcoming()
        attrs: dict[str, Any] = {
            "upcoming": {record_type: due for due, record_type, _ in upcoming}
        }
        if upcoming:
            due, record_type, record = upcoming[0]
            attrs.update(
                {
                    "type": record_type,
                    "description": record["description"],
                    "days_until": _days_between(
                        dt_util.now().date(), date.fromisoformat(due)
                    ),
                }
            )
        return attrs
