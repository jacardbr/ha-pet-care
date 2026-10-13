/* HA Pet Care card — name, photo, age, next vaccine, next dewormer and next bath. */

const TEXTS = {
  pt: {
    age: "Idade",
    next_vaccine: "Próxima vacina",
    next_dewormer: "Próximo vermífugo",
    next_bath: "Próximo banho",
    none: "Sem registro",
    today: "Hoje",
    tomorrow: "Amanhã",
    in_days: (n) => `em ${n} dias`,
    overdue: (n) => (n === 1 ? "atrasado 1 dia" : `atrasado ${n} dias`),
    not_found: "Pet não encontrado. Escolha uma entidade do HA Pet Care.",
    entity: "Entidade de qualquer sensor do pet",
    name: "Nome (opcional)",
  },
  en: {
    age: "Age",
    next_vaccine: "Next vaccine",
    next_dewormer: "Next dewormer",
    next_bath: "Next bath",
    none: "No record",
    today: "Today",
    tomorrow: "Tomorrow",
    in_days: (n) => `in ${n} days`,
    overdue: (n) => (n === 1 ? "1 day overdue" : `${n} days overdue`),
    not_found: "Pet not found. Pick an HA Pet Care entity.",
    entity: "Any entity of the pet",
    name: "Name (optional)",
  },
};

const ROWS = [
  { key: "age", icon: "mdi:cake-variant", date: false },
  { key: "next_vaccine", icon: "mdi:needle", date: true },
  { key: "next_dewormer", icon: "mdi:pill", date: true },
  { key: "next_bath", icon: "mdi:shower-head", date: true },
];

const tr = (hass) =>
  (hass?.locale?.language || hass?.language || "en").toLowerCase().startsWith("pt")
    ? TEXTS.pt
    : TEXTS.en;

