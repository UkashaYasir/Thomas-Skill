// Generic driver. Usage: node transform.cjs <input build.jsx> <output build.jsx> <parts folder>
// Loads the part files from the folder in this order: assets, seg00..seg15, final (any that exist), applies them to the
// input build's data, rebuilds SKETCH / RAW_BEATS / EDIT_CUES (and REVISIONS if a part sets api.revisionEntry), writes the output build.
// Revision 11 ("Thomas's 10-point brief") was made with:  node transform.cjs build-v12.jsx out.jsx r11
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const IN = path.resolve(process.argv[2] || ""), OUT = path.resolve(process.argv[3] || ""), PARTS = path.resolve(process.argv[4] || "");
if (!process.argv[4] || !fs.existsSync(IN) || !fs.existsSync(PARTS)) { console.error("usage: node transform.cjs <input build.jsx> <output build.jsx> <parts folder>"); process.exit(1); }
let src = fs.readFileSync(IN, "utf8");
const TMPDATA = OUT + ".in-data.js"; execSync(`sh "${__dirname}/extract.sh" "${IN}" "${TMPDATA}"`);
const d = require(TMPDATA);
const B = JSON.parse(JSON.stringify(d.RAW_BEATS)), E = JSON.parse(JSON.stringify(d.EDIT_CUES)), SCRIPT = d.SCRIPT;
const J = v => JSON.stringify(v);
const by = r => { const b = B.find(x => x.ref === r); if (!b) throw new Error("no beat " + r); return b; };
const changed = new Set();
const srep = (a, b) => { if (!src.includes(a)) throw new Error("missing src: " + a.slice(0, 90)); src = src.replace(a, b); };
function lineIdx(start) { const lines = src.split("\n"); const i = lines.findIndex(l => l.startsWith(start)); if (i < 0) throw new Error("no line " + start); return [lines, i]; }
function blockRange(name) { const lines = src.split("\n"); const s = lines.findIndex(l => l.startsWith(`const ${name} = `)); if (s < 0) throw new Error("block " + name); let e = s + 1; while (!/^[\]}];\s*$/.test(lines[e])) e++; return [s, e]; }
function replaceBlock(name, text) { const lines = src.split("\n"); const [s, e] = blockRange(name); lines.splice(s, e - s + 1, text); src = lines.join("\n"); }
const ORDER = ["n","ref","sequence","scene","tier","fn","roles","props","hero","feel","meaning","shotSize","angle","face","scale","framing","action","performance","world","mood","peak","stage","moment","pop","move","device","reveal","link","requiredText"];
function serBeat(b) {
  const L = [`    n: ${b.n}, ref: ${J(b.ref)},`, `    sequence: ${J(b.sequence)}, scene: ${J(b.scene)}, tier: ${J(b.tier)}, fn: ${J(b.fn)},`, `    roles: ${J(b.roles)}, props: ${J(b.props)}, hero: ${J(b.hero)},`,
    `    feel: ${J(b.feel)},`, `    meaning: ${J(b.meaning)},`, `    shotSize: ${J(b.shotSize)}, angle: ${J(b.angle)}, face: ${J(b.face)}, scale: ${J(b.scale)},`,
    `    framing: ${J(b.framing)},`, `    action: ${J(b.action)},`, `    performance: ${J(b.performance)},`, `    world: ${J(b.world)}, mood: ${J(b.mood)}, peak: ${J(b.peak)},`,
    `    stage: ${J(b.stage)},`, `    moment: ${J(b.moment)},`, `    pop: ${J(b.pop)},`, `    move: ${J(b.move)},`, `    device: ${J(b.device)},`, `    reveal: ${J(b.reveal)},`, `    link: ${J(b.link)},`, `    requiredText: ${J(b.requiredText)},`];
  Object.keys(b).filter(k => !ORDER.includes(k)).forEach(k => L.push(`    ${k}: ${J(b[k])},`));
  return "  {\n" + L.join("\n") + "\n  },";
}
// ── api given to the part files ──
const log = { props: [], worlds: [], frames: new Set(), edits: new Set(), gags: new Set(), revealsDropped: [] };
function rw(ref, f) {
  const b = by(ref);
  for (const [k, v] of Object.entries(f)) {
    if (k === "edit") { ed(ref, v[0], v[1]); continue; }
    if (k === "noedit") { const i = E.findIndex(x => x.ref === ref); if (i >= 0) E.splice(i, 1); continue; }
    if (k === "mv") { b.move = { type: v[0], on: v[1] || "", note: v[2] }; continue; }
    if (k === "roles" && Array.isArray(v)) { b.roles = v.join(", "); continue; }
    if (k === "reveal" && v === null && b.reveal) log.revealsDropped.push(ref);
    b[k] = v;
  }
  if (f.gag) log.gags.add(ref);
  changed.add(ref); log.frames.add(ref);
}
function ed(ref, on, change) {
  const i = E.findIndex(x => x.ref === ref); const e = { ref, on, change };
  if (i >= 0) E[i] = e; else { E.push(e); E.sort((a, b) => Number(a.ref.slice(1)) - Number(b.ref.slice(1))); }
  log.edits.add(ref); changed.add(ref);
}
function mv(ref, type, on, note) { by(ref).move = { type, on: on || "", note }; changed.add(ref); }
function setProp(key, o) {
  const [lines, i] = lineIdx(`  "${key}": {`);
  const cur = d.PROP[key]; if (!cur) throw new Error("no prop " + key);
  const n = { ...cur, ...o };
  lines[i] = `  ${J(key)}: { name: ${J(n.name)}, hex: ${J(n.hex)}, colour: ${J(n.colour)}, danger: ${n.danger}, nouns: ${J(n.nouns)}, text: ${J(n.text)} },`;
  src = lines.join("\n"); log.props.push(key);
}
function addProp(key, o) {
  const n = { danger: false, ...o };
  srep(`\n};\n\n// OVERLAY:`, `\n  ${J(key)}: { name: ${J(n.name)}, hex: ${J(n.hex)}, colour: ${J(n.colour)}, danger: ${n.danger}, nouns: ${J(n.nouns)}, text: ${J(n.text)} },\n};\n\n// OVERLAY:`);
  log.props.push(key + " (new)");
}
function delProp(key) {
  const [lines, i] = lineIdx(`  "${key}": {`); lines.splice(i, 1); src = lines.join("\n"); log.props.push(key + " (removed)");
}
function recam(ref, angle, shotSize, framing, extra) { rw(ref, { angle, shotSize, framing, ...(extra || {}) }); }
function setDress(key, text) {
  const [lines, i] = lineIdx(`  "${key}": {`);
  if (!/ \},\s*$/.test(lines[i])) throw new Error("world line shape " + key);
  lines[i] = lines[i].replace(/ \},\s*$/, `, dress: ${J(text)} },`); src = lines.join("\n"); log.worlds.push(key);
}
const api = { B, E, SCRIPT, by, rw, ed, mv, setProp, addProp, delProp, recam, setDress, srep, replaceBlock, J, changed, log, d, getSrc: () => src };

