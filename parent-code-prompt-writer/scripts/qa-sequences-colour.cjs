// Sequence, placement-map and camera checks (Revision 12, updated for compiler v19).
// Usage: node scripts/qa-sequences-colour.cjs <build.jsx>
// v19: the colour-script share, the room-master requirement, the 3–5 image count, the HOLD share, the "most-used move"
// and "same move four running" limits and the key-line variety counts are gone (no creative quotas) — they print as information.
// Kept as rules: every frame names its placement and closing summary; held moments are told as sequences; every sequence
// image has its cue word, keep-clause, clean wording, the right cast and objects, and sits at most two edits from a base;
// edit-only frames; SEQ_PROMPTS in step; no mouth written as a quoted letter.
const fs = require("fs"), vm = require("vm");
let s = fs.readFileSync(process.argv[2], "utf8"); s = s.slice(0, s.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(s + ";({RAW_BEATS,EDIT_CUES,SEQUENCES,SEQ_PROMPTS,SCRIPT,PROP,ROLE,MOOD,WORLD,framePalette,hexToLab,PROMPTS,EDIT_PROMPTS,MOOD_ALIAS:(typeof MOOD_ALIAS==='undefined'?{}:MOOD_ALIAS),HELD_MOMENTS:(typeof HELD_MOMENTS==='undefined'?null:HELD_MOMENTS),KEY_LINES:(typeof KEY_LINES==='undefined'?null:KEY_LINES)})", {});
const moodOf = m => M.MOOD[m] ? m : (M.MOOD_ALIAS[m] || m);
const WORLD_SET = b => M.WORLD[b.world] && M.WORLD[b.world].set;
const { RAW_BEATS: B, EDIT_CUES: E, SEQUENCES: Q, SEQ_PROMPTS: SP, SCRIPT, PROP, MOOD } = M;
let fails = 0, warns = 0; const ok = m => console.log("  ok    " + m), fail = m => { fails++; console.log("  FAIL  " + m); }, warn = m => { warns++; console.log("  WARN  " + m); }, info = m => console.log("  info  " + m);
const N = B.length, pct = n => Math.round(100 * n / N) + "%";
console.log(`\nSEQUENCES, PLACEMENT AND CAMERA QA — ${N} frames\n`);
// 1. backgrounds by mood (information only) and the placement map on every frame
info("backgrounds by mood: " + Object.entries(B.reduce((a, b) => { const k = moodOf(b.mood); a[k] = (a[k] || 0) + 1; return a; }, {})).map(([k, v]) => `${k} ${v} (${pct(v)})`).join(", ") + " — information only");
const NEW = B.filter(b => b.picture);
const noMap = NEW.filter(b => b.shotSize !== "WORD" && (!b.map || !b.check)).map(b => b.ref);
noMap.length ? fail("frames without a placement map or a closing summary: " + noMap.join(" ")) : ok("every frame opens with THE PICTURE, names its placement left to right, and closes with THE PICTURE IN SHORT");
info(`white frames with no story object (face only): ${B.filter(b => moodOf(b.mood) === "WHITE" && !(b.props || []).length && b.shotSize !== "WORD").length} · word frames: ${B.filter(b => b.shotSize === "WORD").length}`);
// 3. sequences
const by = r => B.find(b => b.ref === r), line = r => SCRIPT[by(r).n - 1];
const HOLD25 = M.HELD_MOMENTS || []; // the video's own held moments, written by assemble.cjs from its sequences
const inSeq = new Set(Q.flatMap(s => s.images.map(i => i.ref)));
const missing = HOLD25.filter(r => !inSeq.has(r)); missing.length ? fail("held moments with no sequence: " + missing.join(" ")) : ok(`all ${HOLD25.length} held frames are told as sequences — ${Q.length} sequences`);
info("sequence lengths: " + (Q.map(s => `${s.id} ${s.images.length}`).join(" · ") || "none") + " — a short run of stills, as long as the moment needs");
const WORD = /\bfingers?\b|\b(thigh|hips?|waist|chest|crotch|buttocks?|pockets?|sleeves?|shirt|dress|trousers|collar)\b|['‘’][a-z]{1,3}['‘’]|\bglow|\bshadow|\bgradient/i;
const issues = [];
const cast = r => by(r).roles.toUpperCase();
const propNames = r => (by(r).props || []).map(p => String(p).replace(/^\d+x\s+/i, "").trim());
const allNames = Object.entries(PROP).map(([key, v]) => [key, v.name]).sort((a, b) => b[1].length - a[1].length);
const names = t => { let x = t; const out = []; for (const [key, n] of allNames) if (x.includes(n)) { out.push(key); x = x.split(n).join(""); } return out; };
const textOf = (s, im) => im.type === "step" ? im.change : im.type === "edit" ? (E.find(e => e.ref === im.ref) || {}).change : null;
const onOf = (im) => im.type === "step" ? im.on : im.type === "edit" ? (E.find(e => e.ref === im.ref) || {}).on : null;
const depth = (s, im) => { if (im.type === "base") return 0; const m = /image (\d+)/.exec(im.from || ""); if (!m) return 99; return 1 + depth(s, s.images[Number(m[1]) - 1]); };
for (const s of Q) for (const im of s.images) {
  const t = textOf(s, im), on = onOf(im);
  if (im.type !== "base") {
    if (!t) { issues.push(`${s.id} image ${im.i}: no edit text`); continue; }
    if (!new RegExp("\\b" + on.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(line(im.ref))) issues.push(`${s.id} image ${im.i}: cue '${on}' not in ${im.ref}'s line`);
    if (WORD.test(t)) issues.push(`${s.id} image ${im.i}: wording '${t.match(WORD)[0]}'`);
    if (!/stays? exactly as (they are|it is|she is|he is)/.test(t)) issues.push(`${s.id} image ${im.i}: no keep-clause`);
    const castNames = Object.keys(M.ROLE || {}).map(r => r.toUpperCase()).sort((a, b) => b.length - a.length); let t2 = t;
    castNames.forEach(r => { if (new RegExp("\\b" + r + "\\b").test(t2) && !cast(im.ref).split(",").map(x => x.trim()).includes(r)) issues.push(`${s.id} image ${im.i}: names ${r}, not in ${im.ref}`); t2 = t2.split(r).join(" "); });
    names(t).forEach(key => { if (!propNames(im.ref).includes(key)) issues.push(`${s.id} image ${im.i}: names ${key}, not in ${im.ref}`); });
    const dp = depth(s, im); if (dp > 2) issues.push(`${s.id} image ${im.i}: ${dp} edits away from a base image`);
  } else if (by(im.ref).editOnly) issues.push(`${s.id} image ${im.i}: ${im.ref} is edit-only but listed as a base`);
}
// images inside one line follow the words in order
for (const s of Q) { const byRef = {}; s.images.forEach(im => (byRef[im.ref] = byRef[im.ref] || []).push(im)); for (const [r, ims] of Object.entries(byRef)) { const pos = ims.filter(im => im.type !== "base").map(im => line(r).toLowerCase().search(new RegExp("\\b" + onOf(im).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b"))); for (let i = 1; i < pos.length; i++) if (!by(r).editOnly && pos[i] < pos[i - 1]) issues.push(`${s.id}: images on ${r} are out of word order`); } }
issues.length ? fail("sequence images: " + issues.join(" | ")) : ok(`every sequence image has its cue word in the line, a keep-clause, no finger/anatomy/clothing/quoted-letter/glow wording, only characters and objects in that frame, and sits at most two edits from a generated base`);
const eo = B.filter(b => b.editOnly); const eoBad = eo.filter(b => !E.some(e => e.ref === b.ref) || b.reveal).map(b => b.ref);
eoBad.length ? fail("edit-only frames without an edit, or with a mask reveal: " + eoBad.join(" ")) : ok(eo.length ? `edit-only frames (${eo.map(b => b.ref).join(" ")}) each have their edit and no mask reveal` : "no edit-only frames");
(SP.length === Q.reduce((t, s) => t + s.images.filter(i => i.type === "step").length, 0)) ? ok(`${SP.length} extra sequence prompts compiled`) : fail("SEQ_PROMPTS out of step with SEQUENCES");
// 4. camera (information only — v19: no shares or run limits for moves)
const mc = {}; B.forEach(b => mc[b.move.type] = (mc[b.move.type] || 0) + 1);
info("camera moves: " + Object.entries(mc).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", "));
{ let run = 1, best = 1, at = ""; for (let i = 1; i < N; i++) { run = B[i].move.type === B[i - 1].move.type ? run + 1 : 1; if (run > best) { best = run; at = B[i].ref; } } info(`longest run of one camera move: ${best}${at ? " (ending at " + at + ")" : ""}`); }
// 5. key lines and quoted letters
const KL = (M.KEY_LINES || []).map(by).filter(Boolean);
info("key lines: " + (KL.map(b => `${b.ref} ${b.shotSize}/${b.angle}/${moodOf(b.mood)}/${b.move.type}`).join(" · ") || "none") + " — each composition is checked for repeats in qa-v19.cjs");
const q = [...M.PROMPTS.map(p => [p.ref, p.prompt]), ...M.EDIT_PROMPTS.map(p => [p.ref + "E", p.prompt]), ...SP.map(p => [p.seq + "-" + p.i, p.prompt])].filter(([, t]) => /\b(mouth|lips?)\b[^.]{0,40}['‘’][a-z]{1,3}['‘’]/i.test(t)).map(([r]) => r);
q.length ? fail("mouths written as quoted letters: " + q.join(" ")) : ok("no mouth is written as a quoted letter in any prompt, edit or sequence step");
console.log(`\n${fails ? fails + " CHECK(S) FAILED" : "ALL SEQUENCE, PLACEMENT AND CAMERA CHECKS PASSED"} · ${warns} warning(s)\n`);
process.exitCode = fails ? 1 : 0;
