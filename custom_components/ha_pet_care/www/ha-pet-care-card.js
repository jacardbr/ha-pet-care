/* HA Pet Care card — name, photo, age, next vaccine, next dewormer and next bath. */

const TEXTS = {
  pt: {
    age: "Idade",
    next_vaccine: "Próxima vacina",
    next_dewormer: "Próximo vermífugo",
    next_bath: "Próximo banho",
    next_remedy: "Próximo remédio",
    weight: "Peso",
    vaccine: "Última vacina",
    deworming: "Último vermífugo",
    bath: "Último banho",
    grooming: "Última tosa",
    vet_visit: "Última consulta",
    exam: "Último exame",
    remedy: "Último remédio",
    ago: (n) => (n === 1 ? "há 1 dia" : `há ${n} dias`),
    fields: "Campos exibidos",
    tab_summary: "Resumo",
    tab_history: "Histórico",
    show_history: "Mostrar aba Histórico",
    history_types: "Histórico exibido",
    history_limit: "Quantidade de itens no histórico",
    no_history: "Nenhum registro ainda",
    ask_date: "Perguntar a data ao registrar",
    panel_title: (x) => `Registrar ${x.toLowerCase()}`,
    panel_title_weight: "Registrar peso",
    panel_date: "Data do evento",
    panel_next: "Próxima data",
    panel_recurring: "Recorrente",
    panel_desc: "Vacinas aplicadas",
    vaccines: ["V8", "V10", "Antirrábica", "Gripe", "Giárdia", "Leishmaniose"],
    panel_weight: "Peso (kg)",
    panel_remedy: "Nome do remédio",
    panel_ok: "Registrar",
    panel_cancel: "Cancelar",
    weight_history: "Evolução do peso",
    del_title: "Excluir registro",
    del_confirm: "Toque de novo para excluir",
    hist_vaccine: "Vacina",
    hist_deworming: "Vermífugo",
    hist_bath: "Banho",
    hist_grooming: "Tosa",
    hist_vet_visit: "Consulta",
    hist_exam: "Exame",
    hist_remedy: "Remédio",
    hist_weight: "Peso",
    order_hint: "Marque os itens e arraste pelo ícone ☰ para mudar a ordem.",
    drag: "Arrastar para reordenar",
    actions: "Ações exibidas",
    sec_display: "Exibição",
    sec_logging: "Lista de vacinas",
    sec_history: "Histórico",
    act_add_vaccine: "Vacina",
    act_add_deworming: "Vermífugo",
    act_add_bath: "Banho",
    act_add_grooming: "Tosa",
    act_add_vet_visit: "Consulta",
    act_add_remedy: "Remédio",
    act_log_weight: "Peso",
    act_title: (x) => `Registrar ${x.toLowerCase()} (hoje)`,
    act_title_weight: "Registrar peso",
    show_photo: "Mostrar foto",
    photo_upload: "Trocar foto",
    photo_hint: "Escolha uma imagem e ajuste o enquadramento antes de salvar.",
    photo_crop_hint: "Arraste para posicionar e use o controle para aproximar.",
    photo_zoom: "Zoom",
    photo_save: "Salvar foto",
    photo_cancel: "Cancelar",
    photo_bad: "Não foi possível abrir essa imagem. Use JPG, PNG, WEBP ou GIF.",
    photo_sending: "Trocando a foto…",
    photo_done: "Foto atualizada.",
    photo_error: (m) => `Não foi possível trocar a foto: ${m}`,
    show_name: "Mostrar nome",
    none: "Sem registro",
    today: "Hoje",
    tomorrow: "Amanhã",
    in_days: (n) => `em ${n} dias`,
    span_d: (n) => (n === 1 ? "1 dia" : `${n} dias`),
    span_m: (n) => (n === 1 ? "1 mês" : `${n} meses`),
    span_y: (n) => (n === 1 ? "1 ano" : `${n} anos`),
    overdue: (n) => (n === 1 ? "atrasado 1 dia" : `atrasado ${n} dias`),
    not_found: "Pet não encontrado. Escolha uma entidade do HA Pet Care.",
    entity: "Entidade de qualquer sensor do pet",
    name: "Nome (opcional)",
    vaccine_options: "Vacinas oferecidas ao registrar",
    remedy_options: "Remédios oferecidos ao registrar",
    sec_remedies: "Lista de remédios",
    intervals: "Próximas datas padrão",
    intervals_hint: "Em dias; vazio = padrão, 0 = sem sugestão.",
    interval: (x, d) => `${x} (padrão: ${d})`,
    no_default: "sem sugestão",
    months: (n) => (n === 1 ? "1 mês" : n === 12 ? "1 ano" : `${n} meses`),
  },
  en: {
    age: "Age",
    next_vaccine: "Next vaccine",
    next_dewormer: "Next dewormer",
    next_bath: "Next bath",
    next_remedy: "Next remedy",
    weight: "Weight",
    vaccine: "Last vaccine",
    deworming: "Last dewormer",
    bath: "Last bath",
    grooming: "Last grooming",
    vet_visit: "Last vet visit",
    exam: "Last exam",
    remedy: "Last remedy",
    ago: (n) => (n === 1 ? "1 day ago" : `${n} days ago`),
    fields: "Fields to show",
    tab_summary: "Summary",
    tab_history: "History",
    show_history: "Show History tab",
    history_types: "History to show",
    history_limit: "Number of history items",
    no_history: "No records yet",
    ask_date: "Ask for the date when logging",
    panel_title: (x) => `Log ${x.toLowerCase()}`,
    panel_title_weight: "Log weight",
    panel_date: "Event date",
    panel_next: "Next date",
    panel_recurring: "Recurring",
    panel_desc: "Vaccines given",
    vaccines: ["V8", "V10", "Rabies", "Kennel cough", "Giardia", "Leishmaniasis"],
    panel_weight: "Weight (kg)",
    panel_remedy: "Remedy name",
    panel_ok: "Log it",
    panel_cancel: "Cancel",
    weight_history: "Weight over time",
    del_title: "Delete record",
    del_confirm: "Tap again to delete",
    hist_vaccine: "Vaccine",
    hist_deworming: "Dewormer",
    hist_bath: "Bath",
    hist_grooming: "Grooming",
    hist_vet_visit: "Vet visit",
    hist_exam: "Exam",
    hist_remedy: "Remedy",
    hist_weight: "Weight",
    order_hint: "Tick items and drag the ☰ handle to change the order.",
    drag: "Drag to reorder",
    actions: "Actions to show",
    sec_display: "Display",
    sec_logging: "Vaccine list",
    sec_history: "History",
    act_add_vaccine: "Vaccine",
    act_add_deworming: "Dewormer",
    act_add_bath: "Bath",
    act_add_grooming: "Grooming",
    act_add_vet_visit: "Vet visit",
    act_add_remedy: "Remedy",
    act_log_weight: "Weight",
    act_title: (x) => `Log ${x.toLowerCase()} (today)`,
    act_title_weight: "Log weight",
    show_photo: "Show photo",
    photo_upload: "Change photo",
    photo_hint: "Pick an image and adjust the framing before saving.",
    photo_crop_hint: "Drag to position and use the slider to zoom in.",
    photo_zoom: "Zoom",
    photo_save: "Save photo",
    photo_cancel: "Cancel",
    photo_bad: "Could not open this image. Use JPG, PNG, WEBP or GIF.",
    photo_sending: "Changing the photo…",
    photo_done: "Photo updated.",
    photo_error: (m) => `Could not change the photo: ${m}`,
    show_name: "Show name",
    none: "No record",
    today: "Today",
    tomorrow: "Tomorrow",
    in_days: (n) => `in ${n} days`,
    span_d: (n) => (n === 1 ? "1 day" : `${n} days`),
    span_m: (n) => (n === 1 ? "1 month" : `${n} months`),
    span_y: (n) => (n === 1 ? "1 year" : `${n} years`),
    overdue: (n) => (n === 1 ? "1 day overdue" : `${n} days overdue`),
    not_found: "Pet not found. Pick an HA Pet Care entity.",
    entity: "Any entity of the pet",
    name: "Name (optional)",
    vaccine_options: "Vaccines offered when logging",
    remedy_options: "Remedies offered when logging",
    sec_remedies: "Remedy list",
    intervals: "Next due defaults",
    intervals_hint: "In days; empty = default, 0 = no suggestion.",
    interval: (x, d) => `${x} (default: ${d})`,
    no_default: "no suggestion",
    months: (n) => (n === 1 ? "1 month" : n === 12 ? "1 year" : `${n} months`),
  },
};

