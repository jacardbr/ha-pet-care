/* HA Pet Care card — name, photo, age, next vaccine, next dewormer and next bath. */

const TEXTS = {
  pt: {
    age: "Idade",
    next_vaccine: "Próxima vacina",
    next_dewormer: "Próximo vermífugo",
    next_bath: "Próximo banho",
    weight: "Peso",
    vaccine: "Última vacina",
    deworming: "Último vermífugo",
    bath: "Último banho",
    grooming: "Última tosa",
    vet_visit: "Última consulta",
    exam: "Último exame",
    ago: (n) => (n === 1 ? "há 1 dia" : `há ${n} dias`),
    fields: "Campos exibidos",
    order_hint: "Marque os itens e arraste pelo ícone ☰ para mudar a ordem.",
    drag: "Arrastar para reordenar",
    actions: "Ações exibidas",
    act_add_vaccine: "Vacina",
    act_add_deworming: "Vermífugo",
    act_add_bath: "Banho",
    act_add_grooming: "Tosa",
    act_add_vet_visit: "Consulta",
    act_log_weight: "Peso",
    act_title: (x) => `Registrar ${x.toLowerCase()} (hoje)`,
    act_title_weight: "Registrar peso",
    show_photo: "Mostrar foto",
    show_name: "Mostrar nome",
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
    weight: "Weight",
    vaccine: "Last vaccine",
    deworming: "Last dewormer",
    bath: "Last bath",
    grooming: "Last grooming",
    vet_visit: "Last vet visit",
    exam: "Last exam",
    ago: (n) => (n === 1 ? "1 day ago" : `${n} days ago`),
    fields: "Fields to show",
    order_hint: "Tick items and drag the ☰ handle to change the order.",
    drag: "Drag to reorder",
    actions: "Actions to show",
    act_add_vaccine: "Vaccine",
    act_add_deworming: "Dewormer",
    act_add_bath: "Bath",
    act_add_grooming: "Grooming",
    act_add_vet_visit: "Vet visit",
    act_log_weight: "Weight",
    act_title: (x) => `Log ${x.toLowerCase()} (today)`,
    act_title_weight: "Log weight",
    show_photo: "Show photo",
    show_name: "Show name",
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
  { key: "age", icon: "mdi:cake-variant", kind: "plain" },
  { key: "weight", icon: "mdi:weight-kilogram", kind: "plain" },
  { key: "next_vaccine", icon: "mdi:needle", kind: "next" },
  { key: "next_dewormer", icon: "mdi:pill", kind: "next" },
  { key: "next_bath", icon: "mdi:shower-head", kind: "next" },
  { key: "vaccine", icon: "mdi:needle", kind: "last" },
  { key: "deworming", icon: "mdi:pill", kind: "last" },
  { key: "bath", icon: "mdi:shower-head", kind: "last" },
  { key: "grooming", icon: "mdi:content-cut", kind: "last" },
  { key: "vet_visit", icon: "mdi:stethoscope", kind: "last" },
  { key: "exam", icon: "mdi:clipboard-pulse", kind: "last" },
];
const ACTIONS = [
  { key: "add_vaccine", icon: "mdi:needle", press: true },
  { key: "add_deworming", icon: "mdi:pill", press: true },
  { key: "add_bath", icon: "mdi:shower-head", press: true },
  { key: "add_grooming", icon: "mdi:content-cut", press: true },
  { key: "add_vet_visit", icon: "mdi:stethoscope", press: true },
  { key: "log_weight", icon: "mdi:scale-bathroom", press: false },
];
const DEFAULT_ACTIONS = ACTIONS.map((a) => a.key);
const DEFAULT_FIELDS = ["age", "next_vaccine", "next_dewormer", "next_bath"];

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

  _actionsHtml(t, byKey) {
    const wanted = Array.isArray(this._config.actions) ? this._config.actions : DEFAULT_ACTIONS;
    const items = wanted.map((k) => ACTIONS.find((a) => a.key === k)).filter((a) => a && byKey[a.key]);
    if (!items.length) return "";
    const buttons = items
      .map((a) => {
        const label = t[`act_${a.key}`];
        const title = a.press ? t.act_title(label) : t.act_title_weight;
        const done = this._flash === a.key;
        return `<button class="act ${done ? "done" : ""}" data-action="${a.key}" data-target="${this._esc(byKey[a.key])}" data-press="${a.press}" title="${this._esc(title)}">
          <ha-icon icon="${done ? "mdi:check" : a.icon}"></ha-icon><span>${this._esc(label)}</span></button>`;
      })
      .join("");
    return `<div class="actions">${buttons}</div>`;
  }

  _press(key, target, press) {
    if (!press) {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: target } }));
      return;
    }
    this._hass.callService("button", "press", { entity_id: target });
    this._flash = key;
    this._last = null;
    this._render();
    clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(() => {
      this._flash = null;
      this._last = null;
      this._render();
    }, 1500);
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
      if (row.kind !== "plain" && /^\d{4}-\d{2}-\d{2}$/.test(stateObj.state)) {
        const days = this._daysUntil(stateObj.state);
        const [y, m, d] = stateObj.state.split("-").map(Number);
        value = new Date(y, m - 1, d).toLocaleDateString(hass.locale?.language || hass.language, {
          day: "2-digit", month: "short", year: "numeric",
        });
        if (row.kind === "last") { hint = days === 0 ? t.today : t.ago(-days); }
        else if (days < 0) { hint = t.overdue(-days); cls = "overdue"; }
        else if (days === 0) { hint = t.today; cls = "soon"; }
        else if (days === 1) { hint = t.tomorrow; cls = "soon"; }
        else { hint = t.in_days(days); cls = days <= 7 ? "soon" : ""; }
      } else {
        const unit = stateObj.attributes?.unit_of_measurement;
        value = unit ? `${stateObj.state} ${unit}` : stateObj.state;
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
    const showPhoto = this._config.show_photo !== false;
    const showName = this._config.show_name !== false;
    const wanted = Array.isArray(this._config.fields) ? this._config.fields : DEFAULT_FIELDS;
    const rows = wanted.map((k) => ROWS.find((r) => r.key === k)).filter(Boolean);
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
          .actions { display: flex; flex-wrap: wrap; gap: 8px; }
          .act { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 16px;
                 border: 1px solid var(--divider-color); background: var(--secondary-background-color);
                 color: var(--primary-text-color); font: inherit; font-size: 0.9em; cursor: pointer; }
          .act:hover { border-color: var(--primary-color); }
          .act ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
          .act.done { border-color: var(--success-color, #43a047); }
          .act.done ha-icon { color: var(--success-color, #43a047); }
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
          ${showPhoto || showName ? `<div class="head">
            ${!showPhoto ? "" : picture
              ? `<img class="photo" data-entity="${this._esc(photoId)}" src="${this._esc(picture)}" alt="${this._esc(name)}">`
              : `<div class="photo initial" data-entity="${this._esc(photoId || "")}">${this._esc(initial)}</div>`}
            ${showName ? `<div class="name">${this._esc(name)}</div>` : ""}
          </div>` : ""}
          ${this._actionsHtml(t, byKey)}
          <div class="rows">${rows.map((r) => this._row(t, r, byKey)).join("")}</div>
        </div>
      </ha-card>`;
    if (html === this._last) return;
    this._last = html;
    this.innerHTML = html;
    this.querySelectorAll("[data-action]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._press(el.dataset.action, el.dataset.target, el.dataset.press === "true");
      });
    });
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

  _emit(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: true, composed: true, detail: { config } }));
    this._renderLists();
  }

  _selected(name, items, defaults) {
    const raw = Array.isArray(this._config[name]) ? this._config[name] : defaults;
    return raw.filter((k) => items.some((i) => i.key === k));
  }

  _listHtml(name, items, defaults, t, label) {
    const selected = this._selected(name, items, defaults);
    const rest = items.filter((i) => !selected.includes(i.key)).map((i) => i.key);
    const row = (key, checked) => `<div class="item ${checked ? "on" : "off"}" data-key="${key}">
          ${checked
            ? `<span class="handle" title="${t.drag}"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/></svg></span>`
            : `<span class="handle off"></span>`}
          <label><input type="checkbox" data-list="${name}" data-toggle="${key}" ${checked ? "checked" : ""}> ${this._labelFor(name, key, t)}</label>
        </div>`;
    const rows = selected.map((k) => row(k, true)).join("") + rest.map((k) => row(k, false)).join("");
    return `<div class="sec"><div class="title">${label}</div><div class="list" data-list="${name}">${rows}</div></div>`;
  }

  _labelFor(name, key, t) {
    return name === "actions" ? t[`act_${key}`] : t[key];
  }

  _renderLists() {
    if (!this._lists || !this._hass || !this._config) return;
    if (this._dragging) return; // Home Assistant pushes updates constantly; never rebuild mid-drag
    const t = tr(this._hass);
    const html = `<style>
        .sec { margin-top: 16px; }
        .title { font-weight: 500; margin-bottom: 4px; }
        .hint { color: var(--secondary-text-color); font-size: 0.85em; margin-top: 12px; }
        .item { display: flex; align-items: center; gap: 8px; padding: 2px 8px 2px 4px; border-radius: 8px;
                background: var(--card-background-color); border: 1px solid transparent; }
        .item.on { border-color: var(--divider-color); margin-bottom: 4px; }
        .item.dragging { opacity: 0.85; box-shadow: 0 2px 8px rgba(0,0,0,.3); position: relative; z-index: 2;
                         border-color: var(--primary-color); }
        .item label { display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; padding: 8px 0; }
        .handle { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center;
                  color: var(--secondary-text-color); cursor: grab; touch-action: none; user-select: none; }
        .handle.off { cursor: default; }
        .item.off label { color: var(--secondary-text-color); }
      </style>
      <div class="hint">${t.order_hint}</div>
      ${this._listHtml("actions", ACTIONS, DEFAULT_ACTIONS, t, t.actions)}
      ${this._listHtml("fields", ROWS, DEFAULT_FIELDS, t, t.fields)}`;
    if (html === this._listsHtml) return; // nothing changed: keep the DOM (and its listeners)
    this._listsHtml = html;
    this._lists.innerHTML = html;
    this._lists.querySelectorAll("input[data-toggle]").forEach((el) => {
      el.addEventListener("change", () => {
        const name = el.dataset.list;
        const items = name === "actions" ? ACTIONS : ROWS;
        const defaults = name === "actions" ? DEFAULT_ACTIONS : DEFAULT_FIELDS;
        let selected = this._selected(name, items, defaults);
        const key = el.dataset.toggle;
        selected = el.checked ? [...selected, key] : selected.filter((k) => k !== key);
        this._emit({ ...this._config, [name]: selected });
      });
    });
    this._lists.querySelectorAll(".list").forEach((list) => this._enableDrag(list));
  }

  _enableDrag(list) {
    const name = list.dataset.list;
    list.querySelectorAll(".item.on .handle").forEach((handle) => {
      handle.addEventListener("pointerdown", (ev) => {
        if (ev.button !== undefined && ev.button > 0) return;
        ev.preventDefault();
        const item = handle.closest(".item");
        item.classList.add("dragging");
        this._dragging = true;
        // Listen on document: moving the row in the DOM would release pointer capture.
        const move = (e) => {
          const others = [...list.querySelectorAll(".item.on")].filter((i) => i !== item);
          let before = null;
          for (const other of others) {
            const box = other.getBoundingClientRect();
            if (e.clientY < box.top + box.height / 2) { before = other; break; }
          }
          const last = others[others.length - 1];
          const anchor = before || (last ? last.nextSibling : null);
          if (item.nextSibling !== anchor && item !== anchor) list.insertBefore(item, anchor);
        };
        const end = () => {
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", end);
          document.removeEventListener("pointercancel", end);
          item.classList.remove("dragging");
          this._dragging = false;
          const order = [...list.querySelectorAll(".item.on")].map((i) => i.dataset.key);
          const items = name === "actions" ? ACTIONS : ROWS;
          const defaults = name === "actions" ? DEFAULT_ACTIONS : DEFAULT_FIELDS;
          const before = this._selected(name, items, defaults);
          if (order.join() !== before.join()) {
            this._listsHtml = null;
            this._emit({ ...this._config, [name]: order });
          } else {
            this._listsHtml = null;
            this._renderLists();
          }
        };
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", end);
        document.addEventListener("pointercancel", end);
      });
    });
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => {
        const { fields, actions, ...rest } = ev.detail.value;
        this._emit({ ...this._config, ...rest });
      });
      this._lists = document.createElement("div");
      this.appendChild(this._form);
      this.appendChild(this._lists);
    }
    const t = tr(this._hass);
    this._form.hass = this._hass;
    this._form.data = { show_photo: true, show_name: true, ...this._config };
    this._form.schema = [
      { name: "entity", required: true, selector: { entity: { integration: "ha_pet_care" } } },
      { name: "name", selector: { text: {} } },
      { name: "show_photo", selector: { boolean: {} } },
      { name: "show_name", selector: { boolean: {} } },
    ];
    const labels = { entity: t.entity, name: t.name, show_photo: t.show_photo, show_name: t.show_name };
    this._form.computeLabel = (s) => labels[s.name] || s.name;
    this._renderLists();
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
