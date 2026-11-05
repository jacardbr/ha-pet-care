# Changelog

All notable changes to HA Pet Care are listed here. Versions follow the `version` in `custom_components/ha_pet_care/manifest.json` and the GitHub releases.

## [1.1.0] - 2026-11-05

### Added
- **Remedy** record type: sensor (Last remedy), device button and action, with a pill icon. The record keeps the remedy name.
- **Next remedy** sensor and card field (on by default). It has no automatic interval: it shows the next date you set when logging a recurring remedy.
- Card: editable **Next date** when logging, pre-filled with the default period (vaccine 1 year, dewormer 6 months, bath 1 month, grooming 6 months, vet visit 1 year).
- Card: remedy action next to the dewormer and on by default, with a name field, a list of saved remedies to tap, and a **Recurring** checkbox (on its own row) that asks for the next dose date.
- Card: several vaccines can be logged at once; each one is saved and shown in the history as its own line.
- Card editor: collapsible sections (Display, Vaccine list, Remedy list, History, Next due defaults, and the actions, fields and history lists).
- Card editor: custom vaccine list and remedy list; remedy names already logged are added to the remedy list.
- Card editor: **Next due defaults**, the suggested period in days for each event type (empty = default, 0 = no suggestion).
- Card editor: **Change photo** in the Display section, with a framing editor (drag and zoom inside a round guide) before saving.
- `ha_pet_care.set_photo` accepts `file_id` (an image uploaded to Home Assistant) as an alternative to `path`.
- Buy Me a Coffee link in the README and the GitHub sponsor button.

### Changed
- Dewormer icon is now a snake (`mdi:snake`), since Material Design Icons has no worm icon.
- Lists saved by older card versions get new items (such as the remedy action and the Next remedy field) automatically.
- Card editor: on/off options in Display and History are compact rows, and every section uses the same spacing.

### Fixed
- Removing the integration now also deletes the pets' photos in `<config>/ha_pet_care_photos/`.
- Card: a pet without a photo shows its initial instead of a broken image.
- Card editor: the "add" button of the vaccine and remedy lists created a row that disappeared at once, and spaces were removed while typing.

## [1.0.0] - 2026-10-16

### Added
- Card: delete a record or a weight from the History tab (tap the trash icon, then tap again within 3 seconds to confirm).
- Card: weight history list in the History tab.
- Default vaccine list for the card in Portuguese and English.
- README rewritten in English, with screenshots of the card.

## [0.7.0] - 2026-10-15

### Added
- Card: the History tab shows the events as a timeline.

### Changed
- Next bath is now 1 month after the last bath (was 15 days).

## [0.6.0] - 2026-10-15

### Added
- Card: vaccine options to pick when logging a vaccine.

## [0.5.0] - 2026-10-15

### Added
- Card: History tab.
- New brand icon and logos (light and dark).

### Changed
- Card icons updated.

## [0.4.0] - 2026-10-13

### Added
- Card: choose and reorder the fields and actions shown.

## [0.3.0] - 2026-10-13

### Added
- **HA Pet Care** Lovelace card, served by the integration (no separate install).
- **Next bath** sensor.

## [0.2.0] - 2026-10-13

### Added
- Next vaccine (1 year after the last one) and Next dewormer (6 months after the last one) sensors.
- Weight sensor with history, and a single **Log weight** field on the device page.
- One button per record type on the device page (vaccine, dewormer, bath, grooming, vet visit).
- `ha_pet_care.add_record`, `remove_record`, `add_weight` and `set_photo` actions.
- Photo upload when adding a pet, and **Change a pet's photo** in the options.

### Removed
- The generic "Next due" sensor, and the "Record next due date", "Record description" and "Log exam" controls on the device page.

## [0.1.1] - 2026-10-12

### Changed
- New integration icon.

## [0.1.0] - 2026-10-12

### Added
- First release: one device per pet with last vaccine, dewormer, exam, bath, grooming and vet visit sensors, a next due sensor, an age sensor and a profile photo.
- HACS and Hassfest validation workflow.

[1.1.0]: https://github.com/jacardbr/ha-pet-care/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/jacardbr/ha-pet-care/compare/0.7.0...1.0.0
[0.7.0]: https://github.com/jacardbr/ha-pet-care/compare/0.6.0...0.7.0
[0.6.0]: https://github.com/jacardbr/ha-pet-care/compare/0.5.0...0.6.0
[0.5.0]: https://github.com/jacardbr/ha-pet-care/compare/0.4.0...0.5.0
[0.4.0]: https://github.com/jacardbr/ha-pet-care/compare/0.3.0...0.4.0
[0.3.0]: https://github.com/jacardbr/ha-pet-care/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/jacardbr/ha-pet-care/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/jacardbr/ha-pet-care/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/jacardbr/ha-pet-care/releases/tag/0.1.0
