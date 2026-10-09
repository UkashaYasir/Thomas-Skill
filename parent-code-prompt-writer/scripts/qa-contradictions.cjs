#!/usr/bin/env node
// The Parent Code — contradiction scan (v25). The other checks look for the right words; this one fails a prompt whose own
// sentences disagree, because the image model then picks one of the two at random (audit 9 Oct: 314 prompts on v24.3 did).
//
//   node scripts/qa-contradictions.cjs build.jsx [--brief]
//
// Each rule names two things one prompt must never say together. Add a rule whenever a render shows the model following
// the wrong half of a prompt.
const fs = require("fs"), vm = require("vm");
const argv = process.argv.slice(2), file = argv.find(a => !a.startsWith("--"));
if (!file) { console.log("usage: node qa-contradictions.cjs build.jsx [--brief]"); process.exit(2); }
const BRIEF = argv.includes("--brief");
let src = fs.readFileSync(file, "utf8");
const marker = src.indexOf("/* ===== UI ===== */");
if (marker < 0) { console.log("FAIL  build has no UI marker"); process.exit(1); }
src = src.slice(0, marker).replace(/^\s*import[^\n]*\n/gm, "");
let M;
try { M = vm.runInNewContext(src + ";({PROMPTS,MOOD,MOOD_ALIAS,CLEAN_GROUND,INSERT_PROMPTS:(typeof INSERT_PROMPTS==='undefined'?[]:INSERT_PROMPTS),framePalette,hueOf:(typeof hueOf==='undefined'?null:hueOf)})", {}); }
catch (e) { console.log("FAIL  the build does not compile: " + e.message); process.exit(1); }
const moodOf = m => M.MOOD[m] ? m : (M.MOOD_ALIAS[m] || m);
const P = [...M.PROMPTS, ...M.INSERT_PROMPTS];
const hue = h => { const r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return -1; let x = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return (x * 60 + 360) % 360; };
const sat = h => { const v = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255), mx = Math.max(...v), mn = Math.min(...v); return mx ? (mx - mn) / mx : 0; };
const near = (a, b) => sat(a) >= 0.25 && sat(b) >= 0.25 && (d => Math.min(d, 360 - d))(Math.abs(hue(a) - hue(b))) < 30;
const section = (t, name) => { const m = String(t).match(new RegExp(name + ": (.*?)(?= [A-Z][A-Z ,'—-]{3,}: |$)")); return m ? m[1] : ""; };
const pureClean = String(M.CLEAN_GROUND || "").toUpperCase() === "#FFFFFF"; // a deliberate pure-white test strip

const RULES = [
  ["set pieces called black line with white fill on a colour stage or in absence", p => /every set piece is black line with white fill|Every other object and every set piece is black line/.test(p.prompt) && (["NIGHT", "PEAK"].includes(moodOf(p.mood)) || p.mute)],
  ["'plain white' space on a colour field", p => /(?:stays|is) plain white and open/.test(p.prompt) && ["NIGHT", "PEAK"].includes(moodOf(p.mood))],
  ["a coloured word against 'no other strong colour'", p => /no other strong colou?r anywhere/i.test(p.prompt) && p.onScreen && !p.onScreen.font && !/BLACK|WHITE|GREY/.test(String(p.onScreen.col || "BLACK").toUpperCase()) && !/apart from[^.]*the word/.test(p.prompt) && !/plain white \(#FFFFFF\)|charcoal black/.test(section(p.prompt, "TEXT"))],
  ["coloured marks against 'no other strong colour'", p => /MARKS: /.test(p.prompt) && /no other strong colou?r anywhere/i.test(p.prompt) && !/apart from[^.]*the marks/.test(p.prompt)],
  ["'nothing is bright' against a bright focus", p => /Nothing in this frame is bright/.test(p.prompt) && /BRIGHT/.test(p.prompt)],
  ["'nothing carries strong colour' against a focus or marks", p => /Nothing carries strong colou?r/.test(p.prompt) && /THE BRIGHT (COLOUR FOCUS|ACCENT)|THE ACCENT in this frame|THE FOCUS in this frame|MARKS: /.test(p.prompt)],
  ["'no readable words' against a word", p => /no readable words/.test(p.prompt) && /the only readable text/.test(p.prompt)],
  ["'no printed words' against a word", p => p.onScreen && /printed words/.test(p.prompt.split("AVOID:")[0]) && !/the only words are those named under TEXT/.test(p.prompt)],
  ["the CLEAN ground described as pure white", p => !pureClean && moodOf(p.mood) === "CLEAN" && /background is (plain )?pure white \(#FFFFFF\)|pure white \(#FFFFFF\), flat and even/.test(p.prompt)],
  ["a coloured set piece or floor plane", p => /filled flat in its own soft colou?r|plane from the ground line/.test(p.prompt) && !p.mute],
  ["'never a glow' against a drawn GLOW", p => /never a glow\b/.test(p.prompt) && /GLOW: /.test(p.prompt)],
  ["'coloured furniture' avoided on a stage whose pieces are coloured", p => (["NIGHT", "PEAK"].includes(moodOf(p.mood)) || p.mute) && /AVOID:.*coloured walls, floors, grass or furniture, a whole room in one colou?r tone/.test(p.prompt)],
  ["a focus coloured in the colour field's own hue (it would vanish)", p => { if (moodOf(p.mood) !== "PEAK") return false; const f = M.framePalette(p).ground[1], m = String(p.prompt.match(/THE BRIGHT (?:COLOUR FOCUS|ACCENT)[^.]*?\((#[0-9A-Fa-f]{6})\)/) || [])[1]; return !!m && near(m, f); }],
  ["a word lettered in the colour field's own hue", p => { if (moodOf(p.mood) !== "PEAK" || !p.onScreen) return false; const f = M.framePalette(p).ground[1], m = String(section(p.prompt, "TEXT").match(/\((#[0-9A-Fa-f]{6})\)/) || [])[1]; return !!m && near(m, f); }],
  ["white text on a light colour field", p => moodOf(p.mood) === "PEAK" && p.onScreen && /in plain white \(#FFFFFF\)/.test(section(p.prompt, "TEXT")) && /light|lemon|yellow/.test(M.framePalette(p).ground[0])],
];
const hits = RULES.map(([name, test]) => [name, P.filter(p => { try { return test(p); } catch (e) { return false; } }).map(p => p.ref)]);
console.log(`\nCONTRADICTION SCAN — ${P.length} prompts${M.INSERT_PROMPTS.length ? ` (${M.INSERT_PROMPTS.length} inserts)` : ""}\n`);
let fails = 0;
for (const [name, refs] of hits) {
  if (refs.length) { fails++; console.log(`  FAIL  ${name}: ${refs.slice(0, 30).join(" ")}${refs.length > 30 ? ` …(+${refs.length - 30})` : ""}`); }
  else if (!BRIEF) console.log(`  ok    no ${name}`);
}
console.log(`\n${fails ? fails + " CONTRADICTION CHECK(S) FAILED" : "ALL CONTRADICTION CHECKS PASSED"} · 0 warning(s)\n`);
process.exit(fails ? 1 : 0);
