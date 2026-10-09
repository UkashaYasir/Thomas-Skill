#!/usr/bin/env node
// Runs every check on a v19 build and prints one verdict line per script.
//   node scripts/qa-all.cjs build.jsx [--partial] [--full]
// --partial is passed to qa.cjs (batch turns). --full prints every ok/info line; by default only WARN and FAIL lines show.
const { spawnSync } = require("child_process"), path = require("path");
const argv = process.argv.slice(2), file = argv.find(a => !a.startsWith("--"));
if (!file) { console.log("usage: node qa-all.cjs build.jsx [--partial] [--full]"); process.exit(2); }
const FULL = argv.includes("--full");
const RUNS = [
  ["qa.cjs", argv.includes("--partial") ? ["--partial"] : []],
  ["qa-v19.cjs", []],
  ["qa-render-risk.cjs", []],
  ["qa-consistency.cjs", []],
  ["qa-colour-v17.cjs", []],
  ["qa-sequences-colour.cjs", []],
];
let bad = 0;
const summary = [];
for (const [script, extra] of RUNS) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), file, ...extra], { encoding: "utf8" });
  const out = (r.stdout || "") + (r.stderr || "");
  const lines = out.split("\n");
  const shown = FULL ? lines : lines.filter(l => /^\s*(FAIL|WARN)\b/.test(l));
  console.log(`\n── ${script} ──`);
  if (shown.length) console.log(shown.join("\n"));
  const verdict = lines.filter(l => /(PASSED|FAILED)/.test(l)).pop() || (r.status ? "FAILED (exit " + r.status + ")" : "done");
  summary.push(`${r.status ? "FAIL" : "ok  "}  ${script.padEnd(26)} ${verdict.trim()}`);
  if (r.status) bad++;
}
console.log("\n══ SUMMARY ══\n" + summary.join("\n") + `\n\n${bad ? bad + " SCRIPT(S) FAILED" : "EVERY CHECK PASSED"} — ${file}\n`);
process.exit(bad ? 1 : 0);
