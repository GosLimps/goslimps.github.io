'use strict';

/* ======================= Категории ======================= */
const CATEGORIES = [
  { id: 'SHRINE',       name: 'Святилища',            color: '#FF7043' },
  { id: 'TOWER',        name: 'Башни',                color: '#42A5F5' },
  { id: 'KOROK',        name: 'Семена короков',       color: '#9CCC65' },
  { id: 'DIVINE_BEAST', name: 'Божественные звери',   color: '#AB47BC' },
  { id: 'GREAT_FAIRY',  name: 'Великие феи',          color: '#EC407A' },
  { id: 'TECH_LAB',     name: 'Древние лаборатории',  color: '#26C6DA' },
  { id: 'VILLAGE',      name: 'Поселения',            color: '#FFCA28' },
  { id: 'STABLE',       name: 'Конюшни',              color: '#8D6E63' },
  { id: 'MEMORY',       name: 'Воспоминания',         color: '#FFD54F' },
  { id: 'SHRINE_QUEST', name: 'Квесты святилищ',      color: '#FFB300' },
  { id: 'SIDE_QUEST',   name: 'Побочные квесты',      color: '#66BB6A' },
  { id: 'MAIN_QUEST',   name: 'Основные квесты',      color: '#EF5350' },
  { id: 'TREASURE',     name: 'Сундуки',              color: '#FFEE58' },
  { id: 'MERCHANT',     name: 'Торговцы',             color: '#26A69A' },
  { id: 'DLC',          name: 'DLC-контент',          color: '#7E57C2' },
  { id: 'OTHER',        name: 'Прочее',               color: '#B0BEC5' },
];
const CAT_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const CAT_ORDER = Object.fromEntries(CATEGORIES.map((c, i) => [c.id, i]));
const LABEL_CATEGORIES = new Set(['TOWER', 'VILLAGE', 'DIVINE_BEAST', 'GREAT_FAIRY', 'TECH_LAB']);
const colorOf = (id) => (CAT_BY_ID[id] ? CAT_BY_ID[id].color : '#B0BEC5');
const nameOf = (id) => (CAT_BY_ID[id] ? CAT_BY_ID[id].name : id);

/* ======================= Встроенные метки =======================
   Нормализованное поле 0..1000: x запад→восток, y север→юг.
   Координаты приблизительные. Полный набор подгружается импортом JSON. */
