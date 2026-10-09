// Colour contrast and keyword checks (v17, rewritten for compiler v19).
// Usage: node scripts/qa-colour-v17.cjs <build.jsx> [runtimeSec]
// v19 (Thomas, 5 Oct 2026): white or very light neutral is the default and one element carries the colour, so the old
// shares (white ≥ 35%, full colour ≤ 30%), the "long stretch on one kind of background" warning, the "two strong objects"
// cap and the 20-second keyword spacing are gone — the background mix and keyword spacing are printed as information.
// Kept as rules: the colour element stands apart from its background; every keyword lands on a word of its own line.
// The idea-word and background rules are in scripts/qa-v19.cjs.
const fs = require("fs"), vm = require("vm");
let s = fs.readFileSync(process.argv[2], "utf8"); s = s.slice(0, s.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "");
const M = vm.runInNewContext(s + ";({RAW_BEATS,PROMPTS,PROP,MOOD,SCRIPT,PROJECT,framePalette,hexToLab,MOOD_ALIAS:(typeof MOOD_ALIAS==='undefined'?{}:MOOD_ALIAS)})", {});
const B = M.RAW_BEATS.filter(b => !b.editOnly), N = B.length, RT = Number(process.argv[3] || (M.PROJECT && M.PROJECT.runtimeSec) || 510);
let fails = 0, warns = 0; const ok = m => console.log("  ok    " + m), fail = m => { fails++; console.log("  FAIL  " + m); }, warn = m => { warns++; console.log("  WARN  " + m); }, info = m => console.log("  info  " + m);
const lab = h => M.hexToLab(h), chroma = h => { const [, a, b] = lab(h); return Math.hypot(a, b); }, hue = h => { const [, a, b] = lab(h); return (Math.atan2(b, a) * 180 / Math.PI + 360) % 360; };
const dE = (x, y) => { const p = lab(x), q = lab(y); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
const moodOf = m => M.MOOD[m] ? m : (M.MOOD_ALIAS[m] || m);
const keyOf = p => String(p).replace(/^\d+x\s+/i, "").trim();
const ceKey = b => { const ce = String((b.plan && b.plan.ce) || "").trim(); if (/^none$/i.test(ce)) return null; if (ce) return (ce.match(/^[A-Z0-9_]+/) || [ce])[0]; if (M.PROP[b.hero]) return b.hero; return (b.props || []).map(keyOf).find(k => M.PROP[k] && !(b.plain || []).includes(k)) || null; };
console.log(`\nCOLOUR CONTRAST AND KEYWORD QA (v19) — ${N} frames\n`);
// 1. the background mix (information only)
const T = {}; B.forEach(b => { const k = moodOf(b.mood); T[k] = (T[k] || 0) + 1; });
info("backgrounds: " + Object.entries(T).map(([k, v]) => `${k} ${v}`).join(", ") + " — information only (v19: CLEAN is the default; full colour only for peaks and night)");
// 2. contrast: the one colour element stands apart from the background it sits on (no brown objects on brown)
const clash = []; B.forEach(b => { const k = ceKey(b); if (!k || !M.PROP[k]) return; if (/THE FOCUS in this frame is [^.]*drawn white/.test((M.PROMPTS.find(x => x.ref === b.ref) || {}).prompt || "")) return; /* v25: drawn white on its colour stage */ const h = M.PROP[k].hex; if (chroma(h) <= 15) return; const g = M.framePalette(b).ground[1]; const sameFam = chroma(g) > 12 && Math.abs(((hue(h) - hue(g) + 540) % 360) - 180) < 25; if (dE(h, g) < 22 || sameFam) clash.push(`${b.ref}(${k} ${h} on ${g})`); });
clash.length ? fail("colour elements too close in colour to their background — change the object's colour or the frame's background: " + clash.join(" ")) : ok("every colour element stands clearly apart from its background");
// 3. keywords: on a word of their own line
const words = M.SCRIPT.map(x => String(x).split(/\s+/).filter(Boolean).length), spw = RT / Math.max(1, words.reduce((a, c) => a + c, 0)), tAt = n => words.slice(0, n - 1).reduce((a, c) => a + c, 0) * spw;
const K = B.filter(b => b.keyword);
if (!K.length) info("no on-screen keywords planned — Thomas: a few strong words at the strong moments, not constantly");
else {
  const notInLine = K.filter(b => !new RegExp("\\b" + String(b.keyword.on).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(M.SCRIPT[b.n - 1])).map(b => b.ref);
  info(`${K.length} keywords: ${K.map(b => `${b.ref} ${b.keyword.word} (${Math.floor(tAt(b.n) / 60)}:${String(Math.floor(tAt(b.n) % 60)).padStart(2, "0")})`).join(" · ")} — chosen by the moments, no count or spacing target`);
  notInLine.length ? fail("keyword cue word not in its line: " + notInLine.join(" ")) : ok("every keyword lands on a word of its own line");
}
console.log(`\n${fails ? fails + " CHECK(S) FAILED" : "ALL COLOUR AND KEYWORD CHECKS PASSED"} · ${warns} warning(s)\n`); process.exitCode = fails ? 1 : 0;
