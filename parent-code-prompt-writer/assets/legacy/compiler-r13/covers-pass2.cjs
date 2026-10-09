// Revision 12, pass 2 — every mask cover is re-matched to the colour its element now sits on.
module.exports = function (api) {
  const { B, d } = api;
  const OLD = require(require("path").resolve(__dirname, "../../data.js")); // the Revision 11 build's data
  let n = 0, miss = [];
  for (const b of B) {
    if (!b.reveal || !b.reveal.cover) continue;
    const ph = /^\{(SKY|WALL|FIELD)\}$/.exec(b.reveal.cover);
    if (ph) { const p = d.framePalette(b), k = ph[1].toLowerCase(); b.reveal = { ...b.reveal, cover: p[k][1], how: b.reveal.how.split("{" + ph[1] + "NAME}").join(p[k][0]).split("{" + ph[1] + "}").join(p[k][1]) }; api.changed.add(b.ref); n++; continue; }
    const o = OLD.RAW_BEATS.find(x => x.ref === b.ref); if (!o) continue;
    const oldP = OLD.framePalette(o), newP = d.framePalette(b);
    const key = Object.keys(oldP).find(k => oldP[k] && oldP[k][1].toUpperCase() === b.reveal.cover.toUpperCase());
    if (!key) { miss.push(b.ref); continue; } // cover is an object colour, not the setting — unchanged
    const nc = newP[key][1];
    if (nc.toUpperCase() !== b.reveal.cover.toUpperCase()) {
      const oc = b.reveal.cover;
      b.reveal = { ...b.reveal, cover: nc, how: String(b.reveal.how || "").split(oc).join(nc).replace(new RegExp(oldP[key][0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), newP[key][0]) };
      api.changed.add(b.ref); n++;
    }
  }
  console.log(`covers re-matched: ${n}; covers on object colours (unchanged): ${miss.join(" ") || "none"}`);
};