const SEED = [
  // 15 башен
  { id: 'tower_great_plateau', name: 'Башня Великого плато', category: 'TOWER', x: 440, y: 545, region: 'Центральный Хайрул' },
  { id: 'tower_dueling_peaks', name: 'Башня Парных пиков', category: 'TOWER', x: 560, y: 630, region: 'Неклуда' },
  { id: 'tower_hateno', name: 'Башня Хатено', category: 'TOWER', x: 730, y: 650, region: 'Неклуда' },
  { id: 'tower_lanayru', name: 'Башня Ланайру', category: 'TOWER', x: 665, y: 420, region: 'Ланайру' },
  { id: 'tower_faron', name: 'Башня Фарон', category: 'TOWER', x: 575, y: 800, region: 'Фарон' },
  { id: 'tower_lake', name: 'Башня Озера', category: 'TOWER', x: 520, y: 710, region: 'Фарон' },
  { id: 'tower_wasteland', name: 'Башня Пустоши', category: 'TOWER', x: 235, y: 765, region: 'Герудо' },
  { id: 'tower_gerudo', name: 'Башня Герудо', category: 'TOWER', x: 305, y: 705, region: 'Герудо' },
  { id: 'tower_ridgeland', name: 'Башня Хребта', category: 'TOWER', x: 400, y: 440, region: 'Хребет Хайрула' },
  { id: 'tower_tabantha', name: 'Башня Табанта', category: 'TOWER', x: 270, y: 460, region: 'Табанта' },
  { id: 'tower_hebra', name: 'Башня Хебра', category: 'TOWER', x: 300, y: 255, region: 'Хебра' },
  { id: 'tower_woodland', name: 'Башня Лесной', category: 'TOWER', x: 520, y: 285, region: 'Великий лес Хайрула' },
  { id: 'tower_central', name: 'Центральная башня', category: 'TOWER', x: 515, y: 430, region: 'Центральный Хайрул' },
  { id: 'tower_eldin', name: 'Башня Эльдин', category: 'TOWER', x: 650, y: 255, region: 'Эльдин' },
  { id: 'tower_akkala', name: 'Башня Аккала', category: 'TOWER', x: 760, y: 255, region: 'Аккала' },
  // 4 божественных зверя
  { id: 'db_ruta', name: 'Вах Рута', category: 'DIVINE_BEAST', x: 745, y: 380, region: 'Ланайру', description: 'Слон. Связан с зора.' },
  { id: 'db_rudania', name: 'Вах Рудания', category: 'DIVINE_BEAST', x: 660, y: 180, region: 'Эльдин', description: 'Саламандра. Гора Смерти.' },
  { id: 'db_medoh', name: 'Вах Медо', category: 'DIVINE_BEAST', x: 240, y: 355, region: 'Табанта', description: 'Орёл. Связан с рито.' },
  { id: 'db_naboris', name: 'Вах Наборис', category: 'DIVINE_BEAST', x: 245, y: 765, region: 'Герудо', description: 'Верблюд. Пустыня Герудо.' },
  // 4 великие феи
  { id: 'fairy_cotera', name: 'Великая фея Котера', category: 'GREAT_FAIRY', x: 600, y: 560, region: 'Неклуда' },
  { id: 'fairy_kaysa', name: 'Великая фея Кайса', category: 'GREAT_FAIRY', x: 250, y: 430, region: 'Табанта' },
  { id: 'fairy_mija', name: 'Великая фея Миджа', category: 'GREAT_FAIRY', x: 790, y: 275, region: 'Аккала' },
  { id: 'fairy_tera', name: 'Великая фея Тера', category: 'GREAT_FAIRY', x: 270, y: 775, region: 'Герудо' },
  // 2 древние лаборатории
  { id: 'lab_hateno', name: 'Лаборатория Хатено', category: 'TECH_LAB', x: 790, y: 660, region: 'Неклуда', description: 'Перка / руководство по святилищам.' },
  { id: 'lab_akkala', name: 'Лаборатория Аккала', category: 'TECH_LAB', x: 815, y: 235, region: 'Аккала', description: 'Робби / древние стрелы.' },
  // Поселения
  { id: 'vil_castle', name: 'Замок Хайрула', category: 'VILLAGE', x: 505, y: 400, region: 'Центральный Хайрул', description: 'Логово Гэнона.' },
  { id: 'vil_kakariko', name: 'Деревня Какарико', category: 'VILLAGE', x: 615, y: 590, region: 'Неклуда', description: 'Импа. Старейшина шиика.' },
  { id: 'vil_hateno', name: 'Деревня Хатено', category: 'VILLAGE', x: 775, y: 675, region: 'Неклуда' },
  { id: 'vil_zora', name: 'Владения Зора', category: 'VILLAGE', x: 720, y: 360, region: 'Ланайру', description: 'Принц Сидон.' },
  { id: 'vil_goron', name: 'Город Горонов', category: 'VILLAGE', x: 660, y: 200, region: 'Эльдин', description: 'Юнобо.' },
  { id: 'vil_rito', name: 'Деревня Рито', category: 'VILLAGE', x: 230, y: 380, region: 'Табанта', description: 'Тели / Каасс.' },
  { id: 'vil_gerudo', name: 'Город Герудо', category: 'VILLAGE', x: 250, y: 745, region: 'Герудо', description: 'Рийю. Вход только женщинам.' },
  { id: 'vil_korok', name: 'Лес короков', category: 'VILLAGE', x: 520, y: 245, region: 'Великий лес Хайрула', description: 'Дерево Великий Дику. Мастер-меч.' },
  { id: 'vil_lurelin', name: 'Деревня Лурелин', category: 'VILLAGE', x: 725, y: 835, region: 'Фарон', description: 'Рыбацкая деревня на побережье.' },
  { id: 'vil_tarrey', name: 'Тэрри-таун', category: 'VILLAGE', x: 805, y: 295, region: 'Аккала', description: 'Город, который строишь сам.' },
  // Конюшни
  { id: 'stable_dueling', name: 'Конюшня Парных пиков', category: 'STABLE', x: 590, y: 650, region: 'Неклуда' },
  { id: 'stable_wetland', name: 'Конюшня Болот', category: 'STABLE', x: 605, y: 475, region: 'Ланайру' },
  { id: 'stable_riverside', name: 'Конюшня У реки', category: 'STABLE', x: 480, y: 500, region: 'Центральный Хайрул' },
  { id: 'stable_outskirt', name: 'Конюшня Окраины', category: 'STABLE', x: 415, y: 485, region: 'Центральный Хайрул' },
  { id: 'stable_lakeside', name: 'Конюшня У озера', category: 'STABLE', x: 560, y: 790, region: 'Фарон' },
  { id: 'stable_highland', name: 'Конюшня Нагорья', category: 'STABLE', x: 560, y: 755, region: 'Фарон' },
  { id: 'stable_foothill', name: 'Конюшня Предгорий', category: 'STABLE', x: 640, y: 235, region: 'Эльдин' },
  { id: 'stable_east_akkala', name: 'Конюшня Вост. Аккала', category: 'STABLE', x: 825, y: 255, region: 'Аккала' },
  { id: 'stable_south_akkala', name: 'Конюшня Южн. Аккала', category: 'STABLE', x: 760, y: 325, region: 'Аккала' },
  { id: 'stable_woodland', name: 'Конюшня Лесная', category: 'STABLE', x: 560, y: 295, region: 'Великий лес Хайрула' },
  { id: 'stable_snowfield', name: 'Конюшня Снежного поля', category: 'STABLE', x: 305, y: 305, region: 'Хебра' },
  { id: 'stable_tabantha', name: 'Конюшня Моста Табанта', category: 'STABLE', x: 305, y: 425, region: 'Табанта' },
  { id: 'stable_gerudo_canyon', name: 'Конюшня Каньона Герудо', category: 'STABLE', x: 345, y: 690, region: 'Герудо' },
  { id: 'stable_serenne', name: 'Конюшня Серенн', category: 'STABLE', x: 435, y: 385, region: 'Хребет Хайрула' },
  // Стартовые святилища Великого плато
  { id: 'shrine_oman_au', name: 'Святилище Оман Ау', category: 'SHRINE', x: 455, y: 540, region: 'Великое плато', description: 'Испытание Магнезиса.' },
  { id: 'shrine_ja_baij', name: 'Святилище Джа Бай', category: 'SHRINE', x: 470, y: 562, region: 'Великое плато', description: 'Испытание Бомб.' },
  { id: 'shrine_owa_daim', name: 'Святилище Ова Дайм', category: 'SHRINE', x: 425, y: 565, region: 'Великое плато', description: 'Испытание Стазиса.' },
  { id: 'shrine_keh_namut', name: 'Святилище Ке Намут', category: 'SHRINE', x: 415, y: 520, region: 'Великое плато', description: 'Испытание Криониса.' },
  // Примечательные святилища
  { id: 'shrine_ha_dahamar', name: 'Святилище Ха Дахамар', category: 'SHRINE', x: 585, y: 642, region: 'Неклуда' },
  { id: 'shrine_ree_dahee', name: 'Святилище Ри Дахи', category: 'SHRINE', x: 570, y: 628, region: 'Неклуда' },
  { id: 'shrine_myahm_agana', name: 'Святилище Мьям Агана', category: 'SHRINE', x: 770, y: 668, region: 'Неклуда' },
  { id: 'shrine_lakna_rokee', name: 'Святилище Лакна Роки', category: 'SHRINE', x: 505, y: 410, region: 'Центральный Хайрул' },
  { id: 'shrine_daqo_chisay', name: 'Святилище Дако Чисай', category: 'SHRINE', x: 255, y: 740, region: 'Герудо' },
  // Воспоминания
  { id: 'mem_sacred_ground', name: 'Священная земля (руины)', category: 'MEMORY', x: 500, y: 470, region: 'Центральный Хайрул', description: 'Каптированное воспоминание.' },
  { id: 'mem_ash_swamp', name: 'Болото Пепла', category: 'MEMORY', x: 470, y: 520, region: 'Центральный Хайрул' },
];

