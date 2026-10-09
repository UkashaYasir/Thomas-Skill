// node q.cjs "<js expr over b>" [fields]  — query the compiled frames of out/build.jsx (BUILD=path/to/build.jsx for another build)
// e.g. node q.cjs "b.plan.ln==='hook'" ref,shotSize,mood   ·   node q.cjs "b.mood==='PEAK'" ref,peak
const fs=require("fs"),vm=require("vm");
const src=fs.readFileSync(process.env.BUILD||"out/build.jsx","utf8");
const code=src.slice(0,src.indexOf("/* ===== UI ===== */")).replace(/^\s*import[^\n]*\n/gm,"");
const M=vm.runInNewContext(code+";({RAW_BEATS,PROMPTS,EDIT_CUES,SEQUENCES,PROP,WORLD})",{});
const f=new Function("b","return ("+process.argv[2]+")");
const fields=(process.argv[3]||"ref,mood,shotSize,world,roles,hero").split(",");
const get=(b,k)=>k.split(".").reduce((o,x)=>o==null?o:o[x],b);
for(const b of M.PROMPTS) if(f(b)) console.log(fields.map(k=>{const v=get(b,k);return typeof v==="object"?JSON.stringify(v):v;}).join(" | "));
