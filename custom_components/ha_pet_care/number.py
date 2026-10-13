"""Single field to log the pet's weight: shows the last weight, saves on entry."""

from __future__ import annotations

from homeassistant.components.number import NumberEntity, NumberMode
from homeassistant.const import UnitOfMass
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from . import PetCareConfigEntry
from .const import MAX_WEIGHT_KG, signal_updated
from .store import PetCareStore


async def async_setup_entry(
    hass: HomeAssistant,
    entry: PetCareConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Create the weight field of every pet."""
    store = entry.runtime_data
    async_add_entities(PetLogWeightNumber(store, pet_id) for pet_id in store.pets)


class PetLogWeightNumber(NumberEntity):
    """Shows the latest weight (kg); typing a new value logs it with today's date."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_translation_key = "log_weight"
    _attr_mode = NumberMode.BOX
    _attr_native_min_value = 0.01
    _attr_native_max_value = MAX_WEIGHT_KG
    _attr_native_step = 0.01
    _attr_native_unit_of_measurement = UnitOfMass.KILOGRAMS

    def __init__(self, store: PetCareStore, pet_id: str) -> None:
        """Initialize the number entity."""
        self._store = store
        self._pet_id = pet_id
        self._attr_unique_id = f"{store.entry_id}_{pet_id}_log_weight"
        self._attr_device_info = store.device_info(pet_id)

    @property
    def native_value(self) -> float | None:
        """Return the most recent weight."""
        entries = self._store.weights(self._pet_id)
        return entries[0]["weight"] if entries else None

    async def async_set_native_value(self, value: float) -> None:
        """Log the typed weight (or correct today's entry)."""
        await self._store.async_set_weight_today(self._pet_id, value)

    async def async_added_to_hass(self) -> None:
        """Refresh when the data changes."""
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, signal_updated(self._store.entry_id), self._handle_update
            )
        )

    @callback
    def _handle_update(self) -> None:
        self.async_write_ha_state()