const REGIONS = [
  ['ЦЕНТРАЛЬНЫЙ ХАЙРУЛ', 505, 445],
  ['ВЕЛИКОЕ ПЛАТО', 430, 585],
  ['НЕКЛУДА', 670, 700],
  ['ФАРОН', 610, 845],
  ['ЛАНАЙРУ', 700, 430],
  ['АККАЛА', 800, 230],
  ['ЭЛЬДИН', 645, 150],
  ['ХЕБРА', 300, 210],
  ['ТАБАНТА', 235, 480],
  ['ГЕРУДО', 270, 800],
  ['ХРЕБЕТ ХАЙРУЛА', 390, 470],
  ['ВЕЛИКИЙ ЛЕС', 520, 215],
];

/* ======================= Константы карты ======================= */
const MAP_SIZE = 1000;
const MIN_SCALE = 0.6;
const MAX_SCALE = 10;

/* ======================= Хранилище ======================= */
const LS = {
  found: 'hyrule.found',
  enabled: 'hyrule.enabled',
  dataset: 'hyrule.dataset',
};
const lsGet = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v == null ? fallback : JSON.parse(v); }
  catch (e) { return fallback; }
};
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch (e) {} };

// IndexedDB — для своей картинки карты (может весить мегабайты).
function idbOpen() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('hyruleMap', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbSet(key, val) {
  const db = await idbOpen();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readwrite');
    tx.objectStore('kv').put(val, key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
async function idbGet(key) {
  const db = await idbOpen();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readonly');
    const rq = tx.objectStore('kv').get(key);
    rq.onsuccess = () => res(rq.result);
    rq.onerror = () => rej(rq.error);
  });
}
async function idbDel(key) {
  const db = await idbOpen();
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readwrite');
    tx.objectStore('kv').delete(key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

/* ======================= Состояние ======================= */
function loadDataset() {
  const saved = lsGet(LS.dataset, null);
  const list = Array.isArray(saved) ? saved : SEED;
  return list.map(sanitizeMarker).filter(Boolean);
}
function sanitizeMarker(m) {
  if (!m || m.id == null || m.name == null || m.category == null) return null;
  const x = Number(m.x), y = Number(m.y);
  if (!isFinite(x) || !isFinite(y)) return null;
  return {
    id: String(m.id),
    name: String(m.name),
    category: String(m.category),
    x, y,
    region: m.region == null ? '' : String(m.region),
    description: m.description == null ? '' : String(m.description),
  };
}

const state = {
  markers: loadDataset(),
  found: new Set(lsGet(LS.found, [])),
  enabled: null,            // Set категорий
  query: '',
  selected: null,           // выбранная метка
  mapImage: null,           // HTMLImageElement своей карты
  mapImageURL: null,
  // камера
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  cssW: 0,
  cssH: 0,
  inited: false,
};

function presentCategories() {
  const set = new Set(state.markers.map((m) => m.category));
  return Array.from(set).sort((a, b) => {
    const oa = a in CAT_ORDER ? CAT_ORDER[a] : 999;
    const ob = b in CAT_ORDER ? CAT_ORDER[b] : 999;
    return oa - ob || (a < b ? -1 : 1);
  });
}
function initEnabled() {
  const saved = lsGet(LS.enabled, null);
  if (Array.isArray(saved)) state.enabled = new Set(saved);
  else state.enabled = new Set(presentCategories());
}
const saveEnabled = () => lsSet(LS.enabled, Array.from(state.enabled));
const saveFound = () => lsSet(LS.found, Array.from(state.found));
const saveDataset = () => lsSet(LS.dataset, state.markers);

function visibleMarkers() {
  const q = state.query.trim().toLowerCase();
  return state.markers.filter((m) => {
    if (!state.enabled.has(m.category)) return false;
    if (q) return m.name.toLowerCase().includes(q) || m.region.toLowerCase().includes(q);
    return true;
  });
}
function searchMatches(limit) {
  const q = state.query.trim().toLowerCase();
  if (!q) return [];
  const out = [];
  for (const m of state.markers) {
    if (m.name.toLowerCase().includes(q) || m.region.toLowerCase().includes(q)) {
      out.push(m);
      if (out.length >= (limit || 12)) break;
    }
  }
  return out;
}
const countTotal = (cat) => state.markers.reduce((n, m) => n + (m.category === cat ? 1 : 0), 0);
const countFound = (cat) => state.markers.reduce((n, m) => n + (m.category === cat && state.found.has(m.id) ? 1 : 0), 0);
const totalFound = () => state.markers.reduce((n, m) => n + (state.found.has(m.id) ? 1 : 0), 0);

/* ======================= DOM ======================= */
const $ = (id) => document.getElementById(id);
let canvas, ctx, dpr = 1;

/* ======================= Камера ======================= */
const baseScale = () => (state.cssW && state.cssH ? Math.min(state.cssW, state.cssH) / MAP_SIZE : 1);
function clampOffset(ox, oy, sc) {
  const k = baseScale() * sc;
  const content = MAP_SIZE * k;
  const w = state.cssW, h = state.cssH;
  return [
    Math.min(Math.max(ox, w * 0.15 - content), w * 0.85),
    Math.min(Math.max(oy, h * 0.15 - content), h * 0.85),
  ];
}
function centerCamera() {
  state.scale = 1;
  const content = MAP_SIZE * baseScale();
  state.offsetX = (state.cssW - content) / 2;
  state.offsetY = (state.cssH - content) / 2;
  scheduleDraw();
}
function focusOn(marker) {
  const target = Math.max(state.scale, 3);
  const k = baseScale() * target;
  state.scale = target;
  const ox = state.cssW / 2 - marker.x * k;
  const oy = state.cssH / 2 - marker.y * k;
  [state.offsetX, state.offsetY] = clampOffset(ox, oy, target);
  scheduleDraw();
}
function zoomAbout(px, py, factor) {
  const newScale = Math.min(Math.max(state.scale * factor, MIN_SCALE), MAX_SCALE);
  const k = baseScale() * state.scale;
  const worldX = (px - state.offsetX) / k;
  const worldY = (py - state.offsetY) / k;
  const nk = baseScale() * newScale;
  state.scale = newScale;
  [state.offsetX, state.offsetY] = clampOffset(px - worldX * nk, py - worldY * nk, newScale);
  scheduleDraw();
}

/* ======================= Отрисовка ======================= */
let drawQueued = false;
function scheduleDraw() {
  if (drawQueued) return;
  drawQueued = true;
  requestAnimationFrame(() => { drawQueued = false; draw(); });
}

function resizeCanvas() {
  const wrap = $('mapWrap');
  const w = wrap.clientWidth, h = wrap.clientHeight;
  if (!w || !h) return;
  state.cssW = w; state.cssH = h;
  dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  if (!state.inited) { centerCamera(); state.inited = true; }
  else { [state.offsetX, state.offsetY] = clampOffset(state.offsetX, state.offsetY, state.scale); }
  scheduleDraw();
}

function draw() {
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = state.cssW, h = state.cssH;
  const k = baseScale() * state.scale;
  const ox = state.offsetX, oy = state.offsetY;
  const side = MAP_SIZE * k;

  // вода
  ctx.fillStyle = '#0B1620';
  ctx.fillRect(0, 0, w, h);
  ctx.textBaseline = 'middle';

  if (state.mapImage) {
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(state.mapImage, ox, oy, side, side);
  } else {
    drawSchematic(ox, oy, k, side);
  }

  // метки
  const dotR = 5.5;
  const showLabels = state.scale >= 1.6;
  for (const m of visibleMarkers()) {
    const sx = ox + m.x * k, sy = oy + m.y * k;
    if (sx < -60 || sy < -60 || sx > w + 60 || sy > h + 120) continue;
    drawMarker(sx, sy, colorOf(m.category), dotR, state.found.has(m.id),
      showLabels && LABEL_CATEGORIES.has(m.category) ? m.name : null);
  }

  // компас (фиксирован на экране)
  ctx.fillStyle = 'rgba(199,214,226,0.6)';
  ctx.font = '700 14px ' + FONT;
  ctx.textAlign = 'right';
  ctx.fillText('С ↑', w - 16, 22);
  ctx.textAlign = 'left';
}

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

function drawSchematic(ox, oy, k, side) {
  // суша
  ctx.fillStyle = '#18222B';
  ctx.fillRect(ox, oy, side, side);
  // сетка
  ctx.strokeStyle = 'rgba(168,194,212,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= 10; i++) {
    const gx = ox + i * 100 * k;
    ctx.moveTo(gx, oy); ctx.lineTo(gx, oy + side);
    const gy = oy + i * 100 * k;
    ctx.moveTo(ox, gy); ctx.lineTo(ox + side, gy);
  }
  ctx.stroke();
  // рамка
  ctx.strokeStyle = 'rgba(168,194,212,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(ox, oy, side, side);
  // подписи регионов
  const fontPx = Math.min(Math.max(13 * state.scale, 9), 22);
  ctx.fillStyle = 'rgba(199,214,226,0.4)';
  ctx.font = '600 ' + fontPx + 'px ' + FONT;
  ctx.textAlign = 'center';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '1px';
  for (const [name, rx, ry] of REGIONS) {
    ctx.fillText(name, ox + rx * k, oy + ry * k);
  }
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  ctx.textAlign = 'left';
}

function drawMarker(cx, cy, color, r, found, label) {
  ctx.globalAlpha = found ? 0.32 : 1;
  // тень
  ctx.beginPath(); ctx.arc(cx, cy, r + 1.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fill();
  // заливка
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = color; ctx.fill();
  // белое кольцо
  ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.stroke();
  ctx.globalAlpha = 1;

  if (found) {
    const s = r * 0.85;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.5, cy);
    ctx.lineTo(cx - s * 0.1, cy + s * 0.45);
    ctx.lineTo(cx + s * 0.55, cy - s * 0.4);
    ctx.stroke();
  }

  if (label) {
    ctx.font = '500 11px ' + FONT;
    const tw = ctx.measureText(label).width;
    const lx = cx + r + 5, ly = cy;
    ctx.fillStyle = 'rgba(16,24,32,0.78)';
    ctx.fillRect(lx - 4, ly - 9, tw + 8, 18);
    ctx.fillStyle = '#E6EDF3';
    ctx.fillText(label, lx, ly);
  }
}

/* ======================= Жесты ======================= */
const pointers = new Map();
let lastTap = { t: 0, x: 0, y: 0 };
let pinch = null; // {dist, cx, cy}
let tapCandidate = null; // {x,y,t}

function localPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onPointerDown(e) {
  canvas.setPointerCapture(e.pointerId);
  const p = localPos(e);
  pointers.set(e.pointerId, p);
  if (pointers.size === 1) {
    tapCandidate = { x: p.x, y: p.y, t: performance.now() };
    pinch = null;
  } else if (pointers.size === 2) {
    tapCandidate = null;
    const pts = Array.from(pointers.values());
    pinch = {
      dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
      cx: (pts[0].x + pts[1].x) / 2,
      cy: (pts[0].y + pts[1].y) / 2,
    };
  }
}

function onPointerMove(e) {
  if (!pointers.has(e.pointerId)) return;
  const prev = pointers.get(e.pointerId);
  const p = localPos(e);
  pointers.set(e.pointerId, p);

  if (pointers.size === 1) {
    state.offsetX += p.x - prev.x;
    state.offsetY += p.y - prev.y;
    [state.offsetX, state.offsetY] = clampOffset(state.offsetX, state.offsetY, state.scale);
    if (tapCandidate && Math.hypot(p.x - tapCandidate.x, p.y - tapCandidate.y) > 6) tapCandidate = null;
    scheduleDraw();
  } else if (pointers.size === 2 && pinch) {
    const pts = Array.from(pointers.values());
    const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    const cx = (pts[0].x + pts[1].x) / 2;
    const cy = (pts[0].y + pts[1].y) / 2;
    const factor = dist / (pinch.dist || dist);
    // зум относительно центроида
    zoomAbout(cx, cy, factor);
    // плюс панорама за смещением центроида
    state.offsetX += cx - pinch.cx;
    state.offsetY += cy - pinch.cy;
    [state.offsetX, state.offsetY] = clampOffset(state.offsetX, state.offsetY, state.scale);
    pinch = { dist, cx, cy };
    scheduleDraw();
  }
}

function onPointerUp(e) {
  const p = pointers.get(e.pointerId);
  pointers.delete(e.pointerId);
  if (pointers.size < 2) pinch = null;
  try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}

  if (tapCandidate && p) {
    const dt = performance.now() - tapCandidate.t;
    const moved = Math.hypot(p.x - tapCandidate.x, p.y - tapCandidate.y);
    if (dt < 350 && moved < 6) {
      const now = performance.now();
      if (now - lastTap.t < 300 && Math.hypot(p.x - lastTap.x, p.y - lastTap.y) < 30) {
        // двойной тап → зум
        zoomAbout(p.x, p.y, 1.8);
        lastTap.t = 0;
      } else {
        lastTap = { t: now, x: p.x, y: p.y };
        handleTap(p.x, p.y);
      }
    }
    tapCandidate = null;
  }
}

function handleTap(px, py) {
  const k = baseScale() * state.scale;
  let best = null, bestDist = 22;
  for (const m of visibleMarkers()) {
    const sx = state.offsetX + m.x * k, sy = state.offsetY + m.y * k;
    const d = Math.hypot(sx - px, sy - py);
    if (d <= bestDist) { bestDist = d; best = m; }
  }
  if (best) openSheet(best);
}

function onWheel(e) {
  e.preventDefault();
  const p = localPos(e);
  const factor = Math.exp(-e.deltaY * 0.0015);
  zoomAbout(p.x, p.y, factor);
}

/* ======================= UI: чипы ======================= */
function renderChips() {
  const wrap = $('chips');
  wrap.innerHTML = '';
  for (const cat of presentCategories()) {
    const total = countTotal(cat);
    if (total === 0) continue;
    const found = countFound(cat);
    const on = state.enabled.has(cat);
    const chip = document.createElement('button');
    chip.className = 'chip' + (on ? ' on' : '');
    chip.innerHTML =
      '<span class="dot" style="background:' + colorOf(cat) + '"></span>' +
      '<span>' + escapeHtml(nameOf(cat)) + '</span>' +
      '<span class="cnt">' + found + '/' + total + '</span>';
    chip.addEventListener('click', () => {
      if (state.enabled.has(cat)) state.enabled.delete(cat);
      else state.enabled.add(cat);
      saveEnabled();
      renderChips();
      scheduleDraw();
    });
    wrap.appendChild(chip);
  }
}

/* ======================= UI: прогресс ======================= */
function renderProgress() {
  $('progress').textContent = 'Найдено: ' + totalFound() + ' / ' + state.markers.length;
}

/* ======================= UI: поиск ======================= */
function renderSearch() {
  const box = $('searchResults');
  const matches = searchMatches(12);
  if (matches.length === 0) { box.classList.remove('show'); box.innerHTML = ''; return; }
  box.innerHTML = '';
  for (const m of matches) {
    const row = document.createElement('div');
    row.className = 'sr-row';
    const sub = [nameOf(m.category), m.region].filter(Boolean).join(' · ');
    row.innerHTML =
      '<span class="dot" style="background:' + colorOf(m.category) + '"></span>' +
      '<div class="sr-text"><div class="sr-name">' + escapeHtml(m.name) + '</div>' +
      (sub ? '<div class="sr-sub">' + escapeHtml(sub) + '</div>' : '') + '</div>';
    row.addEventListener('click', () => {
      state.query = '';
      $('search').value = '';
      renderSearch();
      focusOn(m);
      openSheet(m);
    });
    box.appendChild(row);
  }
  box.classList.add('show');
}

/* ======================= UI: карточка метки ======================= */
function openSheet(m) {
  state.selected = m;
  $('sheetTitle').textContent = m.name;
  const meta = [nameOf(m.category), m.region].filter(Boolean).join(' · ');
  $('sheetMeta').innerHTML = '<span class="dot" style="background:' + colorOf(m.category) +
    '"></span><span>' + escapeHtml(meta) + '</span>';
  $('sheetDesc').textContent = m.description || '';
  $('sheetDesc').style.display = m.description ? 'block' : 'none';
  $('sheetCoords').textContent = 'Координаты: x=' + Math.round(m.x) + ', y=' + Math.round(m.y) + '  (0..1000)';
  updateFoundBtn();
  $('sheet').classList.add('show');
  $('sheetBackdrop').classList.add('show');
}
function closeSheet() {
  state.selected = null;
  $('sheet').classList.remove('show');
  $('sheetBackdrop').classList.remove('show');
}
function updateFoundBtn() {
  const m = state.selected; if (!m) return;
  $('foundBtn').textContent = state.found.has(m.id) ? 'Снять отметку' : 'Отметить найденным';
}

/* ======================= Своя карта ======================= */
async function setImageFromBlob(blob) {
  if (state.mapImageURL) { URL.revokeObjectURL(state.mapImageURL); state.mapImageURL = null; }
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => { state.mapImage = img; state.mapImageURL = url; updateMenu(); scheduleDraw(); };
  img.onerror = () => { URL.revokeObjectURL(url); toast('Не удалось открыть изображение'); };
  img.src = url;
}
async function removeImage() {
  try { await idbDel('mapImage'); } catch (e) {}
  if (state.mapImageURL) { URL.revokeObjectURL(state.mapImageURL); state.mapImageURL = null; }
  state.mapImage = null;
  updateMenu();
  scheduleDraw();
  toast('Своя карта убрана');
}

/* ======================= Импорт / экспорт ======================= */
async function importJson(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : (data && data.markers);
    if (!Array.isArray(arr)) throw new Error('нет массива markers');
    const cleaned = arr.map(sanitizeMarker).filter(Boolean);
    if (cleaned.length === 0) throw new Error('пустой или некорректный набор');
    state.markers = cleaned;
    saveDataset();
    const ids = new Set(cleaned.map((m) => m.id));
    state.found = new Set(Array.from(state.found).filter((id) => ids.has(id)));
    saveFound();
    state.enabled = new Set(presentCategories());
    saveEnabled();
    closeSheet();
    renderChips(); renderProgress(); scheduleDraw();
    toast('Импортировано меток: ' + cleaned.length);
  } catch (e) {
    toast('Ошибка импорта: ' + e.message);
  }
}
function exportJson() {
  const blob = new Blob([JSON.stringify({ markers: state.markers }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'hyrule_map.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Экспортировано меток: ' + state.markers.length);
}
function resetData() {
  lsDel(LS.dataset);
  state.markers = SEED.map(sanitizeMarker).filter(Boolean);
  saveDataset();
  state.enabled = new Set(presentCategories());
  saveEnabled();
  closeSheet();
  renderChips(); renderProgress(); scheduleDraw();
  toast('Сброшено к встроенному набору');
}

/* ======================= Меню ======================= */
function toggleMenu(force) {
  const m = $('menu');
  const show = force == null ? !m.classList.contains('show') : force;
  m.classList.toggle('show', show);
}
function updateMenu() {
  $('mi-remove-image').style.display = state.mapImage ? '' : 'none';
}

/* ======================= Тост ======================= */
let toastTimer = null;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ======================= Утиль ======================= */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/* ======================= Инициализация ======================= */
function wire() {
  canvas = $('map');
  ctx = canvas.getContext('2d');

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });

  // поиск
  const search = $('search');
  search.addEventListener('input', () => {
    state.query = search.value;
    $('searchClear').style.display = search.value ? '' : 'none';
    renderSearch();
    scheduleDraw();
  });
  $('searchClear').addEventListener('click', () => {
    search.value = ''; state.query = '';
    $('searchClear').style.display = 'none';
    renderSearch(); scheduleDraw();
  });

  // карточка метки
  $('foundBtn').addEventListener('click', () => {
    const m = state.selected; if (!m) return;
    if (state.found.has(m.id)) state.found.delete(m.id); else state.found.add(m.id);
    saveFound();
    updateFoundBtn(); renderChips(); renderProgress(); scheduleDraw();
  });
  $('centerBtn').addEventListener('click', () => {
    const m = state.selected; if (!m) return;
    focusOn(m); closeSheet();
  });
  $('sheetClose').addEventListener('click', closeSheet);
  $('sheetBackdrop').addEventListener('click', closeSheet);

  // меню
  $('menuBtn').addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
  document.addEventListener('click', () => toggleMenu(false));
  $('menu').addEventListener('click', (e) => e.stopPropagation());
  $('menu').querySelectorAll('[data-action]').forEach((item) => {
    item.addEventListener('click', () => {
      const a = item.getAttribute('data-action');
      toggleMenu(false);
      if (a === 'load-image') $('fileImage').click();
      else if (a === 'remove-image') removeImage();
      else if (a === 'import-json') $('fileJson').click();
      else if (a === 'export-json') exportJson();
      else if (a === 'enable-all') { state.enabled = new Set(presentCategories()); saveEnabled(); renderChips(); scheduleDraw(); }
      else if (a === 'disable-all') { state.enabled = new Set(); saveEnabled(); renderChips(); scheduleDraw(); }
      else if (a === 'recenter') centerCamera();
      else if (a === 'reset') resetData();
    });
  });

  // файловые инпуты
  $('fileImage').addEventListener('change', async (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!f) return;
    try { await idbSet('mapImage', f); } catch (err) {}
    setImageFromBlob(f);
    toast('Своя карта загружена');
  });
  $('fileJson').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (f) importJson(f);
  });

  // Esc закрывает оверлеи
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSheet(); toggleMenu(false); }
  });

  // ресайз
  const ro = new ResizeObserver(resizeCanvas);
  ro.observe($('mapWrap'));
  window.addEventListener('resize', resizeCanvas);
}

async function start() {
  initEnabled();
  wire();
  updateMenu();
  renderChips();
  renderProgress();
  resizeCanvas();

  // подгрузить ранее выбранную карту
  try {
    const blob = await idbGet('mapImage');
    if (blob) setImageFromBlob(blob);
  } catch (e) {}

  // регистрация service worker (офлайн)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

document.addEventListener('DOMContentLoaded', start);
