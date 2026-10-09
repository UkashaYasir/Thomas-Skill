// Builds the CLEAN-ground test strip: the same chosen frames of the Seven Things v19 sample compiled on each prepared
// ground, in one page. Usage: node make-strip.cjs   (COMPILER=path/to/compiler-v19 if it is not found next to this folder)
const fs = require("fs"), vm = require("vm"), path = require("path"), { execSync } = require("child_process");
const ROOT = process.env.COMPILER ? path.resolve(process.env.COMPILER) : [path.resolve(__dirname, "../../compiler-v19"), path.resolve(__dirname, "../..")].find(d => fs.existsSync(path.join(d, "assemble.cjs")));
const DATA = path.relative(ROOT, path.resolve(__dirname, "../seven-things-v19")), OUT = path.join(__dirname, "out");
const GROUNDS = [["#F7F6F3", "very light warm neutral (the current default)"], ["#FFFFFF", "pure white"], ["#F4F2EE", "light warm stone"], ["#F2F4F5", "light cool grey"]];
const PICK = ["S1", "S22", "S23", "S9", "S28", "S30", "S43"]; // two-person wide with outline cues, a wide, a close after its wide, face + hands with a colour element, hands-only, a wide with a colour element, a medium two-shot
fs.mkdirSync(OUT, { recursive: true });
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
let sections = "";
for (const [hex, name] of GROUNDS) {
  const file = path.join(OUT, `strip-${hex.slice(1)}.jsx`);
  execSync(`node assemble.cjs ${JSON.stringify(path.relative(ROOT, file))} --data ${DATA}`, { cwd: ROOT, env: { ...process.env, CLEAN_GROUND: hex }, stdio: "pipe" });
  const src = fs.readFileSync(file, "utf8");
  const M = vm.runInNewContext(src.slice(0, src.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm, "") + ";({PROMPTS})", {});
  const frames = PICK.map(r => M.PROMPTS.find(b => b.ref === r)).filter(Boolean);
  if (!frames.every(b => b.prompt.includes(hex))) throw new Error("ground " + hex + " missing from a prompt");
  sections += `<section><h2><span class="sw" style="background:${hex}"></span>${hex} — ${esc(name)}</h2>` + frames.map(b =>
    `<div class="card"><div class="meta"><b>${b.ref}</b> · ${esc(b.shotSize)} · ${esc(b.script)}</div><textarea readonly>${esc(b.prompt)}</textarea><button onclick="navigator.clipboard.writeText(this.previousElementSibling.value);this.textContent='Copied'">Copy</button></div>`).join("") + `</section>`;
}
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ground Test Strip</title>
<style>:root{--bg:#fafafa;--fg:#1d1d1f;--card:#fff;--line:#d9d9de}@media (prefers-color-scheme:dark){:root{--bg:#141416;--fg:#ececf0;--card:#1e1e22;--line:#38383f}}
body{margin:0;padding:16px;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif;max-width:1100px;margin:auto}
h1{font-size:22px}h2{font-size:18px;display:flex;align-items:center;gap:8px;margin-top:28px}.sw{display:inline-block;width:28px;height:28px;border:1px solid #999;border-radius:6px}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px;margin:10px 0}.meta{font-size:13px;margin-bottom:6px}
textarea{width:100%;height:90px;box-sizing:border-box;font:12px/1.4 ui-monospace,monospace;background:transparent;color:var(--fg);border:1px solid var(--line);border-radius:6px}
button{margin-top:6px;padding:6px 14px;border-radius:6px;border:1px solid var(--line);background:var(--card);color:var(--fg);cursor:pointer}</style></head><body>
<h1>CLEAN ground test strip</h1>
<p>The same ${PICK.length} frames from the Seven Things v19 sample, compiled on each prepared ground (only the ground hex changes). Render each set in Flow with the MOM and SON references attached, put the results side by side, and compare: are the white characters seen first; do the soft-grey outline pieces read without competing; do white faces and hands stay clear of the ground; does the one colour element stand out? Thomas picks the ground; it then goes into <code>CLEAN_GROUND</code> in the compiler.</p>
${sections}</body></html>`;
fs.writeFileSync(path.join(OUT, "ground-strip.html"), html);
console.log("ground strip:", path.join(OUT, "ground-strip.html"), GROUNDS.length, "grounds ×", PICK.length, "frames");