class HaPetCareCard extends HTMLElement {
  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("Defina 'entity' com uma entidade do HA Pet Care / set 'entity'");
    }
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  getCardSize() {
    return 4;
  }

  static getConfigElement() {
    return document.createElement("ha-pet-care-card-editor");
  }

  static getStubConfig(hass) {
    const found = Object.values(hass?.entities || {}).find(
      (e) => e.platform === "ha_pet_care" && e.translation_key === "photo"
    );
    return { entity: found ? found.entity_id : "" };
  }

  _siblings() {
    const hass = this._hass;
    const source = hass.entities?.[this._config.entity];
    const result = { deviceId: source?.device_id, byKey: {} };
    if (!source || !source.device_id) return result;
    for (const ent of Object.values(hass.entities)) {
      if (ent.device_id === source.device_id && ent.platform === "ha_pet_care" && ent.translation_key) {
        result.byKey[ent.translation_key] = ent.entity_id;
      }
    }
    return result;
  }

  _daysUntil(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const target = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
  }

  _esc(text) {
    return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  _row(t, row, byKey) {
    const hass = this._hass;
    const entityId = this._config[`${row.key}_entity`] || byKey[row.key];
    const stateObj = entityId ? hass.states[entityId] : undefined;
    const valid = stateObj && !["unknown", "unavailable", ""].includes(stateObj.state);
    let value = t.none;
    let hint = "";
    let cls = "";
    if (valid) {
      if (row.date && /^\d{4}-\d{2}-\d{2}$/.test(stateObj.state)) {
        const days = this._daysUntil(stateObj.state);
        const [y, m, d] = stateObj.state.split("-").map(Number);
        value = new Date(y, m - 1, d).toLocaleDateString(hass.locale?.language || hass.language, {
          day: "2-digit", month: "short", year: "numeric",
        });
        if (days < 0) { hint = t.overdue(-days); cls = "overdue"; }
        else if (days === 0) { hint = t.today; cls = "soon"; }
        else if (days === 1) { hint = t.tomorrow; cls = "soon"; }
        else { hint = t.in_days(days); cls = days <= 7 ? "soon" : ""; }
      } else {
        value = stateObj.state;
      }
    }
    return `
      <div class="row ${cls}" data-entity="${this._esc(entityId || "")}">
        <ha-icon icon="${row.icon}"></ha-icon>
        <div class="label">${this._esc(t[row.key])}</div>
        <div class="value">${this._esc(value)}${hint ? `<small>${this._esc(hint)}</small>` : ""}</div>
      </div>`;
  }

  _render() {
    if (!this._config || !this._hass) return;
    const hass = this._hass;
    const t = tr(hass);
    const { deviceId, byKey } = this._siblings();
    if (!deviceId) {
      this.innerHTML = `<ha-card><div class="pc-empty" style="padding:16px">${this._esc(t.not_found)}</div></ha-card>`;
      return;
    }
    const name = this._config.name || hass.devices?.[deviceId]?.name_by_user || hass.devices?.[deviceId]?.name || "";
    const photoId = this._config.photo_entity || byKey.photo;
    const photo = photoId ? hass.states[photoId] : undefined;
    const picture = photo?.attributes?.entity_picture;
    const initial = name ? name.trim().charAt(0).toUpperCase() : "?";

    const html = `
      <ha-card>
        <style>
          .pc { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
          .head { display: flex; align-items: center; gap: 16px; }
          .photo { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; flex: none;
                   background: var(--secondary-background-color); cursor: pointer; }
          .initial { display: flex; align-items: center; justify-content: center; font-size: 36px;
                     color: var(--secondary-text-color); }
          .name { font-size: 1.6em; font-weight: 500; color: var(--primary-text-color); line-height: 1.2; }
          .rows { display: flex; flex-direction: column; }
          .row { display: flex; align-items: center; gap: 12px; padding: 10px 0; cursor: pointer;
                 border-top: 1px solid var(--divider-color); }
          .row ha-icon { color: var(--secondary-text-color); flex: none; }
          .label { flex: 1; color: var(--secondary-text-color); }
          .value { text-align: right; color: var(--primary-text-color); font-weight: 500; }
          .value small { display: block; font-weight: 400; color: var(--secondary-text-color); }
          .row.soon .value small { color: var(--warning-color, #ff9800); }
          .row.overdue .value, .row.overdue ha-icon { color: var(--error-color, #db4437); }
          .row.overdue .value small { color: var(--error-color, #db4437); }
        </style>
        <div class="pc">
          <div class="head">
            ${picture
              ? `<img class="photo" data-entity="${this._esc(photoId)}" src="${this._esc(picture)}" alt="${this._esc(name)}">`
              : `<div class="photo initial" data-entity="${this._esc(photoId || "")}">${this._esc(initial)}</div>`}
            <div class="name">${this._esc(name)}</div>
          </div>
          <div class="rows">${ROWS.map((r) => this._row(t, r, byKey)).join("")}</div>
        </div>
      </ha-card>`;
    if (html === this._last) return;
    this._last = html;
    this.innerHTML = html;
    this.querySelectorAll("[data-entity]").forEach((el) => {
      el.addEventListener("click", () => {
        const entityId = el.dataset.entity;
        if (!entityId) return;
        this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
      });
    });
  }
}

class HaPetCareCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => {
        this.dispatchEvent(new CustomEvent("config-changed", {
          bubbles: true, composed: true, detail: { config: { ...this._config, ...ev.detail.value } },
        }));
      });
      this.appendChild(this._form);
    }
    const t = tr(this._hass);
    this._form.hass = this._hass;
    this._form.data = this._config;
    this._form.schema = [
      { name: "entity", required: true, selector: { entity: { integration: "ha_pet_care" } } },
      { name: "name", selector: { text: {} } },
    ];
    this._form.computeLabel = (s) => (s.name === "entity" ? t.entity : t.name);
  }
}

if (!customElements.get("ha-pet-care-card")) {
  customElements.define("ha-pet-care-card", HaPetCareCard);
  customElements.define("ha-pet-care-card-editor", HaPetCareCardEditor);
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-pet-care-card",
  name: "HA Pet Care",
  description: "Foto, nome, idade, próxima vacina, próximo vermífugo e próximo banho do pet.",
  preview: false,
});