const ROWS = [
  { key: "age", icon: "mdi:cake-variant", kind: "plain" },
  { key: "weight", icon: "mdi:weight-kilogram", kind: "plain" },
  { key: "next_vaccine", icon: "mdi:needle", kind: "next" },
  { key: "next_dewormer", icon: "mdi:snake", kind: "next" },
  { key: "next_remedy", icon: "mdi:pill", kind: "next" },
  { key: "next_bath", icon: "mdi:shower-head", kind: "next" },
  { key: "vaccine", icon: "mdi:needle", kind: "last" },
  { key: "deworming", icon: "mdi:snake", kind: "last" },
  { key: "bath", icon: "mdi:shower-head", kind: "last" },
  { key: "grooming", icon: "mdi:content-cut", kind: "last" },
  { key: "vet_visit", icon: "mdi:stethoscope", kind: "last" },
  { key: "exam", icon: "mdi:clipboard-pulse", kind: "last" },
  { key: "remedy", icon: "mdi:pill", kind: "last" },
];
const ACTIONS = [
  { key: "add_vaccine", type: "vaccine", multi: true, icon: "mdi:needle", press: true },
  { key: "add_deworming", type: "deworming", icon: "mdi:snake", press: true },
  { key: "add_remedy", type: "remedy", icon: "mdi:pill", press: true, text: "panel_remedy", recurring: true },
  { key: "add_bath", type: "bath", icon: "mdi:shower-head", press: true },
  { key: "add_grooming", type: "grooming", icon: "mdi:content-cut", press: true },
  { key: "add_vet_visit", type: "vet_visit", icon: "mdi:stethoscope", press: true },
  { key: "log_weight", icon: "mdi:scale-bathroom", press: false },
];
// Default gap to the next event, in months (same as the integration's sensors).
const CROP_VIEW = 240; // framing editor size (px)
const CROP_OUT = 512; // saved photo size (px)
const NEXT_MONTHS = { vaccine: 12, deworming: 6, bath: 1, grooming: 6, vet_visit: 12 };
// Event types whose period can be set in the card editor.
const INTERVAL_TYPES = ["vaccine", "deworming", "remedy", "bath", "grooming", "vet_visit"];
const DEFAULT_ACTIONS = ACTIONS.map((a) => a.key);
const HIST = [
  { key: "weight", icon: "mdi:weight-kilogram" },
  { key: "vaccine", icon: "mdi:needle" },
  { key: "deworming", icon: "mdi:snake" },
  { key: "remedy", icon: "mdi:pill" },
  { key: "bath", icon: "mdi:shower-head" },
  { key: "grooming", icon: "mdi:content-cut" },
  { key: "vet_visit", icon: "mdi:stethoscope" },
  { key: "exam", icon: "mdi:clipboard-pulse" },
];
const DEFAULT_HIST = HIST.map((h) => h.key);
const DEFAULT_FIELDS = ["age", "next_vaccine", "next_dewormer", "next_remedy", "next_bath"];

const tr = (hass) =>
  (hass?.locale?.language || hass?.language || "en").toLowerCase().startsWith("pt")
    ? TEXTS.pt
    : TEXTS.en;

const LISTS = {
  actions: { items: ACTIONS, defaults: DEFAULT_ACTIONS, sortable: true, label: (t, k) => t[`act_${k}`] },
  fields: { items: ROWS, defaults: DEFAULT_FIELDS, sortable: true, label: (t, k) => t[k] },
  history_types: { items: HIST, defaults: DEFAULT_HIST, sortable: true, label: (t, k) => t[`hist_${k}`] },
};

// Lists saved by an older card version get the items added since then, so new
// actions show up on existing cards. The editor saves CARD_VERSION, after which
// an item missing from the list means the user turned it off.
const CARD_VERSION = 3;
const ADDED_IN = { 2: { actions: ["add_remedy"], history_types: ["remedy"] }, 3: { fields: ["next_remedy"] } };

// Remedy names already logged for this pet (from the remedy sensor's history).
const loggedRemedies = (hass, config) => {
  const source = hass?.entities?.[config?.entity];
  if (!source?.device_id) return [];
  const ent = Object.values(hass.entities).find(
    (e) => e.device_id === source.device_id && e.platform === "ha_pet_care" && e.translation_key === "remedy"
  );
  const history = ent ? hass.states[ent.entity_id]?.attributes?.history : null;
  return Array.isArray(history) ? history.map((r) => String(r?.description || "").trim()).filter(Boolean) : [];
};

// Merge lists case-insensitively, trimming and dropping blanks.
const mergeNames = (...lists) => {
  const seen = new Set();
  return lists.flat().map((v) => String(v ?? "").trim())
    .filter((v) => v && !seen.has(v.toLowerCase()) && seen.add(v.toLowerCase()));
};

