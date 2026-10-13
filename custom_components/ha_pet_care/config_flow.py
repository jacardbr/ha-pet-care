"""Config and options flow for HA Pet Care."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.selector import (
    DateSelector,
    FileSelector,
    FileSelectorConfig,
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
)

from .const import (
    CONF_BIRTHDATE,
    CONF_NAME,
    CONF_PET,
    CONF_PHOTO,
    CONF_SPECIES,
    DOMAIN,
    SPECIES,
)

PHOTO_SELECTOR = FileSelector(FileSelectorConfig(accept="image/*"))


class PetCareConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the initial setup (a single, empty entry)."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Confirm the setup."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="HA Pet Care", data={})
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow used to manage pets."""
        return PetCareOptionsFlow()


class PetCareOptionsFlow(OptionsFlow):
    """Add pets, change photos and remove pets."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show the main menu."""
        return self.async_show_menu(
            step_id="init", menu_options=["add_pet", "set_photo", "remove_pet"]
        )

    async def async_step_add_pet(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Add a pet, optionally with an uploaded photo."""
        store = self.config_entry.runtime_data
        errors: dict[str, str] = {}

        if user_input is not None:
            try:
                await store.async_add_pet(
                    user_input[CONF_NAME],
                    user_input[CONF_SPECIES],
                    user_input.get(CONF_BIRTHDATE),
                    user_input.get(CONF_PHOTO),
                )
            except ServiceValidationError as err:
                errors["base"] = err.translation_key or "unknown"
            else:
                await self.hass.config_entries.async_reload(self.config_entry.entry_id)
                return self.async_create_entry(data={})

        schema = vol.Schema(
            {
                vol.Required(CONF_NAME): TextSelector(),
                vol.Required(CONF_SPECIES, default="dog"): SelectSelector(
                    SelectSelectorConfig(
                        options=SPECIES,
                        translation_key="species",
                        mode=SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Optional(CONF_BIRTHDATE): DateSelector(),
                vol.Optional(CONF_PHOTO): PHOTO_SELECTOR,
            }
        )
        # An uploaded file is consumed on submit, so it is never pre-filled again.
        suggested = {k: v for k, v in (user_input or {}).items() if k != CONF_PHOTO}
        return self.async_show_form(
            step_id="add_pet",
            data_schema=self.add_suggested_values_to_schema(schema, suggested),
            errors=errors,
        )

    async def async_step_set_photo(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Change the photo of an existing pet."""
        store = self.config_entry.runtime_data
        if not store.pets:
            return self.async_abort(reason="no_pets")
        errors: dict[str, str] = {}

        if user_input is not None:
            try:
                await store.async_set_photo_upload(
                    user_input[CONF_PET], user_input[CONF_PHOTO]
                )
            except ServiceValidationError as err:
                errors["base"] = err.translation_key or "unknown"
            else:
                return self.async_create_entry(data={})

        schema = vol.Schema(
            {
                vol.Required(CONF_PET): SelectSelector(
                    SelectSelectorConfig(
                        options=[
                            SelectOptionDict(value=pet_id, label=pet["name"])
                            for pet_id, pet in store.pets.items()
                        ],
                        mode=SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Required(CONF_PHOTO): PHOTO_SELECTOR,
            }
        )
        suggested = {k: v for k, v in (user_input or {}).items() if k != CONF_PHOTO}
        return self.async_show_form(
            step_id="set_photo",
            data_schema=self.add_suggested_values_to_schema(schema, suggested),
            errors=errors,
        )

    async def async_step_remove_pet(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Remove a pet and its whole history."""
        store = self.config_entry.runtime_data
        if not store.pets:
            return self.async_abort(reason="no_pets")

        if user_input is not None:
            pet_id = user_input[CONF_PET]
            device_registry = dr.async_get(self.hass)
            device = device_registry.async_get_device(
                identifiers={(DOMAIN, store.device_identifier(pet_id))}
            )
            await store.async_remove_pet(pet_id)
            if device is not None:
                device_registry.async_remove_device(device.id)
            await self.hass.config_entries.async_reload(self.config_entry.entry_id)
            return self.async_create_entry(data={})

        schema = vol.Schema(
            {
                vol.Required(CONF_PET): SelectSelector(
                    SelectSelectorConfig(
                        options=[
                            SelectOptionDict(value=pet_id, label=pet["name"])
                            for pet_id, pet in store.pets.items()
                        ],
                        mode=SelectSelectorMode.DROPDOWN,
                    )
                )
            }
        )
        return self.async_show_form(step_id="remove_pet", data_schema=schema)
