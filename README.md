# HA Pet Care for Home Assistant

Custom integration to keep your pets' care history: **vaccines, dewormers, exams, baths, grooming and vet visits**, with a **profile photo** for each pet. Everything is stored locally in your Home Assistant, with no cloud.

<p align="center">
  <img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/summary-light.png" alt="HA Pet Care card, Summary tab, light theme" width="330">
  <img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/summary-dark.png" alt="HA Pet Care card, Summary tab, dark theme" width="330">
</p>
<p align="center"><sub>The <strong>HA Pet Care</strong> card in light and dark themes. Images are illustrative (sample data).</sub></p>

## What it creates

For each pet, a device with:

| Entity | What it shows |
| --- | --- |
| `sensor.<pet>_last_vaccine` | Date of the last vaccine |
| `sensor.<pet>_last_dewormer` | Date of the last dewormer |
| `sensor.<pet>_last_exam` | Date of the last exam |
| `sensor.<pet>_last_bath` | Date of the last bath |
| `sensor.<pet>_last_grooming` | Date of the last grooming |
| `sensor.<pet>_last_vet_visit` | Date of the last vet visit |
| `sensor.<pet>_next_vaccine` | Date of the next vaccine: **1 year** after the last vaccine, calculated automatically |
| `sensor.<pet>_next_dewormer` | Date of the next dewormer: **6 months** after the last dewormer, calculated automatically |
| `sensor.<pet>_next_bath` | Date of the next bath: **1 month** after the last bath, calculated automatically |
| `sensor.<pet>_age` | Age calculated from the birth date (e.g. "2 years and 3 months"); attributes `years`, `months`, `total_months`, `decimal_years`, `next_birthday`, `days_until_birthday` and `is_birthday` |
| `sensor.<pet>_weight` | Latest weight in kg; attributes `previous_weight`, `change`, `first_weight`, `change_since_first` and `history` (last 20 weights) |
| `number.<pet>_log_weight` | Single weight field: shows the latest weight; type a new value and it is saved immediately with today's date |
| `button.<pet>_log_vaccine`, `..._log_dewormer`, `..._log_bath`, `..._log_grooming`, `..._log_vet_visit` | One button per record type: logs the event with today's date |
| `image.<pet>_photo` | Profile photo |

Each "last" sensor has these attributes: `description`, `notes`, `next_due`, `days_since`, `record_id`, `total_records` and `history` (last 10 records).

Entity IDs depend on your Home Assistant language and the pet's name; check them in **Settings → Devices & services**.

## Installation with HACS

