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
    tab_summary: "Resumo",
    tab_history: "Histórico",
    show_history: "Mostrar aba Histórico",
    history_types: "Filtros do histórico",
    history_limit: "Quantidade de itens no histórico",
    no_history: "Nenhum registro ainda",
    ask_date: "Perguntar a data ao registrar",
    panel_title: (x) => `Registrar ${x.toLowerCase()}`,
    panel_title_weight: "Registrar peso",
    panel_date: "Data do evento",
    panel_weight: "Peso (kg)",
    panel_ok: "Registrar",
    panel_cancel: "Cancelar",
    weight_history: "Evolução do peso",
    hist_vaccine: "Vacina",
    hist_deworming: "Vermífugo",
    hist_bath: "Banho",
    hist_grooming: "Tosa",
    hist_vet_visit: "Consulta",
    hist_exam: "Exame",
    hist_weight: "Peso",
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
    tab_summary: "Summary",
    tab_history: "History",
    show_history: "Show History tab",
    history_types: "History filters",
    history_limit: "Number of history items",
    no_history: "No records yet",
    ask_date: "Ask for the date when logging",
    panel_title: (x) => `Log ${x.toLowerCase()}`,
    panel_title_weight: "Log weight",
    panel_date: "Event date",
    panel_weight: "Weight (kg)",
    panel_ok: "Log it",
    panel_cancel: "Cancel",
    weight_history: "Weight over time",
    hist_vaccine: "Vaccine",
    hist_deworming: "Dewormer",
    hist_bath: "Bath",
    hist_grooming: "Grooming",
    hist_vet_visit: "Vet visit",
    hist_exam: "Exam",
    hist_weight: "Weight",
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
  { key: "add_vaccine", type: "vaccine", icon: "mdi:needle", press: true },
  { key: "add_deworming", type: "deworming", icon: "mdi:pill", press: true },
  { key: "add_bath", type: "bath", icon: "mdi:shower-head", press: true },
  { key: "add_grooming", type: "grooming", icon: "mdi:content-cut", press: true },
  { key: "add_vet_visit", type: "vet_visit", icon: "mdi:stethoscope", press: true },
  { key: "log_weight", icon: "mdi:scale-bathroom", press: false },
];
const DEFAULT_ACTIONS = ACTIONS.map((a) => a.key);
const HIST = [
  { key: "weight", icon: "mdi:weight-kilogram" },
  { key: "vaccine", icon: "mdi:needle" },
  { key: "deworming", icon: "mdi:pill" },
  { key: "bath", icon: "mdi:shower-head" },
  { key: "grooming", icon: "mdi:content-cut" },
  { key: "vet_visit", icon: "mdi:stethoscope" },
  { key: "exam", icon: "mdi:clipboard-pulse" },
];
const DEFAULT_HIST = HIST.map((h) => h.key);
const DEFAULT_FIELDS = ["age", "next_vaccine", "next_dewormer", "next_bath"];

const tr = (hass) =>
  (hass?.locale?.language || hass?.language || "en").toLowerCase().startsWith("pt")
    ? TEXTS.pt
    : TEXTS.en;

