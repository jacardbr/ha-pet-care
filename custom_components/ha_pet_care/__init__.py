"""HA Pet Care: keep track of your pets' health and care in Home Assistant."""

from __future__ import annotations

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType
from homeassistant.util import dt as dt_util

from .const import (
    ATTR_DATE,
    ATTR_DESCRIPTION,
    ATTR_NEXT_DUE,
    ATTR_NOTES,
    ATTR_PATH,
    ATTR_PET,
    ATTR_RECORD_ID,
    ATTR_TYPE,
    DOMAIN,
    EVENT_RECORD_ADDED,
    RECORD_TYPES,
    SERVICE_ADD_RECORD,
    SERVICE_REMOVE_RECORD,
    SERVICE_SET_PHOTO,
)
from .store import PetCareStore

PLATFORMS = [Platform.SENSOR, Platform.IMAGE]

type PetCareConfigEntry = ConfigEntry[PetCareStore]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

ADD_RECORD_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_PET): cv.string,
        vol.Required(ATTR_TYPE): vol.In(RECORD_TYPES),
        vol.Optional(ATTR_DATE): cv.date,
        vol.Optional(ATTR_DESCRIPTION): cv.string,
        vol.Optional(ATTR_NOTES): cv.string,
        vol.Optional(ATTR_NEXT_DUE): cv.date,
    }
)
REMOVE_RECORD_SCHEMA = vol.Schema(
    {vol.Required(ATTR_PET): cv.string, vol.Required(ATTR_RECORD_ID): cv.string}
)
SET_PHOTO_SCHEMA = vol.Schema(
    {vol.Required(ATTR_PET): cv.string, vol.Required(ATTR_PATH): cv.string}
)


def _get_store(hass: HomeAssistant) -> PetCareStore:
    """Return the store of the loaded config entry."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.state is ConfigEntryState.LOADED:
            return entry.runtime_data
    raise ServiceValidationError(
        translation_domain=DOMAIN, translation_key="not_loaded"
    )


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the integration's services."""

    async def add_record(call: ServiceCall) -> dict[str, str]:
        store = _get_store(call.hass)
        pet_id = store.get_pet_id(call.data[ATTR_PET])
        record = await store.async_add_record(
            pet_id,
            call.data[ATTR_TYPE],
            call.data.get(ATTR_DATE) or dt_util.now().date(),
            call.data.get(ATTR_DESCRIPTION),
            call.data.get(ATTR_NOTES),
            call.data.get(ATTR_NEXT_DUE),
        )
        call.hass.bus.async_fire(
            EVENT_RECORD_ADDED,
            {
                "pet_id": pet_id,
                "pet_name": store.pets[pet_id]["name"],
                "type": record["type"],
                "date": record["date"],
                "description": record["description"],
                "next_due": record["next_due"],
                "record_id": record["id"],
            },
        )
        return {"record_id": record["id"]}

    async def remove_record(call: ServiceCall) -> None:
        store = _get_store(call.hass)
        pet_id = store.get_pet_id(call.data[ATTR_PET])
        await store.async_remove_record(pet_id, call.data[ATTR_RECORD_ID])

    async def set_photo(call: ServiceCall) -> None:
        store = _get_store(call.hass)
        pet_id = store.get_pet_id(call.data[ATTR_PET])
        await store.async_set_photo(pet_id, call.data[ATTR_PATH])

    hass.services.async_register(
        DOMAIN,
        SERVICE_ADD_RECORD,
        add_record,
        schema=ADD_RECORD_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_REMOVE_RECORD, remove_record, schema=REMOVE_RECORD_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_SET_PHOTO, set_photo, schema=SET_PHOTO_SCHEMA
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: PetCareConfigEntry) -> bool:
    """Set up HA Pet Care from a config entry."""
    store = PetCareStore(hass, entry.entry_id)
    await store.async_load()
    entry.runtime_data = store
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: PetCareConfigEntry) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def async_remove_entry(hass: HomeAssistant, entry: PetCareConfigEntry) -> None:
    """Delete stored data when the integration is removed."""
    await PetCareStore(hass, entry.entry_id).async_remove_storage()
