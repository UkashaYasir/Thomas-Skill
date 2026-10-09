// Colour script v4 — Thomas, Oct 2026 contrast note: characters first. Plenty of white; a subtle soft colour directly behind the
// white characters; furniture quiet and tonal (same family as the wall, one step deeper); floors near-white; strong colour only on
// the story objects and the meaning moments (night, storm, peaks).
const { hex } = require("./lch.cjs");
const c = (name, L, C, h) => [name, hex(L, C, h)];
const toward = (h, t, k) => { let d = ((t - h + 540) % 360) - 180; return (h + d * k + 360) % 360; };
// place: soft tint hue/chroma and names
const PLACES = {
  KITCHEN: { label: "kitchen", h: 140, C: 8, n: "sage" },
  LIVING: { label: "living room", h: 15, C: 8, n: "blush" },
  HALL: { label: "front hall", h: 80, C: 8, n: "beige" },
  SONROOM: { label: "boy's bedroom", h: 250, C: 9, n: "blue" },
  LANDING: { label: "upstairs landing", h: 295, C: 7, n: "lilac grey" },
  OFFICE: { label: "office", h: 205, C: 6, n: "grey-aqua" },
};
const MOODS = { // the calm moods move only lightness, strength and (a little) temperature — never into peach
  base: { L: 89, k: 1, pre: "soft" },
  BRIGHT: { L: 92, k: 0.75, pre: "light" },
  WARM: { L: 89, k: 1.15, t: 85, max: 10, pre: "warm" },
  EVENING: { L: 84, k: 1.05, pre: "evening" },
  COOL: { L: 88, k: 1, t: 245, max: 14, pre: "cool" },
  DUSK: { L: 86, k: 1.15, pre: "dusk" },
};
const pull = (h, t, max) => { const d = ((t - h + 540) % 360) - 180; const s = Math.max(-max, Math.min(max, d)); const r = (h + s + 360) % 360; return (r > 30 && r < 74 && !(h > 30 && h < 74)) ? h : r; };
const SET = {};
for (const [k, p] of Object.entries(PLACES)) {
  const mk = m => { const h = m.t != null ? pull(p.h, m.t, m.max) : p.h, C = p.C * m.k;
    return { wall: c(`${m.pre} ${p.n}`, m.L, C, h), floor: c("near-white", 96, 2, h), furn: c(`quiet ${p.n}`, m.L - 11, C * 0.9, h) }; };
  const b = mk(MOODS.base); const moods = {}; for (const m of ["BRIGHT", "WARM", "EVENING", "COOL", "DUSK"]) moods[m] = mk(MOODS[m]);
  SET[k] = { label: p.label, wall: b.wall, floor: b.floor, furn: b.furn, ground: ["light stone", "#D2CDC4"], moods };
}
SET.SONDOOR = { ...SET.LANDING, label: "landing outside the boy's room" };
const ACCENT = { // ACCENT and white-space scenes: one subtle soft colour behind the characters, everything else white
  "00": c("soft grey-blue", 89, 7, 250), "01": c("soft mint", 90, 8, 170), "02": c("soft beige", 90, 8, 80), "03": c("soft lilac", 89, 8, 305),
  "04": c("soft sky", 89, 8, 240), "05": c("soft blush", 90, 8, 15), "06": c("soft aqua", 89, 7, 205), "07": c("soft pearl grey", 89, 4, 250), "08": c("soft rose", 90, 7, 350),
};
const tonal = (name, L, C, h) => c(name, L, C, h);
const EMO_FURN = { "00": tonal("soft sea teal", 55, 18, 206), "01": tonal("pale aqua", 90, 14, 188), "02": tonal("pale ochre", 86, 30, 86), "03": tonal("soft indigo", 55, 22, 280),
  "04": tonal("soft berry", 60, 38, 349), "05": tonal("pale spring mint", 92, 14, 150), "06": tonal("pale spring green", 86, 30, 136), "07": tonal("soft lilac", 79, 18, 300) };
module.exports = { SET, ACCENT, EMO_FURN };
if (require.main === module) { const { lch } = require("./lch.cjs"); const sh = (k, v) => { const [L, C, H] = lch(v[1]); console.log(`${k.padEnd(22)} ${v[1]} L${L.toFixed(0)} C${C.toFixed(0)} h${H.toFixed(0)}  ${v[0]}`); };
  for (const [k, s] of Object.entries(SET)) { if (k === "SONDOOR") continue; sh(k + " wall", s.wall); sh("   furn", s.furn); sh("   floor", s.floor); for (const [m, v] of Object.entries(s.moods)) sh("   " + m, v.wall); }
  for (const [k, v] of Object.entries(ACCENT)) sh("accent " + k, v); for (const [k, v] of Object.entries(EMO_FURN)) sh("emo furn " + k, v); }
