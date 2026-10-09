// Revision 13c — the last pass before production: character interaction across the film, the remaining weak metaphors
// replaced, and the four retention peaks designed as aha moments.
module.exports = function (api) {
  const { P, rw, ed, by, srep, addProp, E } = api;
  const K = "The rest of the frame and the camera stay exactly as they are.";
  // the interaction clause is part of the action and of THE PICTURE, so the generator draws it
  srep("`ACTION: ${b.action}`", "`ACTION: ${b.action}${b.touch ? \" \" + b.touch : \"\"}`");
  srep("parts.push(`THE PICTURE: ${b.picture}`);", "parts.push(`THE PICTURE: ${b.picture}${b.touch ? \" \" + b.touch : \"\"}`);");
  // ── 1. Interaction: the two characters touch, hand over, pull or react — distance stays only where distance is the story ──
  const T = {
    S13: "DAUGHTER holds THE TABLET up toward MOM to show her the game, and MOM glances back at it over her shoulder.",
    S33: "Their hands meet first: DAUGHTER's two small mitten hands grab MOM's open hands as she runs in.",
    S36: "DAUGHTER stretches one small mitten hand up toward MOM's dangling foot, just out of reach.",
    S39: "DAUGHTER ducks away from the foam under MOM's outstretched arm.",
    S41: "DAUGHTER grabs MOM's tapping wrist with both small mitten hands and pulls it away from the clock.",
    S48: "Without looking up, DAUGHTER drops one more speech bubble onto the pile on top of MOM.",
    S56: "DAUGHTER flinches back from the pointing hand, both small mitten hands raised in front of her face.",
    S59: "DAUGHTER swings THE TOY DINOSAUR right past MOM's nose, and MOM does not move.",
    S67: "MOM's other mitten hand rests on DAUGHTER's back as she reaches.",
    S77: "DAUGHTER holds MOM's hand, which reaches back between the seats, with one small mitten hand while she explains.",
    S79: "MOM grips the dashboard with both mitten hands, her eyes on the road ahead.",
    S86: "DAUGHTER pushes THE PARENTING BOOK away from her face with one small mitten hand.",
    S98: "DAUGHTER clutches MOM's leg with both small mitten hands as she wails.",
    S145: "DAUGHTER reaches up and pulls one pastel label off MOM's arm with her small mitten hand.",
    S162: "DAUGHTER pulls at MOM's free hand with both small mitten hands, tugging her toward the slide.",
    S172: "MOM's arm rests round DAUGHTER's shoulders.",
    S182: "DAUGHTER grabs one of MOM's waving wrists and pulls it down.",
    S185: "MOM holds out one open mitten hand toward DAUGHTER, who bounces just out of its reach.",
    S193: "DAUGHTER's small mitten hand reaches up and holds MOM's wrist.",
    S207: "DAUGHTER holds her bowl up toward the box with both small mitten hands.",
    S210: "DAUGHTER pushes MOM's pointing hand down with one small mitten hand.",
  };
  for (const [r, t] of Object.entries(T)) rw(r, { touch: t });
  // ── 2. The remaining weak metaphors ──
  // Ch 05 "Both responses miss something important / There is a third option": three doors, like a game show
  srep(`  "FIELD": {`, `  "THREE_DOORS": { kind: "INDOOR", text: "a plain stage seen straight on: a flat {WALL} back wall with three tall plain doors in {FURN} side by side across it, each with one round knob, and a flat {FLOOR} floor in front. Nothing else." },\n  "FIELD": {`);
  P("S62", { world: "THREE_DOORS", master: "S62", mood: "WHITE", size: "WIDE", ang: "EYE", cam: null, where: "on a stage with three doors", roles: "Mom", props: ["SCRIBBLE_STORM", "TUMBLEWEED"], hero: "FIGURE", reveal: null, pop: null,
    L: "the first door flung open, THE STORM OF SCRIBBLES bursting out of it", C: "the second door open on an empty room, THE TUMBLEWEED rolling out", R: "MOM, filling half the frame height, stepping back from both, the third door still shut beside her",
    action: "MOM stands on the stage in front of three tall doors and steps back from the first two: out of the first door THE STORM OF SCRIBBLES bursts, out of the second door THE TUMBLEWEED rolls across an empty room; the third door beside her is still shut.",
    performance: "MOM: eyebrows shot up, pupils on the open doors, mouth a small dismayed circle; stepping back, both mitten hands raised." });
  ed("S62", "miss", "MOM turns away from the two open doors toward the third, still-shut door, one mitten hand reaching for its round knob, her eyebrows lifting with hope. " + K);
  P("S63", { world: "THREE_DOORS", master: "S62", mood: "WHITE", size: "MEDWIDE", ang: "EYE", cam: null, where: "on the stage with three doors", roles: "Mom", props: ["GATE", "HEART_CUSHION"], hero: "GATE", reveal: null,
    L: "the two other doors, closed again", C: "MOM, filling half the frame height, holding the third door wide open", R: "inside it, THE SAFETY GATE standing shut with THE HEART CUSHION hanging on its top rail",
    action: "MOM pulls the third door wide open with one mitten hand: inside stands THE SAFETY GATE, shut, with THE HEART CUSHION hanging on its top rail — warmth and a limit together.",
    performance: "MOM: eyebrows lifted in a warm surprise, pupils on the gate, mouth a slow smile; one hand on the door, the other open at her side.",
    pop: { what: "HEART_CUSHION", on: "third", type: "PUNCH", motion: "the cushion bumps once as the door opens" } });
  // Ch 10 "another trap": the mousetrap's bait is the shiny sheet of labels (ties straight into the label stickers)
  { const b = by("S128"); rw("S128", { props: ["MOUSETRAP", "LABELS"], action: b.action.split("THE PARENTING BOOK").join("a shiny sheet of THE LABEL STICKERS") }); }
  P("S128", { world: "LIVING_ROOM", master: "S1", size: "MEDWIDE", ang: "HIGH", where: "in the living room", L: "MOM, large, tiptoeing in, one hand reaching", C: "THE GIANT MOUSETRAP on the rug", R: "a shiny sheet of THE LABEL STICKERS sitting on its bait plate" });
  // Ch 14 "That child does not exist": a too-perfect doll under a glass dome — then the dome is empty
  addProp("PERFECT_DOLL", { name: "THE PERFECT DOLL", hex: "#F2B705", colour: "golden", nouns: ["doll", "dome"], text: "THE PERFECT DOLL: one small too-neat smiling doll of a child in a golden (#F2B705) dress, standing perfectly still on a round pedestal under a clear glass dome with one small round knob on top." });
  addProp("HALO", { name: "THE GOLDEN HALO", hex: "#E8A317", colour: "gold", nouns: ["halo"], text: "THE GOLDEN HALO: one thin flat gold (#E8A317) ring like an angel's halo, about as wide as MOM's head." });
  rw("S209", { props: ["BLOCKS", "PERFECT_DOLL"], action: "DAUGHTER's two small mitten hands hover over THE TOY BLOCKS as her little tower topples apart; beside them THE PERFECT DOLL stands under its glass dome, smiling, untroubled.", performance: "DAUGHTER's hands: frozen mid-air in frustration." });
  P("S209", { world: "FIELD", master: null, mood: "WHITE", size: "HANDS", ang: "EYE", cam: null, where: "on a clean white background", L: "THE PERFECT DOLL under its glass dome, smiling, untroubled", C: "the little tower of THE TOY BLOCKS toppling apart", R: "DAUGHTER's two small hands hovering over it" });
  rw("S210", { props: ["PERFECT_DOLL"], action: "MOM points toward the toy box with one mitten hand; DAUGHTER shakes her head hard with her arms crossed, while on the shelf behind her THE PERFECT DOLL under its glass dome seems to nod sweetly." });
  P("S210", { world: "LIVING_CLOSE_R", master: null, size: "CLOSE", ang: "OTS", where: "in the living room", L: "the back of MOM's head and her pointing arm, close", C: "THE PERFECT DOLL under its glass dome on the shelf", R: "DAUGHTER's face, large, shaking her head, arms crossed" });
  rw("S211", { props: ["PERFECT_DOLL"], action: "MOM kneels and hugs sulky DAUGHTER to her side with one arm; beside them the glass dome of THE PERFECT DOLL stands empty on its pedestal — the doll is gone.", performance: "MOM: eyebrows soft, pupils on DAUGHTER, mouth a warm small smile; one arm round her. DAUGHTER: eyebrows pressed low, pupils sideways, mouth a pout; leaning into MOM anyway." });
  P("S211", { world: "LIVING_CLOSE_L", master: null, size: "CLOSE", ang: "EYE", cam: "CLOSE_TWO", where: "in the living room", L: "MOM's face, large, hugging DAUGHTER to her side", C: "the empty glass dome of THE PERFECT DOLL on its pedestal", R: "DAUGHTER's sulky face, large" });
  { const e = E.find(x => x.ref === "S211"); ed("S211", e ? e.on : "exist", "DAUGHTER's pout softens into a small smile and she leans her head on MOM's shoulder; the empty glass dome of THE PERFECT DOLL stays exactly as it is. " + K); }
  rw("S232", { props: ["BLOCKS", "HALO"], action: "MOM sits on the rug with DAUGHTER close in her lap and lifts THE GOLDEN HALO off her own head with one mitten hand, setting it down on the rug among THE TOY BLOCKS.", performance: "MOM: eyebrows relaxed, pupils on DAUGHTER, mouth a relieved smile; one hand lifting the halo, the other arm round DAUGHTER. DAUGHTER: eyes closed in two content curves, mouth a small smile; snuggled in." });
  P("S232", { world: "LIVING_CLOSE_L", master: null, size: "CLOSE", ang: "EYE", where: "on the living-room rug", L: "MOM's face, large, lifting THE GOLDEN HALO off her head", C: "DAUGHTER snuggled in her lap", R: "scattered THE TOY BLOCKS on the rug" });
  // the old unicorn props are no longer used anywhere
  for (const k of ["UNICORN", "UNICORN_BUN"]) { const src = api.getSrc(), i = src.indexOf(`  "${k}": {`); if (i >= 0 && !api.B.some(b => (b.props || []).includes(k))) srep(src.slice(i, src.indexOf("\n", i) + 1), ""); }
  // ── 3. The four retention peaks, designed as aha moments ──
  // S74 "Boundaries.": the click calms her
  { const e = E.find(x => x.ref === "S74"); ed("S74", e ? e.on : "Boundaries", "THE SAFETY GATE is now shut, its lever latch snapped down with three short click dashes; DAUGHTER, who was reaching toward the stairs, stops, lowers her hands and looks up at MOM, her face turning calm. MOM's planted feet, the hallway and the camera stay exactly as they are."); }
  // S101 "They need someone sturdy.": the calm spreads to the passenger
  rw("S101", { roles: "Mom, Daughter", action: "MOM grips THE CONTROL YOKE with both mitten hands, sitting bolt upright and still while the storm rattles the windshield; THE FULL TEACUP on the dashboard does not spill; beside her in the co-pilot seat DAUGHTER, who was gripping her armrest, looks over at MOM and her shoulders begin to drop.",
    performance: "MOM: eyebrows level and steady, pupils fixed ahead, mouth a calm firm line; both hands on the yoke. DAUGHTER: eyebrows easing from a worried slope, pupils on MOM, mouth a small open oval; one hand on the armrest." });
  P("S101", { world: "COCKPIT", master: "S94", size: "MEDIUM", ang: "EYE", where: "in the cockpit", L: "MOM, large, bolt upright, both hands locked firm on THE CONTROL YOKE", C: "THE FULL TEACUP on the dashboard, perfectly still", R: "DAUGHTER in the co-pilot seat, looking over at her, her grip on the armrest loosening" });
  { const e = E.find(x => x.ref === "S101"); ed("S101", e ? e.on : "sturdy", "DAUGHTER lets go of the armrest and rests her small mitten hand on MOM's arm, her eyebrows relaxing into calm curves; MOM, THE CONTROL YOKE, THE FULL TEACUP and the storm outside stay exactly as they are."); }
  // S171 "That is the part people miss.": the magnifying glass shows what you'd miss — she screams, but her hand holds on tight
  rw("S171", { action: "MOM walks home past the bench carrying DAUGHTER, who still wails over her shoulder; inside the clear lens of THE GIANT MAGNIFYING GLASS standing on the path, DAUGHTER's small mitten hand shows big, gripping MOM's shoulder tight — holding on even while she screams.",
    performance: "MOM: eyebrows level, pupils ahead, mouth a calm line; carrying her close. DAUGHTER: eyes squeezed, mouth a wail; one small hand clinging tight to MOM's shoulder." });
  P("S171", { world: "PARK", master: "S151", size: "MEDWIDE", ang: "EYE", where: "in the playground at dusk", L: "the bench", C: "THE GIANT MAGNIFYING GLASS on the path, its lens showing DAUGHTER's small hand gripping MOM's shoulder tight", R: "MOM walking home, large, carrying DAUGHTER, who still wails" });
  // S179 "the exact same tantrum looks completely different": a match cut from S9 in the edit
  rw("S179", { move: { type: "HOLD", on: "", note: "match cut: show S9 for six frames at the same framing, then cut to S179 — the same tantrum, a calm room" } });

  // ── QA touch-ups ──
  rw("S128", { hero: "LABELS" });
  rw("S62", { action: "MOM steps back from the first two doors, her raised mitten hands shielding her from THE STORM OF SCRIBBLES bursting out of the first door, while THE TUMBLEWEED rolls out of the second door across an empty room; the third door beside her is still shut." });
  { const e = E.find(x => x.ref === "S128"); ed("S128", e ? e.on : "trap", "MOM's reaching mitten hand closes on the sheet of THE LABEL STICKERS and the bar of THE GIANT MOUSETRAP snaps down beside her wrist with three short snap dashes; MOM's eyebrows shoot up and her mouth drops into a small round circle. " + K); }
  { const e = E.find(x => x.ref === "S63"); ed("S63", e ? e.on : "option", "MOM steps through the third door toward THE SAFETY GATE and rests one mitten hand on THE HEART CUSHION hanging on its rail, her smile widening and her eyebrows lifting. " + K); }
  rw("S62", { performance: "MOM: eyebrows shot up, pupils darting from THE STORM OF SCRIBBLES to THE TUMBLEWEED, mouth a small dismayed circle; stepping back, both mitten hands raised." });
  rw("S211", { performance: "MOM: eyebrows soft, pupils on DAUGHTER, mouth a warm small smile; one arm round her, one mitten hand on her shoulder. DAUGHTER: eyebrows pressed low, pupils sideways, mouth a pout; both small mitten hands in her lap, leaning into MOM anyway." });
  rw("S210", { pop: null });
  api.SEQ.push({ id: "Q27", title: "They need someone sturdy", base: "S101 base changes (DAUGHTER in the co-pilot seat) — new prompt", images: [
    { i: 1, ref: "S101", type: "base" },
    { i: 2, ref: "S101", type: "step", from: "image 1", on: "someone", change: "Two short black zigzag lightning lines flash outside the windshield and DAUGHTER grips her armrest tighter with both small mitten hands, her pupils fixed on MOM; MOM stays bolt upright, both hands locked on THE CONTROL YOKE. " + K },
    { i: 3, ref: "S101", type: "edit", from: "image 2" }] });
  ed("S210", "agrees", "DAUGHTER's head stops shaking and turns toward THE PERFECT DOLL under its glass dome, her eyebrows pressing lower and her pout pushing out further. MOM's pointing arm and the camera stay exactly as they are.");
  rw("S183", { link: "The third door: warmth and a limit together." });
  for (const r of ["S85", "S145", "S211", "S232"]) rw(r, { device: "METAPHOR_OBJECT" });
  { const src = api.getSrc(), i = src.indexOf('  "CROSSROADS": {'); if (i >= 0 && !api.B.some(b => b.world === "CROSSROADS")) srep(src.slice(i, src.indexOf("\n", i) + 1), ""); }
};
