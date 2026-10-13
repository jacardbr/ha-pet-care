"""Sensors for HA Pet Care: last occurrence of each record type and next due date."""

from __future__ import annotations

import calendar
from datetime import date, datetime
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import UnitOfMass
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from . import PetCareConfigEntry
from .const import (
    DEWORMING_INTERVAL_MONTHS,
    HISTORY_LIMIT,
    RECORD_DEWORMING,
    RECORD_TYPES,
    RECORD_VACCINE,
    VACCINE_INTERVAL_MONTHS,
    WEIGHT_HISTORY_LIMIT,
    signal_updated,
)
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
        entities.append(PetNextVaccineSensor(store, pet_id))
        entities.append(PetNextDewormerSensor(store, pet_id))
        entities.append(PetAgeSensor(store, pet_id))
        entities.append(PetWeightSensor(store, pet_id))
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


def _add_months(start: date, months: int) -> date:
    """Return start plus whole months, clamping the day (Aug 31 + 6 -> Feb 28)."""
    index = start.year * 12 + start.month - 1 + months
    year, month = divmod(index, 12)
    month += 1
    return date(year, month, min(start.day, calendar.monthrange(year, month)[1]))


class PetNextCareSensor(PetBaseSensor):
    """Next due date of a recurring care (vaccine, dewormer).

    It is filled automatically: the last record's date plus a fixed interval.
    A "next due" date typed on the latest record takes priority.
    """

    def __init__(
        self,
        store: PetCareStore,
        pet_id: str,
        key: str,
        record_type: str,
        interval_months: int,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(store, pet_id, key)
        self._record_type = record_type
        self._interval_months = interval_months

    def _next(self) -> tuple[date, dict[str, Any], str] | None:
        """Return (next date, last record, source) or None without records."""
        records = self._store.records(self._pet_id, self._record_type)
        if not records:
            return None
        last = records[0]
        if last["next_due"]:
            return date.fromisoformat(last["next_due"]), last, "manual"
        return (
            _add_months(date.fromisoformat(last["date"]), self._interval_months),
            last,
            "automatic",
        )

    @property
    def native_value(self) -> date | None:
        """Return the next due date."""
        found = self._next()
        return found[0] if found else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return how the date was obtained and how far away it is."""
        found = self._next()
        if found is None:
            return {"interval_months": self._interval_months}
        due, last, source = found
        days_until = _days_between(dt_util.now().date(), due)
        return {
            "last_date": last["date"],
            "last_description": last["description"],
            "source": source,
            "interval_months": self._interval_months,
            "days_until": days_until,
            "overdue": days_until < 0,
        }


class PetNextVaccineSensor(PetNextCareSensor):
    """Next vaccine: one year after the last vaccine."""

    def __init__(self, store: PetCareStore, pet_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(
            store, pet_id, "next_vaccine", RECORD_VACCINE, VACCINE_INTERVAL_MONTHS
        )


class PetNextDewormerSensor(PetNextCareSensor):
    """Next dewormer: six months after the last dewormer."""

    def __init__(self, store: PetCareStore, pet_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(
            store, pet_id, "next_dewormer", RECORD_DEWORMING, DEWORMING_INTERVAL_MONTHS
        )


def _age_parts(birth: date, today: date) -> tuple[int, int, int]:
    """Return (full years, remaining months, total months) since the birth date."""
    total_months = (today.year - birth.year) * 12 + today.month - birth.month
    if today.day < birth.day:
        total_months -= 1
    return total_months // 12, total_months % 12, total_months


def _next_birthday(birth: date, today: date) -> date:
    """Return the next birthday (today counts)."""

    def on_year(year: int) -> date:
        try:
            return birth.replace(year=year)
        except ValueError:  # 29 de fevereiro em ano nao bissexto
            return date(year, 2, 28)

    candidate = on_year(today.year)
    return candidate if candidate >= today else on_year(today.year + 1)


class PetAgeSensor(PetBaseSensor):
    """Age of the pet as text, calculated from its birth date."""

    _attr_device_class = None

    def __init__(self, store: PetCareStore, pet_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(store, pet_id, "age")

    def _birthdate(self) -> date | None:
        value = self._store.pets[self._pet_id].get("birthdate")
        if not value:
            return None
        try:
            birth = date.fromisoformat(value)
        except ValueError:
            return None
        return birth if birth <= dt_util.now().date() else None

    @property
    def native_value(self) -> str | None:
        """Return the age, e.g. "2 anos e 3 meses" / "2 years and 3 months"."""
        birth = self._birthdate()
        if birth is None:
            return None
        today = dt_util.now().date()
        years, months, _ = _age_parts(birth, today)
        days = (today - birth).days
        if self.hass.config.language.lower().startswith("pt"):
            units = (("ano", "anos"), ("mês", "meses"), ("dia", "dias"))
            joiner = " e "
        else:
            units = (("year", "years"), ("month", "months"), ("day", "days"))
            joiner = " and "
        parts = []
        if years:
            parts.append(f"{years} {units[0][years != 1]}")
        if months:
            parts.append(f"{months} {units[1][months != 1]}")
        if not parts:
            parts.append(f"{days} {units[2][days != 1]}")
        return joiner.join(parts)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the age in numbers and birthday information."""
        birth = self._birthdate()
        if birth is None:
            return {}
        today = dt_util.now().date()
        years, months, total_months = _age_parts(birth, today)
        days = (today - birth).days
        next_birthday = _next_birthday(birth, today)
        return {
            "birthdate": birth.isoformat(),
            "years": years,
            "months": months,
            "total_months": total_months,
            "total_days": days,
            "decimal_years": round(days / 365.25, 1),
            "next_birthday": next_birthday.isoformat(),
            "days_until_birthday": (next_birthday - today).days,
            "is_birthday": next_birthday == today,
        }


class PetWeightSensor(PetBaseSensor):
    """Latest weight of the pet in kg, with the growth history in the attributes."""

    _attr_device_class = SensorDeviceClass.WEIGHT
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfMass.KILOGRAMS
    _attr_suggested_display_precision = 2

    def __init__(self, store: PetCareStore, pet_id: str) -> None:
        """Initialize the sensor."""
        super().__init__(store, pet_id, "weight")

    @property
    def native_value(self) -> float | None:
        """Return the most recent weight."""
        entries = self._store.weights(self._pet_id)
        return entries[0]["weight"] if entries else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return the date, the change and the history of weights."""
        entries = self._store.weights(self._pet_id)
        attrs: dict[str, Any] = {"total_records": len(entries)}
        if entries:
            last = entries[0]
            attrs.update(
                {
                    "date": last["date"],
                    "record_id": last["id"],
                    "days_since": _days_between(
                        date.fromisoformat(last["date"]), dt_util.now().date()
                    ),
                }
            )
            if len(entries) > 1:
                previous, first = entries[1], entries[-1]
                attrs.update(
                    {
                        "previous_weight": previous["weight"],
                        "change": round(last["weight"] - previous["weight"], 3),
                        "first_weight": first["weight"],
                        "change_since_first": round(
                            last["weight"] - first["weight"], 3
                        ),
                    }
                )
        attrs["history"] = [
            {"record_id": e["id"], "date": e["date"], "weight": e["weight"]}
            for e in entries[:WEIGHT_HISTORY_LIMIT]
        ]
        return attrs
