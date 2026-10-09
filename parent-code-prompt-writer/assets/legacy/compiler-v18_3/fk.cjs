// node fk.cjs 1,5,9 [keys]  — print chosen source fields (default L,C,R,a,pf,wh) + the edit line
const fs = require("fs"), path = require("path");
const only = process.argv[2].split(",").map(Number), keys = (process.argv[3] || "L,C,R,a,pf,wh").split(",");
const F = {}, E = {};
const api = { seg() {}, F(n, o) { F[n] = o; }, E(r, on, ch) { E[r] = [on, ch]; }, Q() {} };
for (const f of fs.readdirSync("segs").filter(x => /^seg\d+\.cjs$/.test(x)).sort()) require(path.resolve("segs", f))(api);
for (const n of only) { const o = F[n]; console.log(`## S${n} [${o.sz}/${o.an || "EYE"}/${o.m}/${o.w}] r=${o.r} p=${JSON.stringify(o.p)} h=${o.h}`);
  for (const k of keys) if (o[k] !== undefined) console.log(`${k}: ${Array.isArray(o[k]) ? JSON.stringify(o[k]) : o[k]}`);
  if (E["S" + n]) console.log(`EDIT(${E["S" + n][0]}): ${E["S" + n][1]}`); }