for (const part of ["assets", "seg00", "seg01", "seg02", "seg03", "seg04", "seg05", "seg06", "seg07", "seg08", "seg09", "seg10", "seg11", "seg12", "seg13", "seg14", "seg15", "final"]) {
  const f = path.join(PARTS, part + ".cjs");
  if (fs.existsSync(f)) { delete require.cache[require.resolve(f)]; require(f)(api); }
}

// ── rebuild SKETCH lines from the beats (same format as before) ──
const lc = s => s ? s.charAt(0).toLowerCase() + s.slice(1).replace(/\.$/, "") : "";
const sketch = b => {
  const e = E.find(x => x.ref === b.ref);
  const old = d.SKETCH[b.n - 1].split(" | "); // keep the scene label exactly
  return [b.ref, b.sequence, `${b.scene} [${b.world} · ${b.roles}]`, b.tier, `${b.shotSize}/${b.angle}/${b.face}/${b.scale}`, b.mood, `hero ${b.hero}`, b.stage,
    `feel: ${lc(b.feel)}`, `idea: ${b.meaning}`, `moment: ${b.moment || "—"}`, `pop: ${b.pop ? `${b.pop.what} ${b.pop.type} '${b.pop.on}'` : "—"}`, `move: ${b.move.type}`, `device: ${b.device}`,
    `edit: ${e ? `'${e.on}' ${e.change.split(". ")[0]}` : "—"}`].join(" | ");
};
replaceBlock("SKETCH", "const SKETCH = [\n" + B.map(b => "  " + J(sketch(b)) + ",").join("\n") + "\n];");
replaceBlock("RAW_BEATS", "const RAW_BEATS = [\n" + B.map(serBeat).join("\n") + "\n];");
replaceBlock("EDIT_CUES", "const EDIT_CUES = [\n" + E.map(e => `  { ref: ${J(e.ref)}, on: ${J(e.on)}, change: ${J(e.change)} },`).join("\n") + "\n];");
if (api.revisionEntry) { const REVS = d.REVISIONS.concat([api.revisionEntry]); replaceBlock("REVISIONS", "const REVISIONS = [\n" + REVS.map(r => "  " + JSON.stringify(r).replace(/"(\w+)":/g, "$1: ") + ",").join("\n") + "\n];"); }
fs.writeFileSync(OUT, src);
fs.unlinkSync(TMPDATA);
console.log(`${path.basename(OUT)} written — ${log.frames.size} frames touched, ${E.length} edits, ${log.props.length} props, ${log.worlds.length} worlds dressed, ${log.gags.size} gags, reveals dropped: ${log.revealsDropped.length}`);
