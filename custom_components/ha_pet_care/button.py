"""Buttons on the pet's device screen that log a record."""

from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import PetCareConfigEntry
from .const import BUTTON_RECORD_TYPES
from .store import PetCareStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: PetCareConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Create the buttons of every pet."""
    store = entry.runtime_data
    entities: list[ButtonEntity] = []
    for pet_id in store.pets:
        entities.extend(
            PetAddRecordButton(store, pet_id, key) for key in BUTTON_RECORD_TYPES
        )
    async_add_entities(entities)


class PetAddRecordButton(ButtonEntity):
    """Logs a vaccine, dewormer, bath, grooming or vet visit dated today."""

    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, store: PetCareStore, pet_id: str, record_type: str) -> None:
        """Initialize the button."""
        self._store = store
        self._pet_id = pet_id
        self._record_type = record_type
        self._attr_translation_key = f"add_{record_type}"
        self._attr_unique_id = f"{store.entry_id}_{pet_id}_add_{record_type}"
        self._attr_device_info = store.device_info(pet_id)

    async def async_press(self) -> None:
        """Save the record, with the optional description and next due date."""
        await self._store.async_add_pending_record(self._pet_id, self._record_type)
