#!/usr/bin/env node
// Maps Thomas's timestamp notes (Frame.io: "00:30–00:40", "02:10", "07:20-07:30") to the frames they cover.
//   node scripts/timestamp-map.cjs build.jsx "00:30-00:40" ["02:10" …]
//   node scripts/timestamp-map.cjs build.jsx --list            (every frame with its estimated start time)
//   … --anchor S140=04:42 --anchor S216=07:20                    (real start times read off the Premiere timeline)
// Times are estimated from the voice-over length (PROJECT.runtimeSec) spread over the script's words, so each frame starts
// where its line starts. A note is mapped to every frame it overlaps, plus one frame either side as context. The estimate
// drifts on long pauses and music beats (on Video 08 the 02:10–03:10 notes sat about 80 s earlier than the estimate): give a
// few anchors from the timeline and the times between them are re-spaced; still say plainly where a mapping is uncertain.
const fs = require("fs"), vm = require("vm");
const raw = process.argv.slice(2), anchors = [], argv = [];
for (let i = 0; i < raw.length; i++) { if (raw[i] === "--anchor") { const m = String(raw[++i] || "").match(/^(S\d+[a-z]?)=(\d+:\d{2})$/); if (!m) { console.log("bad --anchor (use S140=04:42)"); process.exit(2); } anchors.push(m.slice(1)); } else argv.push(raw[i]); }
const file = argv[0];
if (!file || argv.length < 2) { console.log('usage: node timestamp-map.cjs build.jsx "00:30-00:40" ["02:10" …] | --list'); process.exit(2); }
let src = fs.readFileSync(file, "utf8"); src = src.slice(0, src.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(src + ";({PROJECT,SCRIPT,RAW_BEATS})", {});
const words = t => String(t || "").split(/\s+/).filter(Boolean).length;
const total = M.SCRIPT.reduce((t, l) => t + words(l), 0), runtime = (M.PROJECT && M.PROJECT.runtimeSec) || 0;
if (!runtime) { console.log("FAIL  PROJECT.runtimeSec is not set — the map needs the voice-over length"); process.exit(1); }
const spw = runtime / total; let t = 0;
// every line is spoken, so every frame counts for the timing (an edit-only line is marked: its picture is an edit)
const F = [...M.RAW_BEATS].sort((x, y) => x.n - y.n).map(b => { const start = t; t += words(M.SCRIPT[b.n - 1]) * spw; return { ref: b.ref + (b.editOnly ? "*" : ""), n: b.n, start, end: t, line: M.SCRIPT[b.n - 1], seq: b.sequence }; });
// anchors: piecewise-linear re-timing between known frames (before the first and after the last: a plain shift)
if (anchors.length) {
  const A = anchors.map(([r, t]) => { const f = F.find(x => x.ref.replace("*", "") === r); if (!f) { console.log("unknown anchor frame " + r); process.exit(2); } const [m, s2] = t.split(":").map(Number); return { e: f.start, a: m * 60 + s2 }; }).sort((x, y) => x.e - y.e);
  const map = e => { if (e <= A[0].e) return e + (A[0].a - A[0].e); const L = A[A.length - 1]; if (e >= L.e) return e + (L.a - L.e); const i = A.findIndex((x, k) => A[k + 1] && e >= x.e && e < A[k + 1].e); const p = A[i], q = A[i + 1]; return p.a + (e - p.e) * (q.a - p.a) / (q.e - p.e); };
  F.forEach(f => { f.start = map(f.start); f.end = map(f.end); });
}
const mmss = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const sec = x => { const m = String(x).trim().match(/^(\d+):(\d{2})$/); if (!m) throw new Error("bad time " + x); return +m[1] * 60 + +m[2]; };
if (argv[1] === "--list") { F.forEach(f => console.log(`${mmss(f.start)}  ${f.ref.padEnd(5)} ${f.line}`)); process.exit(0); }
for (const note of argv.slice(1)) {
  const [a, b] = note.split(/\s*[–—-]\s*/), s0 = sec(a), s1 = b ? sec(b) + 0.99 : s0 + 9.99; // a single time covers its ten seconds
  const hit = F.filter(f => f.end > s0 && f.start < s1), i0 = F.indexOf(hit[0]), i1 = F.indexOf(hit[hit.length - 1]);
  console.log(`\n${note}  →  ${hit.map(f => f.ref).join(" ") || "nothing"}${hit.length ? `   (context: ${F[i0 - 1] ? F[i0 - 1].ref : "—"} before, ${F[i1 + 1] ? F[i1 + 1].ref : "—"} after)` : ""}`);
  hit.forEach(f => console.log(`  ${mmss(f.start)}  ${f.ref.padEnd(5)} ${f.line}`));
  if (hit.some(f => f.ref.endsWith("*"))) console.log("  (* an edit-only line: its picture is an edit on an earlier frame)");
}