const LISTS = {
  actions: { items: ACTIONS, defaults: DEFAULT_ACTIONS, sortable: true, label: (t, k) => t[`act_${k}`] },
  fields: { items: ROWS, defaults: DEFAULT_FIELDS, sortable: true, label: (t, k) => t[k] },
  history_types: { items: HIST, defaults: DEFAULT_HIST, sortable: true, label: (t, k) => t[`hist_${k}`] },
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
    const wanted = Array.isArray(this._config.actions) ? this._config.actions : DEFAULT_ACTIONS;
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
      ${isWeight ? `<label>${this._esc(t.panel_weight)}<input class="w" type="number" inputmode="decimal" step="0.01" min="0.01" max="200" data-pfield="weight" value="${this._esc(p.weight ?? "")}"></label>` : ""}
      <label>${this._esc(t.panel_date)}<input type="date" max="${this._today()}" data-pfield="date" value="${this._esc(p.date)}"></label>
      <div class="pbtns">
        <button class="pbtn" data-pcancel>${this._esc(t.panel_cancel)}</button>
        <button class="pbtn ok" data-pok>${this._esc(t.panel_ok)}</button>
      </div>
    </div>`;
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
    return dateOk;
  }

  _openPanel(key, byKey) {
    let weight = "";
    if (key === "log_weight") {
      const v = byKey.log_weight ? this._hass.states[byKey.log_weight]?.state : undefined;
      weight = v && !isNaN(Number(v)) ? v : "";
    }
    this._panel = { key, date: this._today(), weight };
    this._last = null;
    this._render();
    const first = this.querySelector(".panel input");
    if (first && key === "log_weight") first.focus();
  }

  _submitPanel(byKey) {
    if (!this._panelValid()) return;
    const p = this._panel;
    const action = ACTIONS.find((a) => a.key === p.key);
    const pet = this._petName(byKey);
    if (action.press) {
      this._hass.callService("ha_pet_care", "add_record", { pet, type: action.type, date: p.date });
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
    const types = Array.isArray(this._config.history_types) ? this._config.history_types : DEFAULT_HIST;
    const limit = Math.max(1, Number(this._config.history_limit) || 15);
    const items = [];
    for (const h of HIST) {
      if (h.key === "weight" || !types.includes(h.key)) continue;
      const entityId = byKey[h.key];
      const list = entityId ? hass.states[entityId]?.attributes?.history : null;
      if (!Array.isArray(list)) continue;
      for (const rec of list) items.push({ ...rec, type: h.key, icon: h.icon, entityId });
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
      const shown = items.filter((it) => it.type === filter).slice(0, limit);
      out += `<div class="timeline">${shown
        .map((it) => {
          const days = this._daysUntil(it.date);
          const detail = [it.description, it.notes].filter(Boolean).join(" · ");
          return `<div class="hrow" data-entity="${this._esc(it.entityId)}">
            <ha-icon icon="${it.icon}"></ha-icon>
            <div class="htext"><div class="htype">${this._esc(t[`hist_${it.type}`])}</div>${detail ? `<small>${this._esc(detail)}</small>` : ""}</div>
            <div class="value">${this._esc(this._fmtDate(it.date))}<small>${this._esc(days === 0 ? t.today : days < 0 ? t.ago(-days) : t.in_days(days))}</small></div>
          </div>`;
        })
        .join("")}</div>`;
    }
    return out || `<div class="empty">${this._esc(t.no_history)}</div>`;
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
    </div>`;
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
    if (this._panel && this.querySelector(".panel :focus")) return; // never rebuild while the user types
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
          .panel input.w { width: 6.5em; }
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
        this._panel = null;
        this._last = null;
        this._render();
      });
    });
    this.querySelectorAll("[data-hfilter]").forEach((el) => {
      el.addEventListener("click", () => {
        this._histFilter = el.dataset.hfilter;
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
          this._panel[inp.dataset.pfield] = inp.value;
          sync();
        });
        inp.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") { ev.preventDefault(); this._submitPanel(byKey); }
          if (ev.key === "Escape") { this._panel = null; this._last = null; this._render(); }
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
          ${checked && LISTS[name].sortable
            ? `<span class="handle" title="${t.drag}"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/></svg></span>`
            : `<span class="handle off"></span>`}
          <label><input type="checkbox" data-list="${name}" data-toggle="${key}" ${checked ? "checked" : ""}> ${this._labelFor(name, key, t)}</label>
        </div>`;
    const rows = selected.map((k) => row(k, true)).join("") + rest.map((k) => row(k, false)).join("");
    return `<div class="sec"><div class="title">${label}</div><div class="list" data-list="${name}">${rows}</div></div>`;
  }

  _labelFor(name, key, t) {
    return LISTS[name].label(t, key);
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
      ${this._listHtml("fields", ROWS, DEFAULT_FIELDS, t, t.fields)}
      ${this._listHtml("history_types", HIST, DEFAULT_HIST, t, t.history_types)}`;
    if (html === this._listsHtml) return; // nothing changed: keep the DOM (and its listeners)
    this._listsHtml = html;
    this._lists.innerHTML = html;
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
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => {
        const { fields, actions, history_types, ...rest } = ev.detail.value;
        this._emit({ ...this._config, ...rest });
      });
      this._lists = document.createElement("div");
      this.appendChild(this._form);
      this.appendChild(this._lists);
    }
    const t = tr(this._hass);
    this._form.hass = this._hass;
    this._form.data = { show_photo: true, show_name: true, show_history: true, ask_date: true, history_limit: 15, ...this._config };
    this._form.schema = [
      { name: "entity", required: true, selector: { entity: { integration: "ha_pet_care" } } },
      { name: "name", selector: { text: {} } },
      { name: "show_photo", selector: { boolean: {} } },
      { name: "show_name", selector: { boolean: {} } },
      { name: "ask_date", selector: { boolean: {} } },
      { name: "show_history", selector: { boolean: {} } },
      { name: "history_limit", selector: { number: { min: 1, max: 50, mode: "box" } } },
    ];
    const labels = { entity: t.entity, name: t.name, show_photo: t.show_photo, show_name: t.show_name, show_history: t.show_history, ask_date: t.ask_date, history_limit: t.history_limit };
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
