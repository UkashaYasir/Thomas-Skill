#!/usr/bin/env node
// The Parent Code — where is this build, and what comes next?
//
//   node scripts/progress.cjs build.jsx [--batch 30]
//
// Run at the start of every turn (and first thing in a new chat with an uploaded build).
// It reads only the saved file, so nothing has to be re-planned: it reports which stage the build
// is in, which lines are written, and where to continue (used only if a reply was cut off).

const fs = require("fs");
const vm = require("vm");

const argv = process.argv.slice(2);
const file = argv.find(a => !a.startsWith("--"));
const bi = argv.indexOf("--batch");
const BATCH = bi >= 0 ? Number(argv[bi + 1]) : 30;
if (!file) { console.log("usage: node progress.cjs build.jsx [--batch 30]"); process.exit(2); }

let src = fs.readFileSync(file, "utf8");
const marker = src.indexOf("/* ===== UI ===== */");
if (marker < 0) { console.log("No '/* ===== UI ===== */' marker — this file was not made from assets/build-template.jsx."); process.exit(1); }
src = src.slice(0, marker).replace(/^\s*import[^\n]*\n/gm, "");
let M;
try {
  M = vm.runInNewContext(src + "\n;({RAW_BEATS, SCRIPT:(typeof SCRIPT==='undefined'?[]:SCRIPT), SKETCH:(typeof SKETCH==='undefined'?[]:SKETCH), STORY:(typeof STORY==='undefined'?null:STORY), PLAN:(typeof PLAN==='undefined'?[]:PLAN), ROLE, WORLD, PROP})", {});
} catch (e) {
  console.log("The build does not compile: " + e.message);
  console.log("Fix the error above first (usually a typo in the last beats written), then run this again.");
  process.exit(1);
}
const { RAW_BEATS, SCRIPT, SKETCH, STORY, PLAN, ROLE, WORLD, PROP } = M;
const placeholder = x => /^<.*>$/.test(String(x || "").trim());
const scriptReady = SCRIPT.length > 0 && !SCRIPT.some(placeholder);
const storyReady = STORY && !placeholder(STORY.idea) && !placeholder(STORY.arc);
const sketchReady = SKETCH.length > 0 && !SKETCH.some(placeholder);
const total = scriptReady ? SCRIPT.length : SKETCH.length;
const written = RAW_BEATS.filter(b => !placeholder(b.meaning) && !/^<exact script line/.test(String(b.script || ""))).length;
const skRefs = SKETCH.map(l => String(l).split("|")[0].trim());

console.log(`\nPROGRESS — ${file}`);
console.log(`  script lines: ${scriptReady ? SCRIPT.length : "not saved yet"} · plan: ${storyReady ? `${PLAN.length} segments` : "not written yet"} · cast ${Object.keys(ROLE).length}, worlds ${Object.keys(WORLD).length}, props ${Object.keys(PROP).length}`);
console.log(`  sketch: ${sketchReady ? `${SKETCH.length} lines` : "not written yet"} · beats written: ${written}${total ? " of " + total : ""}`);

let stage;
if (!scriptReady || !storyReady) stage = "Step 2 — save SCRIPT, then write STORY / PLAN / MOTIFS and the dictionaries.";
else if (written < total) stage = `Step 3 — write the remaining beats segment by segment (next: line ${written + 1} of ${total}), then edits, inserts, QA and pages — all in this reply.`;
else stage = "Steps 4–6 — edits where the scene changes, inserts, full QA (node scripts/qa-all.cjs) until it passes, then build and publish the copy page and the edit page.";
console.log(`\n  CONTINUE WITH: ${stage}`);
if (scriptReady && written < total) {
  const PLANSEQ = (PLAN || []).map(p => p.sequence);
  console.log(`\n  Next script lines:`);
  SCRIPT.slice(written, Math.min(total, written + 12)).forEach((l, i) => console.log(`   S${written + i + 1}: ${l}`));
  if (PLANSEQ.length) console.log(`\n  Segments planned: ${PLANSEQ.join(" · ")}`);
}
if (written > 0) {
  const last = RAW_BEATS[written - 1];
  console.log(`\n  Last beat written: ${last.ref} (${last.sequence})`);
}
console.log(`\n  Then: ${written < total ? `node scripts/qa.cjs ${file} --partial` : `node scripts/qa-all.cjs ${file}`}` + "\n");