[![Open your Home Assistant instance and open this repository in the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=jacardbr&repository=ha-pet-care&category=integration)

Click the button above to open this repository directly in HACS on your Home Assistant, or add it manually:

1. HACS → ⋮ menu → **Custom repositories**
2. Paste this repository's URL and choose the **Integration** category
3. Install **HA Pet Care** and restart Home Assistant
4. **Settings → Devices & services → Add integration → HA Pet Care**

## Adding pets

Go to **HA Pet Care → Configure → Add a pet**: name, species, birth date and, optionally, a photo that you attach right on the screen (JPG, PNG, WEBP or GIF). To change or add the photo later, use **Configure → Change a pet's photo**. The photo is stored inside Home Assistant, so the original file can be deleted.

## Actions (services)

### `ha_pet_care.add_record`

```yaml
action: ha_pet_care.add_record
data:
  pet: Rex
  type: vaccine        # vaccine | deworming | exam | bath | grooming | vet_visit
  date: "2026-10-12"   # optional, defaults to today
  description: V10     # optional
  notes: No reaction   # optional
  next_due: "2027-10-12"  # optional
```

Returns the `record_id` of the created record and fires the `ha_pet_care_record_added` event.

### `ha_pet_care.remove_record`

```yaml
action: ha_pet_care.remove_record
data:
  pet: Rex
  record_id: a1b2c3d4
```

### `ha_pet_care.set_photo`

```yaml
action: ha_pet_care.set_photo
data:
  pet: Rex
  path: /config/www/pets/rex.jpg
```

## Logging from the device page

The pet's device page has one button per record type (**Log vaccine**, **dewormer**, **bath**, **grooming** and **vet visit**). Pressing a button saves the event with today's date and updates the matching sensor. Exams are logged with the `ha_pet_care.add_record` action (type `exam`).

To log a past date, or to add a description, notes or a specific next date, use the `ha_pet_care.add_record` action (or the card, which asks for the date).

## Weight and growth

On the pet's device page, the **Log weight** field shows the latest weight. Type the new value (in kg) and confirm: it is saved immediately with today's date, and the **Weight** sensor shows the new value together with the change from the previous one. If you enter another value on the same day, today's weight is corrected instead of creating a second record. Use the sensor's history graph to follow growth.

To log another date, or to do it automatically (for example from a smart scale), use the action:

```yaml
action: ha_pet_care.add_weight
data:
  pet: Rex
  weight: 4.2
  date: "2026-10-12"   # optional, defaults to today
```

Returns the `record_id` and fires the `ha_pet_care_weight_added` event. To delete a weight entered by mistake, use `ha_pet_care.remove_weight` with the `pet` and the `record_id` (found in the sensor's `history` attribute).

## Next vaccine, dewormer and bath

The **Next vaccine**, **Next dewormer** and **Next bath** sensors fill themselves in: as soon as you log a vaccine, the next one is set 1 year later; when you log a dewormer, the next is 6 months later; when you log a bath, the next is 1 month later. If the target month is shorter, the day is adjusted (Aug 31 + 6 months = Feb 28). For a different interval on a specific record, pass `next_due` to the `ha_pet_care.add_record` action: that date replaces the automatic one.

Attributes: `last_date`, `days_until` (negative when overdue), `overdue`, `source` (`automatic` or `manual`) and `interval_months`. With no record of that type, the sensor is unknown.

## Example: warn 7 days before the vaccine

```yaml
automation:
  - alias: "Pets: vaccine coming up"
    trigger:
      - platform: time
        at: "09:00:00"
    condition:
      - condition: template
        value_template: >
          {{ state_attr('sensor.rex_next_vaccine', 'days_until') is not none
             and state_attr('sensor.rex_next_vaccine', 'days_until') <= 7 }}
    action:
      - action: notify.notify
        data:
          title: "Rex"
          message: >
            The next vaccine is due in
            {{ state_attr('sensor.rex_next_vaccine', 'days_until') }} day(s).
```

## Lovelace card

The integration already includes the **HA Pet Care** card (no extra installation). It shows the photo, name, age, next vaccine, next dewormer and next bath, highlighting dates in orange (within 7 days) and red (overdue). Tapping a row opens that entity's history.

### Adding the card

1. Restart Home Assistant after updating, and refresh your browser (Ctrl+F5).
2. On a dashboard in edit mode, click **Add card** and search for **HA Pet Care**.
3. Pick any entity of the pet (for example, the photo). The card finds the others by itself.
4. In the editor, choose the **fields to show** (age, weight, next vaccine/dewormer/bath, and the last vaccine, dewormer, bath, grooming, vet visit and exam), whether to show the photo and the name, and which **actions** and **history filters** to show.
5. In the **Actions**, **Fields** and **History filters** lists, drag by the ☰ handle to change the order; the order of the checked items is the order shown on the card.

### Using the card

**1. Summary tab.** Right below the photo and name are the **action buttons** (icons only: vaccine, dewormer, bath, grooming, vet visit and weight) followed by the fields you chose. Upcoming dates are shown in orange and overdue dates in red. Hold or hover over an icon to see its name.

<p align="center"><img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/summary-light.png" alt="Summary tab" width="340"></p>

**2. Logging an event.** Tap an action button to open the panel. The date is pre-filled with today; change it if the event happened on another day (future dates are not accepted). For vaccines, tap the vaccines that were given (you can pick more than one): they are saved as a single record, such as "V10, Rabies". For weight, the panel also has a weight field, pre-filled with the last value. Tap **Log it** to save. The vaccine list follows your Home Assistant language, and you can customize it with `vaccine_options` in the card YAML (for example `vaccine_options: [V10, Rabies]`). To go back to one-tap logging, turn off **Ask for the date when logging** (`ask_date: false`).

<p align="center"><img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/vaccine-panel.png" alt="Vaccine logging panel with selected vaccines" width="340"></p>

**3. History tab, weight.** The weight filter is selected by default and shows the evolution as a chart, with the list of weights right below it.

<p align="center"><img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/history-weight.png" alt="History tab with the weight chart" width="340"></p>

**4. History tab, other events.** Each type that has records gets a filter button (in the order set in the editor). Below each date, the card shows the time since the previous record of the same type.

<p align="center"><img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/history-vaccine.png" alt="History tab filtered by vaccine" width="340"></p>

**5. Deleting a record.** Tap the trash icon: it turns red to ask for confirmation. A second tap within 3 seconds deletes the record. This is the same as the `ha_pet_care.remove_record` and `ha_pet_care.remove_weight` actions.

<p align="center"><img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/history-delete.png" alt="Confirmation before deleting a record" width="340"></p>

**6. Dark theme.** The card uses the colors of your Home Assistant theme.

<p align="center"><img src="https://raw.githubusercontent.com/jacardbr/ha-pet-care/main/docs/images/history-dark.png" alt="History tab in the dark theme" width="340"></p>

> The images in this README were generated with sample data, only to illustrate usage. Names, dates and values are not real.

### YAML configuration

One card per pet:

```yaml
type: custom:ha-pet-care-card
entity: image.mel_photo
# name: Mel          # optional, defaults to the pet's name
# show_photo: true
# show_name: true
# ask_date: true     # false = log with one tap, using today's date
# show_history: true
# history_limit: 15
# vaccine_options: [V10, Rabies]
actions:      # optional; default: all (list order is the order on the card)
  - add_vaccine
  - add_deworming
  - add_bath
  - add_grooming
  - add_vet_visit
  - log_weight
fields:       # optional; default: age, next_vaccine, next_dewormer, next_bath
  - age
  - weight
  - next_vaccine
  - next_dewormer
  - next_bath
  # also: vaccine, deworming, bath, grooming, vet_visit, exam
history_types:   # optional; order of the History filters
  - weight
  - vaccine
  - deworming
  - bath
  - grooming
  - vet_visit
  - exam
```

## Development

- Domain: `ha_pet_care`
- Data in `.storage/ha_pet_care.<entry_id>`; photos in `<config>/ha_pet_care_photos/`
- Checks on GitHub Actions: `hacs/action` and `hassfest`

## License

MIT
