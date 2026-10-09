// Edit page (compiler v19): every in-scene edit plus the extra sequence images, in film order, each saying which image to open,
// with the frame's plan (feel, interaction and distance, contrast) so the edit keeps the moment's purpose.
// Usage: node scripts/edit-page.cjs <build.jsx> <out.html> "<Title>"   (ONLY=S1-S16 prints a range)
const [BUILD, OUT, TITLE] = [process.argv[2], process.argv[3], process.argv[4] || "Prompts"];
if (!BUILD || !OUT) { console.error("usage: node edit-page.cjs <build.jsx> <out.html> \"<Title>\""); process.exit(1); }
const fs=require("fs"),vm=require("vm");let s=fs.readFileSync(BUILD,"utf8");s=s.slice(0,s.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm,"");
const M=vm.runInNewContext(s+";({RAW_BEATS,EDIT_PROMPTS,MOOD,SCRIPT,PROJECT:(typeof PROJECT==='undefined'?null:PROJECT),SEQUENCES:(typeof SEQUENCES==='undefined'?[]:SEQUENCES),SEQ_PROMPTS:(typeof SEQ_PROMPTS==='undefined'?[]:SEQ_PROMPTS)})",{});
const N=M.RAW_BEATS.length,SPF=(M.PROJECT&&M.PROJECT.runtimeSec?M.PROJECT.runtimeSec:503)/N;
const words=M.SCRIPT.map(x=>String(x).split(/\s+/).filter(Boolean).length),SPW=(M.PROJECT&&M.PROJECT.runtimeSec?M.PROJECT.runtimeSec:503)/words.reduce((a,c)=>a+c,0);
const tAt=n=>words.slice(0,n-1).reduce((a,c)=>a+c,0)*SPW, clock=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`;
const imgName=(s,k)=>{const im=s.images[k-1];if(!im)return "the base image";if(im.type==="base")return `the ${im.ref} image from the Copy page (image ${k})`;return `image ${k}: the ${im.ref} ${im.type==="step"?"extra image":"edit"} made above`;};
const fromText=(s,im)=>{const m=/image (\d+)/.exec(im.from||"");return m?imgName(s,Number(m[1])):"the base image";};
const item=(ref,on,change,prompt,s,im,key)=>{const b=M.RAW_BEATS.find(x=>x.ref===ref);return {k:key,r:ref,n:b.n,seg:b.sequence,scene:b.scene,l:M.SCRIPT[b.n-1],on,sum:change.split(/(?<=\.)\s/)[0],p:prompt,c:M.MOOD[b.mood].field[1],time:clock(tAt(b.n)),
  pl:(()=>{const x=b.plan||{};return [x.ft&&["Feel",x.ft],x.ia&&["Interaction",x.ia+(x.dist?" ("+x.dist+")":"")],x.cx&&["Contrast",x.cx]].filter(Boolean);})(),sq:s?`Sequence ${s.id} \u201c${s.title}\u201d \u00b7 image ${im.i} of ${s.images.length}`+(b.editOnly?" \u00b7 this line has no base image":""):"",open:s?fromText(s,im):`the ${ref} image from the Copy page`,ord:b.n*10+(im?im.i:0)};};
const RANGE=(process.env.ONLY||"").match(/^S(\d+)-S(\d+)$/);const inRange=r=>!RANGE||(+r.slice(1)>=+RANGE[1]&&+r.slice(1)<=+RANGE[2]);
const data=[];
for(const e of M.EDIT_PROMPTS){const s=M.SEQUENCES.find(q=>q.images.some(im=>im.ref===e.ref&&im.type==="edit"));const im=s?s.images.find(x=>x.ref===e.ref&&x.type==="edit"):null;data.push(item(e.ref,e.on,e.change,e.prompt,s,im,e.ref));}
for(const p of M.SEQ_PROMPTS){const s=M.SEQUENCES.find(q=>q.id===p.seq);const im=s.images[p.i-1];data.push(item(p.ref,p.on,p.change,p.prompt,s,im,p.seq+"-"+p.i));}
data.sort((a,b)=>a.ord-b.ord);for(let i=data.length-1;i>=0;i--)if(!inRange(data[i].r))data.splice(i,1);
const segs=[...new Set(data.map(d=>d.seg))];
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITLE}: edit prompts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--paper:#FBFAF7;--ink:#161616;--soft:#5E5E5E;--rule:#161616;--teal:#00A6A0;--violet:#6E4FC7;--card:#FFFFFF;--box:#F1F0EC;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--paper:#151719;--ink:#F2F1EC;--soft:#A7A9AB;--rule:#F2F1EC;--card:#1C1F22;--box:#24282C;--violet:#A58CF0}}
:root[data-theme="dark"]{--paper:#151719;--ink:#F2F1EC;--soft:#A7A9AB;--rule:#F2F1EC;--card:#1C1F22;--box:#24282C;--violet:#A58CF0}
*,*::before,*::after{box-sizing:inherit}
html{scroll-padding-top:calc(env(safe-area-inset-top,0px) + 70px)}
body{margin:0;background:var(--paper);color:var(--ink);font-family:"Atkinson Hyperlegible",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:16px;line-height:1.5}
header{padding:14px 16px 4px}.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--paper);border-bottom:2.5px solid var(--rule);padding:10px 16px}
.wrap{max-width:860px;margin:0 auto}
h1{font-size:1.35rem;line-height:1.2;margin:0 0 4px}
.steps{margin:0 0 10px;padding-left:1.2em;color:var(--soft);font-size:.9rem}
.steps li{margin:1px 0}
.tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
select,.chip{font:inherit;font-size:.9rem;padding:8px 12px;border:2px solid var(--rule);border-radius:999px;background:var(--card);color:var(--ink)}
.chip{cursor:pointer}.chip[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.count{font-size:.9rem;color:var(--soft);margin-left:auto;font-variant-numeric:tabular-nums}
main{padding:4px 16px 60px}
h2{font-size:1.05rem;margin:22px 0 4px;padding-bottom:4px;border-bottom:1.5px solid var(--rule)}
h2 span{color:var(--soft);font-weight:400;font-size:.9rem}
.item{padding:14px 0;border-bottom:1px solid color-mix(in srgb,var(--rule) 25%,transparent)}
.top{display:flex;gap:10px;align-items:flex-start}
.ref{font-weight:700;font-variant-numeric:tabular-nums;min-width:54px;display:flex;align-items:center;gap:6px}
.dot{width:11px;height:11px;border-radius:50%;border:1.5px solid var(--rule);flex:none}
.body{flex:1;min-width:0}
.line{margin:0;font-size:1rem}
.meta{margin:3px 0 0;color:var(--soft);font-size:.85rem}
.todo{margin:8px 0 0;padding:10px 12px;background:var(--box);border-left:4px solid var(--violet);border-radius:8px;font-size:.92rem}
.todo b{color:var(--violet)}
.copy{font:inherit;font-weight:700;font-size:.92rem;padding:9px 14px;border:2.5px solid var(--rule);border-radius:999px;background:var(--card);color:var(--ink);cursor:pointer;white-space:nowrap}
.copy.done{background:var(--teal);color:#fff;border-color:var(--teal)}
.toggle{font:inherit;font-size:.85rem;background:none;border:0;padding:6px 0 0;color:var(--soft);text-decoration:underline;cursor:pointer}
pre{white-space:pre-wrap;word-wrap:break-word;margin:8px 0 0;padding:12px 14px;background:var(--box);border-radius:10px;font:inherit;font-size:.85rem;line-height:1.55;max-height:320px;overflow:auto}
.hidden{display:none}
.copy:focus-visible,.chip:focus-visible,.toggle:focus-visible,select:focus-visible{outline:3px solid var(--teal);outline-offset:2px}
.toast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);transform:translateX(-50%);background:var(--ink);color:var(--paper);padding:10px 16px;border-radius:999px;font-size:.92rem;opacity:0;transition:opacity .2s;pointer-events:none}
.toast.show{opacity:1}
@media (max-width:560px){.top{flex-wrap:wrap}.body{order:3;flex-basis:100%}.copy{margin-left:auto}}
@media (prefers-reduced-motion:reduce){.toast{transition:none}}
</style></head><body>
<header><div class="wrap">
<h1>${TITLE} — edit prompts</h1>
<ol class="steps"><li>Generate the frame from its normal prompt.</li><li>Open that frame's image in the image editor and paste its edit prompt below.</li><li>In Premiere, show the original image, then cut to the edited one on the cue word.</li></ol>
</div></header><div class="bar"><div class="wrap"><div class="tools">
<select id="seg" aria-label="Jump to segment"><option value="">All segments</option>${segs.map(sg=>`<option>${sg}</option>`).join("")}</select>
<button class="chip" id="todo" aria-pressed="false">Not done yet</button>
<span class="count" id="count"></span>
</div></div></div>
<main><div class="wrap" id="list"></div></main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
const DATA=${JSON.stringify(data)};
let done={};try{done=JSON.parse(localStorage.getItem("edits:${TITLE.replace(/"/g,"")}")||"{}")}catch(e){done={}}
const save=()=>{try{localStorage.setItem("edits:${TITLE.replace(/"/g,"")}",JSON.stringify(done))}catch(e){}};
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const list=document.getElementById("list"),seg=document.getElementById("seg"),todo=document.getElementById("todo"),count=document.getElementById("count"),toast=document.getElementById("toast");
const segs=[...new Set(DATA.map(d=>d.seg))];
list.innerHTML=segs.map(sg=>{const items=DATA.map((d,i)=>[d,i]).filter(([d])=>d.seg===sg);return '<section class="seg" data-seg="'+esc(sg)+'"><h2>'+esc(sg)+' <span>· '+items.length+' edit'+(items.length>1?"s":"")+'</span></h2>'+items.map(([d,i])=>'<div class="item" data-i="'+i+'"><div class="top"><div class="ref"><span class="dot" style="background:'+d.c+'"></span>'+d.r+'</div><div class="body"><p class="line">'+esc(/^[\\u201c"]/.test(d.l)?d.l:"\\u201c"+d.l+"\\u201d")+'</p><p class="meta">'+esc(d.scene)+' · at '+d.time+'</p>'+(d.sq?'<p class="meta seqm"><b>'+esc(d.sq)+'</b></p>':'')+'<p class="meta">Open '+esc(d.open)+', paste this edit, then cut on the word.</p>'+(d.pl.length?'<p class="meta">'+d.pl.map(x=>'<b>'+esc(x[0])+':</b> '+esc(x[1])).join(' \\u00b7 ')+'</p>':'')+'<div class="todo"><b>Cut on \\u201c'+esc(d.on)+'\\u201d:</b> '+esc(d.sum)+'</div><button class="toggle" aria-expanded="false">Show full edit prompt</button><pre class="hidden">'+esc(d.p)+'</pre></div><button class="copy" data-i="'+i+'">Copy edit</button></div></div>').join("")+'</section>'}).join("");
function paint(){let n=0;document.querySelectorAll(".copy").forEach(b=>{const d=DATA[b.dataset.i];const on=!!done[d.k];if(on)n++;b.classList.toggle("done",on);b.textContent=on?"Copied":"Copy edit"});count.textContent=n+" of "+DATA.length+" done";filter()}
function filter(){const sv=seg.value,only=todo.getAttribute("aria-pressed")==="true";document.querySelectorAll(".seg").forEach(s=>{let vis=0;s.querySelectorAll(".item").forEach(it=>{const d=DATA[it.dataset.i];const show=(!sv||d.seg===sv)&&!(only&&done[d.k]);it.classList.toggle("hidden",!show);if(show)vis++});s.classList.toggle("hidden",!vis)})}
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){const ta=document.createElement("textarea");ta.value=t;ta.setAttribute("readonly","");ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand("copy")}catch(_){}document.body.removeChild(ta);return ok}}
function say(m){toast.textContent=m;toast.classList.add("show");clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove("show"),1600)}
list.addEventListener("click",async e=>{const b=e.target.closest(".copy");if(b){const d=DATA[b.dataset.i];if(await copyText(d.p)){done[d.k]=1;save();paint();say(d.r+" edit prompt copied")}else{const pre=b.parentElement.querySelector("pre");pre.classList.remove("hidden");const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);say("Copy was blocked — the prompt is selected, copy it manually")}return}
const t=e.target.closest(".toggle");if(t){const pre=t.nextElementSibling;const open=pre.classList.toggle("hidden")===false;t.setAttribute("aria-expanded",open);t.textContent=open?"Hide full edit prompt":"Show full edit prompt"}});
seg.addEventListener("change",()=>{filter();const f=document.querySelector(".seg:not(.hidden)");if(f)f.scrollIntoView({block:"start"})});todo.addEventListener("click",()=>{todo.setAttribute("aria-pressed",todo.getAttribute("aria-pressed")==="true"?"false":"true");filter()});
paint();
</script></body></html>`;
fs.writeFileSync(OUT,html);console.log("bytes",Buffer.byteLength(html),"edits",data.length,"segments",segs.length);