const resolveList = (config, name) => {
  const { items, defaults } = LISTS[name];
  if (!Array.isArray(config[name])) return defaults;
  const list = config[name].filter((k) => items.some((i) => i.key === k));
  const from = Number(config.card_version) || 1;
  for (let v = from + 1; v <= CARD_VERSION; v++) {
    for (const key of ADDED_IN[v]?.[name] || []) {
      if (list.includes(key)) continue;
      // Insert after the nearest earlier item of the default order that is in the list.
      const order = items.map((i) => i.key);
      let at = 0;
      for (let i = order.indexOf(key) - 1; i >= 0; i--) {
        const pos = list.indexOf(order[i]);
        if (pos >= 0) { at = pos + 1; break; }
      }
      list.splice(at, 0, key);
    }
  }
  return list;
};

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
    const wanted = resolveList(this._config, "actions");
    const items = wanted.map((k) => ACTIONS.find((a) => a.key === k)).filter((a) => a && byKey[a.key]);
    if (!items.length) return "";
    const buttons = items
      .map((a) => {
        const label = t[`act_${a.key}`];
        const title = a.press ? t.act_title(label) : t.act_title_weight;
        const done = this._flash === a.key;
        const open = this._panel && this._panel.key === a.key;
        return `<button class="act ${done ? "done" : ""} ${open ? "open" : ""}" data-action="${a.key}" data-target="${this._esc(byKey[a.key])}" data-press="${a.press}" title="${this._esc(title)}" aria-label="${this._esc(title)}">
          <ha-icon icon="${done ? "mdi:check" : a.icon}"></ha-icon></button>`;
      })
      .join("");
    return `<div class="actions">${buttons}</div>${this._panelHtml(t, byKey)}`;
  }

  _today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  // ISO date plus whole months, clamping the day (Aug 31 + 6 -> Feb 28).
  _addMonths(iso, months) {
    const [y, m, d] = iso.split("-").map(Number);
    const idx = y * 12 + (m - 1) + months;
    const ny = Math.floor(idx / 12);
    const nm = idx % 12;
    const day = Math.min(d, new Date(ny, nm + 1, 0).getDate());
    return `${ny}-${String(nm + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  // Days set in the card editor for this type: a number, 0 (no suggestion) or null (use the default).
  _intervalDays(type) {
    const v = this._config[`interval_${type}`];
    return v === undefined || v === null || v === "" || isNaN(Number(v)) ? null : Math.max(0, Math.round(Number(v)));
  }

  _addDays(iso, days) {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, m - 1, d + days);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  }

  // The date the integration's sensor computes on its own (fixed months, by type).
  _builtinNext(type, date) {
    const months = NEXT_MONTHS[type];
    return months && /^\d{4}-\d{2}-\d{2}$/.test(date || "") ? this._addMonths(date, months) : "";
  }

  // Recurring types (remedy) show the next date only when the user ticks "Recurring".
  _showNext(action) {
    return action.recurring ? Boolean(this._panel?.recurring) : this._hasNext(action.type);
  }

  _hasNext(type) {
    const days = this._intervalDays(type);
    return days === null ? Boolean(NEXT_MONTHS[type]) : days > 0;
  }

  _defaultNext(type, date) {
    const days = this._intervalDays(type);
    if (days === null) return this._builtinNext(type, date);
    return days > 0 && /^\d{4}-\d{2}-\d{2}$/.test(date || "") ? this._addDays(date, days) : "";
  }

  _petName(byKey) {
    const id = this._siblings().deviceId;
    return this._hass.devices?.[id]?.name || this._config.name || "";
  }

  _panelHtml(t, byKey) {
    const p = this._panel;
    if (!p) return "";
    const action = ACTIONS.find((a) => a.key === p.key);
    if (!action || !byKey[action.key]) return "";
    const isWeight = !action.press;
    const title = isWeight ? t.panel_title_weight : t.panel_title(t[`act_${action.key}`]);
    return `<div class="panel" data-panel="${action.key}">
      <div class="ptitle">${this._esc(title)}</div>
      ${action.multi ? `<div class="vwrap"><div class="vlabel">${this._esc(t.panel_desc)}</div><div class="vchips">${this._vaccineOptions().map((v) => `<button type="button" class="vchip ${(p.vaccines || []).includes(v) ? "on" : ""}" data-vaccine="${this._esc(v)}" aria-pressed="${(p.vaccines || []).includes(v)}">${this._esc(v)}</button>`).join("")}</div></div>` : ""}
      ${action.text && this._remedyOptions().length ? `<div class="vchips">${this._remedyOptions().map((v) => `<button type="button" class="vchip ${p.desc === v ? "on" : ""}" data-remedy="${this._esc(v)}" aria-pressed="${p.desc === v}">${this._esc(v)}</button>`).join("")}</div>` : ""}
      ${action.text ? `<label class="grow">${this._esc(t[action.text])}<input type="text" maxlength="100" data-pfield="desc" value="${this._esc(p.desc || "")}"></label>` : ""}
      ${action.recurring ? `<label class="chk"><input type="checkbox" data-precurring ${p.recurring ? "checked" : ""}> ${this._esc(t.panel_recurring)}</label>` : ""}
      ${isWeight ? `<label>${this._esc(t.panel_weight)}<input class="w" type="number" inputmode="decimal" step="0.01" min="0.01" max="200" data-pfield="weight" value="${this._esc(p.weight ?? "")}"></label>` : ""}
      <label>${this._esc(t.panel_date)}<input type="date" max="${this._today()}" data-pfield="date" value="${this._esc(p.date)}"></label>
      ${this._showNext(action) ? `<label>${this._esc(t.panel_next)}<input type="date" min="${this._esc(p.date)}" data-pfield="next" value="${this._esc(p.next || "")}"></label>` : ""}
      <div class="pbtns">
        <button class="pbtn" data-pcancel>${this._esc(t.panel_cancel)}</button>
        <button class="pbtn ok" data-pok>${this._esc(t.panel_ok)}</button>
      </div>
    </div>`;
  }

  // Remedies from the card editor, plus any name already logged (so a typed name joins the list).
  _remedyOptions() {
    const opts = Array.isArray(this._config.remedy_options) ? this._config.remedy_options : [];
    return mergeNames(opts, loggedRemedies(this._hass, this._config));
  }

  _vaccineOptions() {
    const opts = Array.isArray(this._config.vaccine_options)
      ? [...new Set(this._config.vaccine_options.map((v) => String(v ?? "").trim()).filter(Boolean))]
      : [];
    return opts.length ? opts : tr(this._hass).vaccines;
  }

  _panelValid() {
    const p = this._panel;
    if (!p) return false;
    const action = ACTIONS.find((a) => a.key === p.key);
    const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(p.date || "") && p.date <= this._today();
    if (action && !action.press) {
      const w = Number(p.weight);
      return dateOk && w > 0 && w <= 200;
    }
    const nextOk = action?.recurring && p.recurring
      ? /^\d{4}-\d{2}-\d{2}$/.test(p.next || "") && p.next >= p.date
      : !p.next || (/^\d{4}-\d{2}-\d{2}$/.test(p.next) && p.next >= p.date);
    return dateOk && nextOk;
  }

  _openPanel(key, byKey) {
    let weight = "";
    if (key === "log_weight") {
      const v = byKey.log_weight ? this._hass.states[byKey.log_weight]?.state : undefined;
      weight = v && !isNaN(Number(v)) ? v : "";
    }
    const type = ACTIONS.find((a) => a.key === key)?.type;
    const date = this._today();
    this._panel = { key, date, weight, vaccines: [], next: this._defaultNext(type, date), nextEdited: false };
    this._last = null;
    this._render();
    const first = this.querySelector(".panel input");
    if (first && (key === "log_weight" || ACTIONS.find((a) => a.key === key)?.text)) first.focus();
  }

  _submitPanel(byKey) {
    if (!this._panelValid()) return;
    const p = this._panel;
    const action = ACTIONS.find((a) => a.key === p.key);
    const pet = this._petName(byKey);
    if (action.press) {
      const data = { pet, type: action.type, date: p.date };
      const chosen = this._vaccineOptions().filter((v) => (p.vaccines || []).includes(v));
      if (action.text && (p.desc || "").trim()) data.description = p.desc.trim();
      // Send the next date only when it differs from what the sensor computes on its own.
      const next = action.recurring && !p.recurring ? "" : p.next;
      if (next && next !== this._builtinNext(action.type, p.date)) data.next_due = next;
      // Each vaccine is its own record, so the history lists (and deletes) them one by one.
      if (action.multi && chosen.length) chosen.forEach((v) => this._hass.callService("ha_pet_care", "add_record", { ...data, description: v }));
      else this._hass.callService("ha_pet_care", "add_record", data);
    } else {
      this._hass.callService("ha_pet_care", "add_weight", { pet, weight: Number(p.weight), date: p.date });
    }
    this._panel = null;
    this._flashKey(action.key);
  }

  _flashKey(key) {
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

  _press(key, target, press) {
    if (!press) {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: target } }));
      return;
    }
    this._hass.callService("button", "press", { entity_id: target });
    this._flashKey(key);
  }

  _fmtDate(iso) {
    const hass = this._hass;
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(hass.locale?.language || hass.language, {
      day: "2-digit", month: "short", year: "numeric",
    });
  }

  _historyHtml(t, byKey) {
    const hass = this._hass;
    const types = resolveList(this._config, "history_types");
    const limit = Math.max(1, Number(this._config.history_limit) || 15);
    const items = [];
    for (const h of HIST) {
      if (h.key === "weight" || !types.includes(h.key)) continue;
      const entityId = byKey[h.key];
      const list = entityId ? hass.states[entityId]?.attributes?.history : null;
      if (!Array.isArray(list)) continue;
      for (const rec of list) {
        // Older cards saved several vaccines in one record ("V10, Antirrábica"): one row each.
        const names = h.key === "vaccine" && rec.description ? rec.description.split(",").map((v) => v.trim()).filter(Boolean) : [];
        if (names.length > 1) names.forEach((name) => items.push({ ...rec, description: name, type: h.key, icon: h.icon, entityId }));
        else items.push({ ...rec, type: h.key, icon: h.icon, entityId });
      }
    }
    items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const weightList = types.includes("weight") && byKey.weight ? hass.states[byKey.weight]?.attributes?.history : null;
    const weightCount = Array.isArray(weightList) ? weightList.length : 0;

    // One filter button per sensor that actually has data, in the order set in the editor.
    const counts = {};
    for (const it of items) counts[it.type] = (counts[it.type] || 0) + 1;
    if (weightCount) counts.weight = weightCount;
    const available = types.filter((k, i) => counts[k] && types.indexOf(k) === i);
    // Weight is selected by default; otherwise the first available filter.
    const filter = available.includes(this._histFilter) ? this._histFilter : available.includes("weight") ? "weight" : available[0];
    let out = "";
    if (available.length > 1) {
      const chip = (key, icon, label) => `<button class="chip ${filter === key ? "on" : ""}" data-hfilter="${key}" title="${this._esc(label)}" aria-label="${this._esc(label)}"><ha-icon icon="${icon}"></ha-icon></button>`;
      out += `<div class="chips">${available
        .map((k) => chip(k, HIST.find((h) => h.key === k).icon, `${t[`hist_${k}`]} (${counts[k]})`))
        .join("")}</div>`;
    }

    if (filter === "weight") {
      out += this._weightHtml(t, byKey);
    } else if (filter) {
      const ofType = items.filter((it) => it.type === filter); // newest first
      const shown = ofType.slice(0, limit);
      // Gap between two ISO dates: days (<1 month), months (<1 year) or years; same day = "today".
      const span = (later, earlier) => {
        const [y1, m1, d1] = later.split("-").map(Number);
        const [y0, m0, d0] = earlier.split("-").map(Number);
        const days = Math.round((Date.UTC(y1, m1 - 1, d1) - Date.UTC(y0, m0 - 1, d0)) / 86400000);
        if (days <= 0) return t.today;
        const months = (y1 - y0) * 12 + (m1 - m0) - (d1 < d0 ? 1 : 0);
        if (months < 1) return t.span_d(days);
        return months < 12 ? t.span_m(months) : t.span_y(Math.floor(months / 12));
      };
      out += `<div class="timeline">${shown
        .map((it, i) => {
          // The previous (older) record of the same type; for vaccines, the previous dose of the same vaccine.
          const prev = it.type === "vaccine" && it.description
            ? ofType.slice(i + 1).find((o) => o.description === it.description)
            : ofType[i + 1];
          const detail = [it.description, it.notes].filter(Boolean).join(" · ");
          return `<div class="hrow" data-entity="${this._esc(it.entityId)}">
            <ha-icon icon="${it.icon}"></ha-icon>
            <div class="htext"><div class="htype">${this._esc(t[`hist_${it.type}`])}</div>${detail ? `<small>${this._esc(detail)}</small>` : ""}</div>
            <div class="value">${this._esc(this._fmtDate(it.date))}<small>${prev ? this._esc(span(it.date, prev.date)) : ""}</small></div>
            ${this._delBtn(t, "record", it.record_id)}
          </div>`;
        })
        .join("")}</div>`;
    }
    return out || `<div class="empty">${this._esc(t.no_history)}</div>`;
  }

  // Trash button: the first tap arms it (red), a second tap within 3 s deletes.
  _delBtn(t, kind, id) {
    if (!id) return "";
    const key = `${kind}:${id}`;
    const armed = this._armedDel === key;
    const label = armed ? t.del_confirm : t.del_title;
    return `<button type="button" class="del ${armed ? "armed" : ""}" data-del="${this._esc(key)}" title="${this._esc(label)}" aria-label="${this._esc(label)}"><ha-icon icon="${armed ? "mdi:delete-alert" : "mdi:delete"}"></ha-icon></button>`;
  }

  _weightHtml(t, byKey) {
    const hass = this._hass;
    const entityId = byKey.weight;
    const stateObj = entityId ? hass.states[entityId] : undefined;
    const hist = stateObj?.attributes?.history;
    if (!Array.isArray(hist) || !hist.length) return "";
    const pts = [...hist].reverse(); // oldest first
    const unit = stateObj.attributes.unit_of_measurement || "kg";
    const W = 300, H = 110, px = 14, py = 14;
    const ws = pts.map((p) => Number(p.weight));
    const min = Math.min(...ws), max = Math.max(...ws);
    const span = max - min || 1;
    const x = (i) => (pts.length === 1 ? W / 2 : px + (i * (W - 2 * px)) / (pts.length - 1));
    const y = (v) => H - py - ((v - min) / span) * (H - 2 * py);
    const line = pts.length > 1 ? `<polyline fill="none" stroke="var(--primary-color)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="${pts.map((p, i) => `${x(i).toFixed(1)},${y(Number(p.weight)).toFixed(1)}`).join(" ")}"/>` : "";
    const dots = pts.map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(Number(p.weight)).toFixed(1)}" r="3.5" fill="var(--primary-color)"><title>${this._esc(`${this._fmtDate(p.date)}: ${p.weight} ${unit}`)}</title></circle>`).join("");
    const last = pts[pts.length - 1];
    return `<div class="wsec" data-entity="${this._esc(entityId)}">
      <div class="wtitle"><span>${this._esc(t.weight_history)}</span><span class="value">${this._esc(`${last.weight} ${unit}`)}</span></div>
      <svg viewBox="0 0 ${W} ${H}" class="chart" role="img">${line}${dots}</svg>
      <div class="wdates"><span>${this._esc(this._fmtDate(pts[0].date))}</span><span>${pts.length > 1 ? this._esc(this._fmtDate(last.date)) : ""}</span></div>
    </div>
    <div class="wlist">${hist
      .slice(0, Math.max(1, Number(this._config.history_limit) || 15))
      .map((h) => `<div class="wrow"><span class="wdate">${this._esc(this._fmtDate(h.date))}</span><span class="value">${this._esc(`${h.weight} ${unit}`)}</span>${this._delBtn(t, "weight", h.record_id)}</div>`)
      .join("")}</div>`;
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

  _render(force = false) {
    if (!this._config || !this._hass) return;
    if (!force && this._panel && this.querySelector(".panel input:not([type=checkbox]):focus")) return; // never rebuild while the user types
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
    const wanted = resolveList(this._config, "fields");
    const rows = wanted.map((k) => ROWS.find((r) => r.key === k)).filter(Boolean);
    const tabsOn = this._config.show_history !== false;
    const tab = tabsOn && this._tab === "history" ? "history" : "summary";
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
          .actions, .chips { display: flex; flex-wrap: nowrap; gap: 8px; }
          .act, .chip { flex: 1 1 0; min-width: 0; height: 40px; padding: 0; display: inline-flex; align-items: center;
                        justify-content: center; border-radius: 12px; border: 1px solid var(--divider-color);
                        background: var(--secondary-background-color); color: var(--primary-text-color); cursor: pointer; }
          .act:hover { border-color: var(--primary-color); }
          .act ha-icon { --mdc-icon-size: 22px; color: var(--primary-color); }
          .act.open { border-color: var(--primary-color); background: var(--card-background-color); }
          .act.done { border-color: var(--success-color, #43a047); }
          .act.done ha-icon { color: var(--success-color, #43a047); }
          .panel { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 10px; padding: 12px;
                   border: 1px solid var(--primary-color); border-radius: 12px; }
          .panel .ptitle { flex: 1 0 100%; font-weight: 500; color: var(--primary-text-color); }
          .panel label { display: flex; flex-direction: column; gap: 4px; font-size: 0.8em; color: var(--secondary-text-color); }
          .panel input { font: inherit; font-size: 1rem; padding: 6px 8px; border-radius: 8px; min-width: 0;
                         border: 1px solid var(--divider-color); background: var(--secondary-background-color);
                         color: var(--primary-text-color); }
          .vwrap { flex: 1 0 100%; }
          .vlabel { font-size: 0.8em; color: var(--secondary-text-color); margin-bottom: 6px; }
          .vchips { display: flex; flex-wrap: wrap; gap: 6px; }
          .vchip { font: inherit; font-size: 0.9em; padding: 5px 12px; border-radius: 16px; cursor: pointer;
                   border: 1px solid var(--divider-color); background: var(--secondary-background-color);
                   color: var(--primary-text-color); }
          .vchip.on { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color, #fff); }
          .panel input.w { width: 6.5em; }
          .panel label.grow { flex: 1 0 100%; }
          .panel label.chk { flex: 1 0 100%; flex-direction: row; align-items: center; gap: 6px; font-size: 0.9em; color: var(--primary-text-color); cursor: pointer; }
          .panel label.chk input { min-width: auto; width: 18px; height: 18px; margin: 0; }
          .pbtns { display: flex; gap: 8px; margin-left: auto; }
          .pbtn { font: inherit; padding: 7px 14px; border-radius: 16px; cursor: pointer;
                  border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); }
          .pbtn.ok { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color, #fff); }
          .pbtn:disabled { opacity: 0.4; cursor: default; }
          .tabs { display: flex; border-bottom: 1px solid var(--divider-color); margin: 0 -16px; padding: 0 16px; }
          .tab { flex: 1; background: none; border: none; border-bottom: 2px solid transparent; padding: 10px 4px;
                 font: inherit; font-weight: 500; color: var(--secondary-text-color); cursor: pointer; }
          .tab.on { color: var(--primary-color); border-bottom-color: var(--primary-color); }
          .chip ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
          .chip:hover { border-color: var(--primary-color); }
          .chip.on { background: var(--primary-color); border-color: var(--primary-color); }
          .chip.on ha-icon { color: var(--text-primary-color, #fff); }
          .hrow { display: flex; align-items: center; gap: 12px; padding: 10px 0; cursor: pointer;
                  border-top: 1px solid var(--divider-color); }
          .hrow:first-child { border-top: none; }
          .hrow ha-icon { color: var(--primary-color); flex: none; }
          .htext { flex: 1; min-width: 0; }
          .htype { color: var(--primary-text-color); font-weight: 500; }
          .htext small { display: block; color: var(--secondary-text-color); overflow: hidden; text-overflow: ellipsis; }
          .empty { color: var(--secondary-text-color); text-align: center; padding: 16px 0; }
          .wsec { border-top: 1px solid var(--divider-color); padding-top: 12px; cursor: pointer; }
          .wsec:first-child { border-top: none; padding-top: 0; }
          .wtitle { display: flex; justify-content: space-between; align-items: flex-start; font-weight: 500; color: var(--primary-text-color); }
          .chart { width: 100%; height: auto; margin-top: 6px; }
          .del { flex: none; background: none; border: none; cursor: pointer; padding: 4px; border-radius: 50%;
                 color: var(--secondary-text-color); display: flex; align-items: center; justify-content: center; }
          .del ha-icon, .hrow .del ha-icon { --mdc-icon-size: 20px; color: inherit; }
          .del:hover { color: var(--primary-text-color); }
          .del.armed { color: var(--error-color, #db4437); background: rgba(219, 68, 55, 0.14); }
          .wlist { margin-top: 8px; }
          .wrow { display: flex; align-items: center; gap: 12px; padding: 6px 0; border-top: 1px solid var(--divider-color); }
          .wrow .wdate { flex: 1; }
          .wdates { display: flex; justify-content: space-between; color: var(--secondary-text-color); font-size: 0.8em; }
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
          ${tabsOn ? `<div class="tabs">
            <button class="tab ${tab === "summary" ? "on" : ""}" data-tab="summary">${this._esc(t.tab_summary)}</button>
            <button class="tab ${tab === "history" ? "on" : ""}" data-tab="history">${this._esc(t.tab_history)}</button>
          </div>` : ""}
          ${tab === "history"
            ? this._historyHtml(t, byKey)
            : `${this._actionsHtml(t, byKey)}<div class="rows">${rows.map((r) => this._row(t, r, byKey)).join("")}</div>`}
        </div>
      </ha-card>`;
    if (html === this._last) return;
    this._last = html;
    this.innerHTML = html;
    this.querySelectorAll("[data-tab]").forEach((el) => {
      el.addEventListener("click", () => {
        this._tab = el.dataset.tab;
        this._armedDel = null;
        this._panel = null;
        this._last = null;
        this._render();
      });
    });
    this.querySelectorAll("[data-hfilter]").forEach((el) => {
      el.addEventListener("click", () => {
        this._histFilter = el.dataset.hfilter;
        this._armedDel = null;
        this._last = null;
        this._render();
      });
    });
    this.querySelectorAll("[data-del]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const key = el.dataset.del;
        clearTimeout(this._delTimer);
        if (this._armedDel === key) {
          const [kind, ...rest] = key.split(":");
          this._armedDel = null;
          this._hass.callService("ha_pet_care", kind === "weight" ? "remove_weight" : "remove_record", {
            pet: this._petName(byKey),
            record_id: rest.join(":"),
          });
        } else {
          this._armedDel = key;
          this._delTimer = setTimeout(() => { this._armedDel = null; this._last = null; this._render(); }, 3000);
        }
        this._last = null;
        this._render();
      });
    });
    const panel = this.querySelector(".panel");
    if (panel) {
      const ok = panel.querySelector("[data-pok]");
      const sync = () => { ok.disabled = !this._panelValid(); };
      sync();
      panel.querySelectorAll("[data-pfield]").forEach((inp) => {
        inp.addEventListener("input", () => {
          const field = inp.dataset.pfield;
          this._panel[field] = inp.value;
          const nextInp = panel.querySelector('[data-pfield="next"]');
          if (field === "next") this._panel.nextEdited = true;
          if (field === "date" && nextInp) {
            const type = ACTIONS.find((a) => a.key === this._panel.key)?.type;
            nextInp.min = inp.value;
            // Follow the event date until the user picks a next date by hand.
            if (!this._panel.nextEdited) {
              this._panel.next = this._defaultNext(type, inp.value);
              nextInp.value = this._panel.next;
            }
          }
          sync();
        });
        inp.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") { ev.preventDefault(); this._submitPanel(byKey); }
          if (ev.key === "Escape") { this._panel = null; this._last = null; this._render(); }
        });
      });
      const rec = panel.querySelector("[data-precurring]");
      if (rec) {
        rec.addEventListener("change", () => {
          this._panel.recurring = rec.checked;
          const type = ACTIONS.find((a) => a.key === this._panel.key)?.type;
          if (rec.checked && !this._panel.next) this._panel.next = this._defaultNext(type, this._panel.date);
          this._last = null;
          this._render(true);
          if (rec.checked) this.querySelector('.panel [data-pfield="next"]')?.focus();
        });
      }
      panel.querySelectorAll("[data-remedy]").forEach((chip) => {
        chip.addEventListener("click", () => {
          const v = chip.dataset.remedy;
          this._panel.desc = this._panel.desc === v ? "" : v;
          this._last = null;
          this._render(true);
        });
      });
      panel.querySelectorAll("[data-vaccine]").forEach((chip) => {
        chip.addEventListener("click", () => {
          const list = this._panel.vaccines || [];
          const v = chip.dataset.vaccine;
          this._panel.vaccines = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
          this._last = null;
          this._render();
        });
      });
      ok.addEventListener("click", () => this._submitPanel(byKey));
      panel.querySelector("[data-pcancel]").addEventListener("click", () => { this._panel = null; this._last = null; this._render(); });
    }
    this.querySelectorAll("[data-action]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (this._config.ask_date === false) {
          this._press(el.dataset.action, el.dataset.target, el.dataset.press === "true");
        } else if (this._panel && this._panel.key === el.dataset.action) {
          this._panel = null; this._last = null; this._render();
        } else {
          this._openPanel(el.dataset.action, byKey);
        }
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
    config = { ...config, card_version: CARD_VERSION };
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: true, composed: true, detail: { config } }));
    this._renderLists();
  }

  _selected(name) {
    return resolveList(this._config, name);
  }

  _listHtml(name, items, defaults, t, label) {
    const selected = this._selected(name, items, defaults);
    const rest = items.filter((i) => !selected.includes(i.key)).map((i) => i.key);
    const row = (key, checked) => `<div class="item ${checked ? "on" : "off"}" data-key="${key}">
          ${checked && LISTS[name].sortable
            ? `<span class="handle" title="${t.drag}"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/></svg></span>`
            : `<span class="handle off"></span>`}
          <label><input type="checkbox" data-list="${name}" data-toggle="${key}" ${checked ? "checked" : ""}> ${this._labelFor(name, key, t)}</label>
        </div>`;
    const rows = selected.map((k) => row(k, true)).join("") + rest.map((k) => row(k, false)).join("");
    return this._section(name, label, `<div class="hint">${t.order_hint}</div><div class="list" data-list="${name}">${rows}</div>`);
  }

  // Collapsible section, like the ones ha-form draws; remembers which ones are open across re-renders.
  _section(id, title, inner) {
    const open = this._openSecs?.has(id);
    const safe = String(title).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    if (customElements.get("ha-expansion-panel")) {
      return `<ha-expansion-panel outlined class="sec" data-sec="${id}" header="${safe}" ${open ? "expanded" : ""}><div class="inner">${inner}</div></ha-expansion-panel>`;
    }
    return `<details class="sec" data-sec="${id}" ${open ? "open" : ""}><summary>${safe}</summary><div class="inner">${inner}</div></details>`;
  }

  _labelFor(name, key, t) {
    return LISTS[name].label(t, key);
  }

  // ---------------------------------------------------------------- photo
  _photoEntity() {
    const deviceId = this._hass.entities?.[this._config.entity]?.device_id;
    if (!deviceId) return null;
    const ent = Object.values(this._hass.entities).find(
      (e) => e.device_id === deviceId && e.platform === "ha_pet_care" && e.translation_key === "photo"
    );
    return ent ? this._hass.states[ent.entity_id] : null;
  }

  _btn(attr, label, primary = false) {
    if (customElements.get("ha-button")) {
      return `<ha-button ${attr} ${primary ? 'variant="brand" appearance="filled" raised unelevated' : 'appearance="plain"'}>${label}</ha-button>`;
    }
    return `<button type="button" ${attr}>${label}</button>`;
  }

  // The photo block of the Display section: current photo + "Change photo", or the framing editor.
  _renderPhoto() {
    if (!this._photoBox) return;
    const t = tr(this._hass);
    const esc = (v) => String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const c = this._crop;
    const pic = this._photoEntity()?.attributes?.entity_picture;
    const status = this._photoStatus || (c ? t.photo_crop_hint : t.photo_hint);
    const html = c
      ? `<div class="crop">
          <canvas class="cropc" width="${CROP_VIEW * 2}" height="${CROP_VIEW * 2}"></canvas>
          <label class="zoom">${esc(t.photo_zoom)}<input type="range" min="1" max="4" step="0.01" value="${c.zoom}" data-zoom></label>
          <div class="pbtns">${this._btn("data-pcancel", esc(t.photo_cancel))}${this._btn("data-psave", esc(t.photo_save), true)}</div>
        </div><p class="phint">${esc(status)}</p>`
      : `<div class="pbox">
          ${pic ? `<img class="pcur" src="${esc(pic)}" alt="">` : `<div class="pcur"></div>`}
          ${this._btn("data-ppick", esc(t.photo_upload))}
          <input type="file" accept="image/*" hidden data-pfile>
        </div><p class="phint">${esc(status)}</p>`;
    if (html === this._photoHtml) return;
    this._photoHtml = html;
    this._photoBox.innerHTML = html;
    const box = this._photoBox;
    if (!c) {
      const file = box.querySelector("[data-pfile]");
      box.querySelector("[data-ppick]").addEventListener("click", () => file.click());
      file.addEventListener("change", () => file.files?.[0] && this._startCrop(file.files[0]));
      return;
    }
    const canvas = box.querySelector(".cropc");
    this._drawCrop(canvas, CROP_VIEW * 2);
    box.querySelector("[data-zoom]").addEventListener("input", (ev) => {
      c.zoom = Number(ev.target.value);
      this._clampCrop();
      this._drawCrop(canvas, CROP_VIEW * 2);
    });
    canvas.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      canvas.setPointerCapture?.(ev.pointerId);
      const rect = canvas.getBoundingClientRect();
      const k = CROP_VIEW / rect.width; // screen px -> crop px
      let last = { x: ev.clientX, y: ev.clientY };
      const move = (e) => {
        c.ox += (e.clientX - last.x) * k;
        c.oy += (e.clientY - last.y) * k;
        last = { x: e.clientX, y: e.clientY };
        this._clampCrop();
        this._drawCrop(canvas, CROP_VIEW * 2);
      };
      const up = () => { canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", up); };
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", up);
      canvas.addEventListener("pointercancel", up);
    });
    canvas.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      c.zoom = Math.min(4, Math.max(1, c.zoom * (ev.deltaY < 0 ? 1.08 : 1 / 1.08)));
      box.querySelector("[data-zoom]").value = c.zoom;
      this._clampCrop();
      this._drawCrop(canvas, CROP_VIEW * 2);
    }, { passive: false });
    box.querySelector("[data-pcancel]").addEventListener("click", () => this._endCrop());
    box.querySelector("[data-psave]").addEventListener("click", () => this._saveCrop());
  }

  _startCrop(file) {
    const t = tr(this._hass);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      this._crop = { img, url, zoom: 1, ox: 0, oy: 0 };
      this._photoStatus = null;
      this._renderPhoto();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      this._photoStatus = t.photo_bad;
      this._renderPhoto();
    };
    img.src = url;
  }

  _endCrop() {
    if (this._crop) URL.revokeObjectURL(this._crop.url);
    this._crop = null;
    this._renderPhoto();
  }

  // Image size in crop px: it always covers the square, so the photo never has empty borders.
  _cropSize() {
    const { img, zoom } = this._crop;
    const base = Math.max(CROP_VIEW / img.naturalWidth, CROP_VIEW / img.naturalHeight);
    return { w: img.naturalWidth * base * zoom, h: img.naturalHeight * base * zoom };
  }

  _clampCrop() {
    const c = this._crop;
    const { w, h } = this._cropSize();
    const mx = (w - CROP_VIEW) / 2, my = (h - CROP_VIEW) / 2;
    c.ox = Math.min(mx, Math.max(-mx, c.ox));
    c.oy = Math.min(my, Math.max(-my, c.oy));
  }

  // Draw the framed photo on a canvas of `size` px; `preview` adds the round guide the card uses.
  _drawCrop(canvas, size, preview = true) {
    const c = this._crop;
    const ctx = canvas.getContext("2d");
    const k = size / CROP_VIEW;
    const { w, h } = this._cropSize();
    ctx.clearRect(0, 0, size, size);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(c.img, ((CROP_VIEW - w) / 2 + c.ox) * k, ((CROP_VIEW - h) / 2 + c.oy) * k, w * k, h * k);
    if (!preview) return;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.rect(0, 0, size, size);
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
    ctx.restore();
  }

  async _saveCrop() {
    const t = tr(this._hass);
    const out = document.createElement("canvas");
    out.width = out.height = CROP_OUT;
    this._drawCrop(out, CROP_OUT, false);
    this._photoStatus = t.photo_sending;
    this._photoHtml = null;
    this._renderPhoto();
    this._photoBox.querySelectorAll("[data-psave],[data-pcancel]").forEach((b) => (b.disabled = true));
    try {
      const blob = await new Promise((resolve, reject) =>
        out.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas"))), "image/jpeg", 0.9)
      );
      const form = new FormData();
      form.append("file", blob, "photo.jpg");
      const resp = await this._hass.fetchWithAuth("/api/file_upload", { method: "POST", body: form });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const { file_id } = await resp.json();
      const deviceId = this._hass.entities?.[this._config.entity]?.device_id;
      const pet = this._hass.devices?.[deviceId]?.name || this._config.name || "";
      await this._hass.callService("ha_pet_care", "set_photo", { pet, file_id });
      this._photoStatus = t.photo_done;
      this._endCrop();
    } catch (err) {
      this._photoStatus = t.photo_error(err?.message || String(err));
      this._photoHtml = null;
      this._renderPhoto();
    }
  }

  _renderLists() {
    if (!this._lists || !this._hass || !this._config) return;
    if (this._dragging) return; // Home Assistant pushes updates constantly; never rebuild mid-drag
    const t = tr(this._hass);
    const html = `<style>
        /* Same rhythm as ha-form's sections: 24px between sections, 12px inside. */
        .sec { display: block; margin-top: 24px; --expansion-panel-content-padding: 0;
               border-radius: var(--ha-border-radius-md, 12px); --ha-card-border-radius: var(--ha-border-radius-md, 12px); }
        details.sec { border: 1px solid var(--divider-color); padding: 0 12px; }
        details.sec summary { cursor: pointer; padding: 14px 0; font-weight: 500; }
        .sec .inner { padding: 12px; }
        details.sec .inner { padding: 0 0 12px; }
        /* Like ha-form inside a section: 12px padding, 24px below the description, 4px between list rows. */
        .hint { color: var(--secondary-text-color); margin: 0 0 24px; }
        .list { display: flex; flex-direction: column; gap: 4px; }
        .item { display: flex; align-items: center; gap: 8px; padding: 2px 8px 2px 4px; border-radius: 8px;
                background: var(--card-background-color); border: 1px solid transparent; }
        .item.on { border-color: var(--divider-color); }
        .item.dragging { opacity: 0.85; box-shadow: 0 2px 8px rgba(0,0,0,.3); position: relative; z-index: 2;
                         border-color: var(--primary-color); }
        .item label { display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; padding: 8px 0; }
        .handle { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center;
                  color: var(--secondary-text-color); cursor: grab; touch-action: none; user-select: none; }
        .handle.off { cursor: default; }
        .item.off label { color: var(--secondary-text-color); }
      </style>
      ${this._listHtml("actions", ACTIONS, DEFAULT_ACTIONS, t, t.actions)}
      ${this._listHtml("fields", ROWS, DEFAULT_FIELDS, t, t.fields)}
      ${this._listHtml("history_types", HIST, DEFAULT_HIST, t, t.history_types)}`;
    if (html === this._listsHtml) return; // nothing changed: keep the DOM (and its listeners)
    this._listsHtml = html;
    this._lists.innerHTML = html;
    this._openSecs = this._openSecs || new Set();
    this._lists.querySelectorAll("[data-sec]").forEach((sec) => {
      const remember = (open) => (open ? this._openSecs.add(sec.dataset.sec) : this._openSecs.delete(sec.dataset.sec));
      sec.addEventListener("expanded-changed", (ev) => remember(ev.detail?.expanded));
      sec.addEventListener("toggle", () => { if (sec.tagName === "DETAILS") remember(sec.open); });
    });
    this._lists.querySelectorAll("input[data-toggle]").forEach((el) => {
      el.addEventListener("change", () => {
        const name = el.dataset.list;
        const items = LISTS[name].items;
        const defaults = LISTS[name].defaults;
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
          const items = LISTS[name].items;
          const defaults = LISTS[name].defaults;
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
      // Layout: entity form, Display section (its own form + the photo block), the other sections, the lists.
      this._formTop = document.createElement("ha-form");
      this._formDisplay = document.createElement("ha-form");
      this._form = document.createElement("ha-form");
      const onValue = (ev) => {
        const { fields, actions, history_types, ...rest } = ev.detail.value;
        const config = { ...this._config, ...rest };
        // Lists are saved as typed (blank rows and spaces kept) so "add" and typing work; the card trims them on use.
        // The vaccine list stays out of the config while it matches the language default.
        const vaccines = Array.isArray(config.vaccine_options) ? config.vaccine_options.map((v) => String(v ?? "")) : [];
        if (vaccines.join("|") === tr(this._hass).vaccines.join("|")) delete config.vaccine_options;
        else config.vaccine_options = vaccines;
        const remedies = Array.isArray(config.remedy_options) ? config.remedy_options.map((v) => String(v ?? "")) : [];
        if (remedies.length) config.remedy_options = remedies;
        else delete config.remedy_options;
        for (const type of INTERVAL_TYPES) {
          const v = config[`interval_${type}`];
          if (v === undefined || v === null || v === "" || isNaN(Number(v))) delete config[`interval_${type}`];
          else config[`interval_${type}`] = Math.max(0, Math.round(Number(v)));
        }
        this._emit(config);
      };
      [this._formTop, this._formDisplay, this._form].forEach((f) => f.addEventListener("value-changed", onValue));
      const style = document.createElement("style");
      style.textContent = `
        .dsec { display: block; margin-top: 24px; --expansion-panel-content-padding: 0;
                border-radius: var(--ha-border-radius-md, 12px); --ha-card-border-radius: var(--ha-border-radius-md, 12px); }
        details.dsec { border: 1px solid var(--divider-color); padding: 0 12px; }
        details.dsec summary { cursor: pointer; padding: 14px 0; font-weight: 500; }
        .dsec .dinner { padding: 12px; }
        details.dsec .dinner { padding: 0 0 12px; }
        .main-form { display: block; margin-top: 24px; }
        .photo { margin-top: 24px; }
        .pbox { display: flex; align-items: center; gap: 16px; }
        .pcur { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; flex: none; background: var(--secondary-background-color); }
        .crop { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .cropc { width: ${CROP_VIEW}px; height: ${CROP_VIEW}px; max-width: 100%; border-radius: 8px; cursor: grab; touch-action: none;
                 background: var(--secondary-background-color); }
        .zoom { display: flex; align-items: center; gap: 8px; width: 100%; max-width: ${CROP_VIEW}px; color: var(--secondary-text-color); }
        .zoom input { flex: 1; }
        .pbtns { display: flex; gap: 8px; justify-content: flex-end; width: 100%; max-width: ${CROP_VIEW}px; }
        .phint { color: var(--secondary-text-color); margin: 8px 0 0; font-size: 0.875em; }
      `;
      const panel = customElements.get("ha-expansion-panel");
      this._dispSec = document.createElement(panel ? "ha-expansion-panel" : "details");
      this._dispSec.className = "dsec";
      if (panel) this._dispSec.outlined = true;
      const inner = document.createElement("div");
      inner.className = "dinner";
      this._photoBox = document.createElement("div");
      this._photoBox.className = "photo";
      inner.append(this._formDisplay, this._photoBox);
      if (!panel) this._dispSec.append(document.createElement("summary"));
      this._dispSec.append(inner);
      this._form.className = "main-form";
      this._lists = document.createElement("div");
      this.append(style, this._formTop, this._dispSec, this._form, this._lists);
    }
    // Once per editor opening, add remedies already logged to the saved list (so they can be edited or removed).
    if (!this._remedySynced && this._config.entity && this._hass.entities?.[this._config.entity]) {
      this._remedySynced = true;
      const current = Array.isArray(this._config.remedy_options) ? this._config.remedy_options : [];
      const known = new Set(current.map((v) => String(v ?? "").trim().toLowerCase()));
      const missing = mergeNames(loggedRemedies(this._hass, this._config)).filter((v) => !known.has(v.toLowerCase()));
      if (missing.length) {
        this._emit({ ...this._config, remedy_options: [...current.filter((v) => String(v ?? "").trim()), ...missing] });
      }
    }
    const t = tr(this._hass);
    const data = { show_photo: true, show_name: true, show_history: true, ask_date: true, history_limit: 15, vaccine_options: t.vaccines, ...this._config };
    for (const f of [this._formTop, this._formDisplay, this._form]) {
      f.hass = this._hass;
      f.data = data;
    }
    if (this._dispSec.tagName === "DETAILS") this._dispSec.querySelector("summary").textContent = t.sec_display;
    else this._dispSec.header = t.sec_display;
    this._formTop.schema = [{ name: "entity", required: true, selector: { entity: { integration: "ha_pet_care" } } }];
    this._formDisplay.schema = [
      { name: "name", selector: { text: {} } },
      { name: "show_photo", selector: { boolean: {} } },
      { name: "show_name", selector: { boolean: {} } },
      { name: "ask_date", selector: { boolean: {} } },
    ];
    this._form.schema = [
      {
        name: "sec_logging",
        type: "expandable",
        flatten: true,
        title: t.sec_logging,
        schema: [
          { name: "vaccine_options", selector: { text: { multiple: true } } },
        ],
      },
      {
        name: "sec_remedies",
        type: "expandable",
        flatten: true,
        title: t.sec_remedies,
        schema: [{ name: "remedy_options", selector: { text: { multiple: true } } }],
      },
      {
        name: "sec_history",
        type: "expandable",
        flatten: true,
        title: t.sec_history,
        schema: [
          { name: "show_history", selector: { boolean: {} } },
          { name: "history_limit", selector: { number: { min: 1, max: 50, mode: "box" } } },
        ],
      },
      {
        name: "intervals",
        type: "expandable",
        title: t.intervals,
        flatten: true,
        schema: INTERVAL_TYPES.map((type) => ({ name: `interval_${type}`, selector: { number: { min: 0, max: 3650, mode: "box", unit_of_measurement: "d" } } })),
      },
    ];
    const labels = { entity: t.entity, name: t.name, show_photo: t.show_photo, show_name: t.show_name, show_history: t.show_history, ask_date: t.ask_date, history_limit: t.history_limit, vaccine_options: t.vaccine_options, remedy_options: t.remedy_options, sec_remedies: t.sec_remedies, intervals: t.intervals, sec_display: t.sec_display, sec_logging: t.sec_logging, sec_history: t.sec_history };
    for (const type of INTERVAL_TYPES) {
      labels[`interval_${type}`] = t.interval(t[`act_add_${type}`], NEXT_MONTHS[type] ? t.months(NEXT_MONTHS[type]) : t.no_default);
    }
    // ha-form shows an expandable section's helper as its first line.
    for (const f of [this._formTop, this._formDisplay, this._form]) {
      f.computeLabel = (s) => labels[s.name] || s.name;
      f.computeHelper = (s) => (s.name === "intervals" ? t.intervals_hint : undefined);
    }
    this._renderPhoto();
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
