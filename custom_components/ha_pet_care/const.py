"""Constants for the HA Pet Care integration."""

from __future__ import annotations

DOMAIN = "ha_pet_care"

STORAGE_VERSION = 1
PHOTO_DIR = "ha_pet_care_photos"
PHOTO_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

# Record types (also used as sensor translation keys)
RECORD_VACCINE = "vaccine"
RECORD_DEWORMING = "deworming"
RECORD_EXAM = "exam"
RECORD_BATH = "bath"
RECORD_GROOMING = "grooming"
RECORD_VET_VISIT = "vet_visit"

RECORD_TYPES = [
    RECORD_VACCINE,
    RECORD_DEWORMING,
    RECORD_EXAM,
    RECORD_BATH,
    RECORD_GROOMING,
    RECORD_VET_VISIT,
]

SPECIES = ["dog", "cat", "other"]

# Config / options flow keys
CONF_NAME = "name"
CONF_SPECIES = "species"
CONF_BIRTHDATE = "birthdate"
CONF_PHOTO = "photo"
CONF_PET = "pet"

# Service fields
ATTR_PET = "pet"
ATTR_TYPE = "type"
ATTR_DATE = "date"
ATTR_DESCRIPTION = "description"
ATTR_NOTES = "notes"
ATTR_NEXT_DUE = "next_due"
ATTR_RECORD_ID = "record_id"
ATTR_PATH = "path"

SERVICE_ADD_RECORD = "add_record"
SERVICE_REMOVE_RECORD = "remove_record"
SERVICE_SET_PHOTO = "set_photo"

EVENT_RECORD_ADDED = f"{DOMAIN}_record_added"

HISTORY_LIMIT = 10


def signal_updated(entry_id: str) -> str:
    """Return the dispatcher signal used to notify entities of data changes."""
    return f"{DOMAIN}_updated_{entry_id}"
