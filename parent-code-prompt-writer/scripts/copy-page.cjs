// Copy page (compiler v19): one card per line — Copy button, attach list, camera and pop-in lines, sequence labels, edit-only
// lines (no base image), WORD frames (a white frame + the word in Premiere) and the frame's shot plan (feel, line type,
// colour element, interrupt; open "Plan" for idea, other ideas, interaction, distance, look, context, contrast).
// Usage: node scripts/copy-page.cjs <build.jsx> <out.html> "<Title>"   (ONLY=S1-S16 prints a range)
const [BUILD, OUT, TITLE] = [process.argv[2], process.argv[3], process.argv[4] || "Prompts"];
if (!BUILD || !OUT) { console.error("usage: node copy-page.cjs <build.jsx> <out.html> \"<Title>\""); process.exit(1); }
const fs=require("fs"),vm=require("vm");let s=fs.readFileSync(BUILD,"utf8");s=s.slice(0,s.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm,"");
const M=vm.runInNewContext(s+";({PROMPTS,MOOD,INSERT_PROMPTS,EDIT_PROMPTS,MOVE_TYPES,SEQUENCES:(typeof SEQUENCES==='undefined'?[]:SEQUENCES)})",{});
const attach0=p=>{const r=p.roles==="No characters"?[]:p.roles.split(",").map(x=>x.trim());const m=r.includes("Mom"),so=r.includes("Son");if(!r.length)return"No character images";const close=["CLOSE","XCLOSE","FACE_HANDS","REACTION"].includes(p.shotSize);const hands=p.shotSize==="HANDS";const who=[m&&"MOM",so&&"SON"].filter(Boolean).join(" + ")||"MOM or SON style";if(hands)return`${who} body reference`;let a=close?`${who} portrait + expressions`:`${who} body + turnaround + poses`;if(m&&so)a+=" + height sheet";return a;};
const attach=p=>{let a=attach0(p);if(p.master&&p.master===p.ref)a+=" · this is the room master: generate it first";else if(p.master)a+=" + the approved "+p.master+" image (room master)";return a;};
const RANGE=(process.env.ONLY||"").match(/^S(\d+)-S(\d+)$/);const inRange=r=>!RANGE||(+r.slice(1)>=+RANGE[1]&&+r.slice(1)<=+RANGE[2]);
const seqOf=r=>{const s=M.SEQUENCES.find(q=>q.images.some(im=>im.ref===r));if(!s)return null;const mine=s.images.filter(im=>im.ref===r).map(im=>im.i);return {id:s.id,t:s.title,a:mine[0],b:mine[mine.length-1],n:s.images.length,x:s.images.filter(im=>im.ref===r&&im.type==="step").length}};
const eoOf=p=>{if(!p.editOnly)return null;const s=M.SEQUENCES.find(q=>q.id===p.editOnly.seq);const im=s?s.images.find(x=>x.ref===p.ref):null;return {seq:p.editOnly.seq,from:p.editOnly.from,i:im?im.i:0,n:s?s.images.length:0}};
const PL=p=>{const x=p.plan||{};const f=(k,v)=>v&&String(v).trim()?[k,String(v)]:null;return {top:[f("Feel",x.ft),f("Line",x.ln),f("Colour",x.ce||(p.shotSize==="WORD"?"":"default")),f("Interrupt",x.ip),p.peak?["Peak","yes"]:null].filter(Boolean),more:[f("Idea",x.idea),f("Other ideas",(x.alt||[]).join(" · ")),f("Interaction",x.ia&&(x.ia+(x.dist?" ("+x.dist+")":""))),f("Look",x.look),f("Context",x.ctx),f("Contrast",x.cx)].filter(Boolean)};};
const mk=p=>({pl:PL(p),w:p.shotSize==="WORD"?{n:(p.props||[]).length}:null,kw:p.keyword||null,eo:eoOf(p),sq:seqOf(p.ref),r:p.ref,l:p.script,m:p.mood,c:M.MOOD[p.mood].field[1],a:attach(p),p:p.prompt,v:p.reveal?{on:p.reveal.on,e:(p.reveal.how||p.reveal.ps)}:null,z:null,mv:p.move?{l:((M.MOVE_TYPES&&M.MOVE_TYPES[p.move.type])||String(p.move.type).toLowerCase().replace(/_/g," ")).replace(/ on the word$/,""),on:p.move.on||"",n:p.move.note||""}:null,pp:p.pop?{w:String(p.pop.what),on:p.pop.on||"",m:p.pop.motion||""}:null,ins:!!/b$/.test(p.ref)});
const data=[];for(const p of M.PROMPTS.filter(x=>inRange(x.ref))){const d=mk(p);const pp=M.EDIT_PROMPTS.find(x=>x.ref===p.ref);if(pp)d.z={on:pp.on,p:pp.prompt};data.push(d);for(const ip of M.INSERT_PROMPTS.filter(x=>x.n===p.n))data.push(mk(ip));}
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITLE}: prompts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--paper:#FBFAF7;--ink:#161616;--soft:#5E5E5E;--rule:#161616;--teal:#00A6A0;--teal-ink:#fff;--card:#FFFFFF;--box:#F1F0EC;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--paper:#151719;--ink:#F2F1EC;--soft:#A7A9AB;--rule:#F2F1EC;--card:#1C1F22;--box:#24282C}}
:root[data-theme="dark"]{--paper:#151719;--ink:#F2F1EC;--soft:#A7A9AB;--rule:#F2F1EC;--card:#1C1F22;--box:#24282C}
*,*::before,*::after{box-sizing:inherit}
html{scroll-padding-top:calc(env(safe-area-inset-top,0px) + 132px)}
body{margin:0;background:var(--paper);color:var(--ink);font-family:"Atkinson Hyperlegible",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:16px;line-height:1.5}
header{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--paper);border-bottom:2.5px solid var(--rule);padding:14px 16px 12px}
.wrap{max-width:860px;margin:0 auto}
h1{font-size:1.35rem;line-height:1.2;margin:0 0 2px;font-weight:700}
.sub{margin:0 0 10px;color:var(--soft);font-size:.92rem}
.tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
input[type=search]{flex:1 1 220px;min-width:0;font:inherit;padding:9px 12px;border:2px solid var(--rule);border-radius:999px;background:var(--card);color:var(--ink)}
.chip{font:inherit;font-size:.9rem;padding:8px 14px;border:2px solid var(--rule);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer}
.chip[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.count{font-size:.9rem;color:var(--soft);margin-left:auto;font-variant-numeric:tabular-nums}
main{padding:6px 16px 60px}
.frame{border-bottom:1.5px solid var(--rule);padding:16px 0}
.row{display:grid;grid-template-columns:58px 1fr auto;gap:12px;align-items:start}
.ref{font-weight:700;font-size:1.05rem;font-variant-numeric:tabular-nums;display:flex;align-items:center;gap:7px}
.dot{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--rule);flex:none}
.line{margin:0;font-size:1.02rem}
.meta{margin:4px 0 0;color:var(--soft);font-size:.86rem}.mot b{color:var(--ink)}
.copy{font:inherit;font-weight:700;font-size:.95rem;padding:10px 16px;border:2.5px solid var(--rule);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer;white-space:nowrap;min-width:108px}
.eo{border-style:solid}.eoflag{opacity:.55;cursor:default;text-align:center}
.copy.done{background:var(--teal);color:var(--teal-ink);border-color:var(--teal)}
.copy:focus-visible,.chip:focus-visible,.toggle:focus-visible,input:focus-visible{outline:3px solid var(--teal);outline-offset:2px}
.pose{border-color:#8e6ad6}.plan{margin:6px 0 0;font-size:.86rem}.plan summary{cursor:pointer;color:var(--soft);text-decoration:underline}.plan dl{margin:6px 0 0;display:grid;grid-template-columns:auto 1fr;gap:2px 10px}.plan dt{font-weight:700}.plan dd{margin:0}.rev{margin:8px 0 0;padding:10px 12px;border:2px dashed var(--teal);border-radius:12px}.revt{margin:0 0 8px;font-size:.88rem}.copy2{font:inherit;font-weight:700;font-size:.88rem;padding:7px 14px;border:2px solid var(--teal);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer}.copy2.done{background:var(--teal);color:#fff}
.toggle{font:inherit;font-size:.86rem;background:none;border:0;padding:6px 0 0;color:var(--soft);text-decoration:underline;cursor:pointer}
pre{white-space:pre-wrap;word-wrap:break-word;margin:10px 0 0;padding:12px 14px;background:var(--box);border-radius:10px;font:inherit;font-size:.86rem;line-height:1.55;max-height:340px;overflow:auto}
.hidden{display:none}
.toast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 16px;border-radius:999px;font-size:.92rem;opacity:0;transition:opacity .2s;pointer-events:none}
.toast.show{opacity:1}
@media (max-width:560px){.row{grid-template-columns:1fr auto}.ref{grid-column:1/2}.body{grid-column:1/3;grid-row:2}.copy{grid-column:2/3;grid-row:1}}
@media (prefers-reduced-motion:reduce){.toast{transition:none}}
</style></head><body>
<header><div class="wrap">
<h1>${TITLE}</h1>
<p class="sub">${data.length} frames${M.INSERT_PROMPTS.length?" plus "+M.INSERT_PROMPTS.length+" inserts":""}. Tap Copy, paste into Flow, and attach the images listed under each line. Frames with a dashed box have a mask reveal: cover the element with a flat shape in Premiere and take it away on the word. Every card also lists the camera move and the pop-in for your edit. Lines marked <b>No base image</b> are not generated here: their picture is an edit made on the Edit page. Lines in a <b>sequence</b> get extra images on the Edit page. Each card shows the frame's plan: what the viewer should feel, the line type, the one colour element and the interrupt; tap <b>Plan</b> for the rest.</p>
<div class="tools">
<input type="search" id="q" placeholder="Find a frame (S42) or words from the line" aria-label="Find a frame">
<button class="chip" id="todo" aria-pressed="false">Not copied yet</button>
<button class="chip" id="revs" aria-pressed="false">Reveals only</button>
<button class="chip" id="extras" aria-pressed="false">Inserts & edits</button>
<span class="count" id="count"></span>
</div></div></header>
<main><div class="wrap" id="list"></div></main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
const DATA=${JSON.stringify(data)};
let copied={};try{copied=JSON.parse(localStorage.getItem("copied:${TITLE.replace(/"/g,"")}")||"{}")}catch(e){copied={}}
const save=()=>{try{localStorage.setItem("copied:${TITLE.replace(/"/g,"")}",JSON.stringify(copied))}catch(e){}};
const list=document.getElementById("list"),q=document.getElementById("q"),todo=document.getElementById("todo"),count=document.getElementById("count"),toast=document.getElementById("toast");
function esc(t){return t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
list.innerHTML=DATA.map((d,i)=>'<section class="frame" id="'+d.r+'" data-i="'+i+'"><div class="row"><div class="ref"><span class="dot" style="background:'+d.c+'" title="'+d.m+' mood"></span>'+d.r+'</div><div class="body"><p class="line">'+esc(d.l)+'</p>'+(d.eo?'<div class="rev eo"><p class="revt"><b>No base image for this line \\u2014 do not generate it.</b> Its picture is image '+d.eo.i+' of sequence '+d.eo.seq+', made on the Edit page from the '+d.eo.from+' image.</p></div>':(d.w&&!d.w.n?'<div class="rev"><p class="revt"><b>WORD frame \u2014 no image needed:</b> make a pure white frame in Premiere and add the word. (The prompt below makes the same white frame if you prefer to generate it.)</p></div>':'<p class="meta">Attach: '+esc(d.a)+'</p>'))+(d.pl.top.length?'<p class="meta mot">'+d.pl.top.map(x=>'<b>'+esc(x[0])+':</b> '+esc(x[1])).join(' \u00b7 ')+'</p>':'')+(d.pl.more.length?'<details class="plan"><summary>Plan</summary><dl>'+d.pl.more.map(x=>'<dt>'+esc(x[0])+'</dt><dd>'+esc(x[1])+'</dd>').join('')+'</dl></details>':'')+(d.kw?'<p class="meta mot"><b>On-screen keyword:</b> \u201c'+esc(d.kw.word)+'\u201d on \u201c'+esc(d.kw.on)+'\u201d \u2014 add it in Premiere in the channel keyword style (not in the image)</p>':'')+(d.sq?'<p class="meta mot"><b>Sequence '+d.sq.id+' \\u201c'+esc(d.sq.t)+'\\u201d:</b> '+(d.sq.a===d.sq.b?'image '+d.sq.a:'images '+d.sq.a+'\\u2013'+d.sq.b)+' of '+d.sq.n+' are on this line'+(d.sq.x?' ('+d.sq.x+' extra image'+(d.sq.x>1?'s':'')+' on the Edit page)':'')+'</p>':'')+(d.mv?'<p class="meta mot"><b>Camera move (your edit):</b> '+esc(d.mv.l)+(d.mv.on?' on \u201c'+esc(d.mv.on)+'\u201d':'')+(d.mv.n?' \u2014 '+esc(d.mv.n):'')+'</p>':'')+(d.pp?'<p class="meta mot"><b>Pop-in:</b> '+esc(d.pp.w.replace(/_/g," ").toLowerCase())+(d.pp.on?' on \u201c'+esc(d.pp.on)+'\u201d':'')+(d.pp.m?' \u2014 '+esc(d.pp.m):'')+'</p>':'')+(d.v?'<div class="rev"><p class="revt"><b>Reveal on \u201c'+esc(d.v.on)+'\u201d</b> \u2014 mask reveal, no extra generation.</p><p class="revt">'+esc(d.v.e)+'</p></div>':'')+(d.z&&!d.eo?'<div class="rev pose"><p class="revt"><b>Edit on \u201c'+esc(d.z.on)+'\u201d</b> \u2014 no new frame: open this frame\u2019s image in the image editor, paste the edit prompt, then cut from the original to the edited image on the word.</p><button class="copy2" data-z="'+i+'">Copy edit prompt</button></div>':'')+(d.ins?'<p class="revt"><b>Insert frame</b> \u2014 cut in after the main frame, on the word.</p>':'')+(d.eo?'':'<button class="toggle" aria-expanded="false">Show prompt</button><pre class="hidden">'+esc(d.p)+'</pre>')+'</div>'+(d.eo?'<span class="copy eoflag" aria-hidden="true">Edit page</span>':'<button class="copy" data-i="'+i+'">Copy</button>')+'</div></section>').join("");
function paint(){let n=0;document.querySelectorAll("button.copy").forEach(b=>{const d=DATA[b.dataset.i];const on=!!copied[d.r];if(on)n++;b.classList.toggle("done",on);b.textContent=on?"Copied":"Copy"});count.textContent=n+" of "+DATA.filter(d=>!d.eo).length+" copied";filter()}
function filter(){const t=q.value.trim().toLowerCase(),only=todo.getAttribute("aria-pressed")==="true",ro=document.getElementById("revs").getAttribute("aria-pressed")==="true",xo=document.getElementById("extras").getAttribute("aria-pressed")==="true";document.querySelectorAll(".frame").forEach(f=>{const d=DATA[f.dataset.i];const hit=!t||d.r.toLowerCase()===t||d.r.toLowerCase().startsWith(t)&&/^s\\d+b?$/.test(t)||d.l.toLowerCase().includes(t);f.classList.toggle("hidden",!hit||(only&&(copied[d.r]||d.eo))||(ro&&!d.v)||(xo&&!(d.z||d.ins)))})}
async function copyText(txt){try{await navigator.clipboard.writeText(txt);return true}catch(e){const ta=document.createElement("textarea");ta.value=txt;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand("copy")}catch(_){}document.body.removeChild(ta);return ok}}
function say(m){toast.textContent=m;toast.classList.add("show");clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove("show"),1600)}
list.addEventListener("click",async e=>{const b2=e.target.closest(".copy2");if(b2){const d=DATA[b2.dataset.z];const ok=await copyText(d.z.p);if(ok){b2.classList.add("done");b2.textContent="Edit prompt copied";say(d.r+" edit prompt copied")}else{say("Copy was blocked — open Show prompt and copy manually")}return}const b=e.target.closest(".copy");if(b){const d=DATA[b.dataset.i];const ok=await copyText(d.p);if(ok){copied[d.r]=1;save();paint();say(d.r+" prompt copied")}else{const pre=b.parentElement.querySelector("pre");pre.classList.remove("hidden");const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);say("Copy was blocked — the prompt is selected, copy it manually")}return}
const t=e.target.closest(".toggle");if(t){const pre=t.nextElementSibling;const open=pre.classList.toggle("hidden")===false;t.setAttribute("aria-expanded",open);t.textContent=open?"Hide prompt":"Show prompt"}});
q.addEventListener("input",filter);document.getElementById("extras").addEventListener("click",e=>{const x=e.currentTarget;x.setAttribute("aria-pressed",x.getAttribute("aria-pressed")==="true"?"false":"true");filter()});document.getElementById("revs").addEventListener("click",e=>{const x=e.currentTarget;x.setAttribute("aria-pressed",x.getAttribute("aria-pressed")==="true"?"false":"true");filter()});todo.addEventListener("click",()=>{todo.setAttribute("aria-pressed",todo.getAttribute("aria-pressed")==="true"?"false":"true");filter()});
paint();
</script></body></html>`;
fs.writeFileSync(OUT,html);console.log("html bytes",Buffer.byteLength(html));
