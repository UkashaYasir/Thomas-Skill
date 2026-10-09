// Revision 13 — chapters 03–05 (S34–S72), built with the system through one compact helper (api.P): each frame names its
// shot, natural angle, room and what sits left, centre and right (with how big the characters are); the helper writes
// THE PICTURE, the camera framing, the placement and THE PICTURE IN SHORT from that, so all four always agree.
module.exports = function (api) {
  const { rw, ed, by, E } = api;
  const SIZE = { WIDE: "wide shot", MEDWIDE: "medium-wide shot", MEDIUM: "medium shot", CLOSE: "close shot", XCLOSE: "extreme close-up", HANDS: "hands-only close shot", OBJECT: "object shot" };
  const ANG = { EYE: "at eye level", LOW: "at a small child's height", HIGH: "from a little above head height", OTS: "over the shoulder", PROFILE: "from the side at eye level", SQUARE: "straight on at eye level" };
  const CAM = { LOW: "CHILD_EYE", HIGH: "SLIGHTLY_ABOVE", OTS: "OTS" };
  const BG = m => ({ TENSE: "the room storm purple", DARK: "night navy", ICY: "frosty blue", WHITE: "clean white", NEUTRAL: "almost-white" })[m] || "the place in its own soft colours";
  const cap = s => s[0].toUpperCase() + s.slice(1);
  api.P = (ref, o) => {
    const b = by(ref), size = o.size || b.shotSize, ang = o.ang || (b.angle === "OVERHEAD" ? "HIGH" : b.angle), mood = o.mood || b.mood;
    const s = SIZE[size], a = ANG[ang] || "at eye level", where = o.where;
    const f = { shotSize: size, angle: ang, cam: o.cam !== undefined ? o.cam : (CAM[ang] || null), mood,
      picture: `a ${s} ${a} ${where} — ${o.L}; ${o.C}; ${o.R}.`,
      framing: `${cap(s)} ${a}, ${where}, horizon level: at the left ${o.L}; in the centre ${o.C}; at the right ${o.R}.`,
      map: `left — ${o.L}; centre — ${o.C}; right — ${o.R}.`,
      check: `${s} ${a}, horizon level; left: ${o.L}; centre: ${o.C}; right: ${o.R}; ${BG(mood)}.` };
    for (const k of ["world", "master", "roles", "props", "hero", "face", "action", "performance", "pop", "reveal"]) if (o[k] !== undefined) f[k] = o[k];
    rw(ref, f);
  };
  const P = api.P, swap = (ref, from, to) => { const b = by(ref); for (const k of ["action", "performance"]) if (b[k] && b[k].includes(from)) rw(ref, { [k]: b[k].split(from).join(to) }); };
  const LR = { world: "LIVING_ROOM", master: "S1" }, KI = { world: "KITCHEN_ROOM", master: "S13" }, BR = { world: "KID_ROOM", master: "S41" }, HA = { world: "HALL_ROOM", master: "S17" };
  // ── chapter 03: afraid of disappointment ──
  P("S34", { size: "CLOSE", ang: "EYE", world: "LIVING_CLOSE_L", where: "on the sofa in the living room", L: "MOM's head and shoulders, large, hugging DAUGHTER against her side", C: "DAUGHTER's face turned toward the camera with a small frown", R: "the sofa's round armrest and plain wall" });
  swap("S35", "slanting steeply", "slanting far");
  P("S35", { size: "WIDE", ang: "EYE", cam: null, where: "in the giant swing's open sky", L: "the tall swing frame", C: "the long ropes slanting far to the right", R: "MOM on the swing seat flung up to the far end of its arc, filling a third of the frame height" });
  P("S36", { size: "MEDIUM", ang: "LOW", where: "under the giant swing", L: "MOM clinging to the ropes high at the top of the arc, large", C: "the open sky between them", R: "DAUGHTER on the ground below, arms crossed, frowning up at her" });
  swap("S38", "jumps at the left", "jumps at the right");
  P("S38", { ...KI, size: "MEDWIDE", ang: "LOW", where: "in the kitchen", L: "MOM, large, holding THE COOKIE JAR high above her head in both hands, the fridge behind her", C: "the small round table", R: "DAUGHTER jumping, both hands stretched up toward the jar, the counter behind her" });
  P("S39", { ...KI, size: "CLOSE", ang: "EYE", master: null, where: "in the kitchen", L: "MOM's hand at the left edge, holding THE COOKIE JAR", C: "DAUGHTER's crumpled face, close, one small tear drop on her cheek", R: "the whole small THE RAIN CLOUD floating just above her head, clear of it" });
  P("S40", { ...KI, size: "CLOSE", ang: "OTS", master: null, where: "in the kitchen", L: "MOM's face, large, eyebrows tilted with guilt, lifting the lid off THE COOKIE JAR", C: "THE HEAVY IRON WEIGHT in her other hand", R: "the back of DAUGHTER's head, close" });
  P("S41", { ...BR, size: "MEDIUM", ang: "EYE", where: "in DAUGHTER's bedroom at night", L: "MOM, cropped at the knees, reaching over to tap THE LITTLE CLOCK", C: "THE LITTLE CLOCK on the bedside table at eight o'clock", R: "DAUGHTER bouncing on the bed, large" });
  P("S42", { ...BR, size: "MEDWIDE", ang: "LOW", where: "in DAUGHTER's bedroom at night", L: "MOM standing by the door, arms folded, filling half the frame height", C: "THE LITTLE CLOCK on the bedside table", R: "DAUGHTER marching on the bed holding THE PROTEST SIGN high, large" });
  P("S43", { ...BR, size: "MEDIUM", ang: "EYE", where: "in DAUGHTER's bedroom at night", L: "MOM, large, backing out through the door, pushing the minute hand of THE LITTLE CLOCK backward", C: "plain wall under the dark window", R: "DAUGHTER sitting up on the bed with a sly grin" });
  P("S44", { ...LR, size: "MEDIUM", ang: "LOW", where: "in the living room", L: "MOM, one step away, holding out one open hand, filling half the frame height", C: "the window on the back wall", R: "DAUGHTER, large, holding THE TOY DINOSAUR up high, about to bang it against the window" });
  P("S45", { size: "CLOSE", ang: "EYE", world: "LIVING_CLOSE_R", where: "in the living room", L: "plain storm-purple wall", C: "DAUGHTER's wailing face, close, pigtails flying, her face white", R: "THE TOY DINOSAUR clutched against her side, the shelf corner above" });
  P("S46", { ...LR, size: "MEDIUM", ang: "EYE", where: "in the living room", L: "MOM, large, leaning in and drawing shapes in the air as she explains", C: "a white speech bubble above them against the plain wall", R: "DAUGHTER, arms crossed, THE TOY DINOSAUR under one arm, looking away" });
  P("S47", { size: "HANDS", ang: "LOW", world: "LIVING_ROOM", master: null, where: "on the living-room rug", L: "MOM's hand flicking the first of THE ROW OF SPEECH BUBBLES", C: "the bubbles standing in a row like dominoes, starting to tip", R: "DAUGHTER's small hand holding THE TOY DINOSAUR, not looking" });
  P("S48", { ...LR, size: "WIDE", ang: "HIGH", where: "in the living room", L: "MOM lying flat on the rug under THE PILE OF SPEECH BUBBLES, only her head and one weary raised hand showing", C: "the heap of bubbles", R: "DAUGHTER sitting on the rug playing with THE TOY DINOSAUR, ignoring it all, filling a third of the frame height" });
  // ── chapter 04: aisle seven ──
  P("S49", { world: "SHOP_AISLE", master: "S49", size: "WIDE", ang: "HIGH", where: "down aisle seven of the supermarket", L: "MOM beside the trolley, staring into space, filling half the frame height", C: "THE SHOPPING TROLLEY", R: "DAUGHTER standing in its child seat, tipping THE CEREAL BOX, oat rings flying" });
  P("S50", { world: "SHOP_AISLE", master: null, size: "CLOSE", ang: "EYE", where: "in aisle seven", L: "a shelf of cereal boxes", C: "MOM's head and shoulders, large, frozen in thought", R: "THE THREE PODCAST MICROPHONES circling her head like buzzing flies" });
  P("S51", { ...HA, size: "WIDE", ang: "EYE", where: "in the hallway", L: "MOM at the left, reaching up too late, filling half the frame height", C: "THE SAFETY GATE drifting up off its hinges on THE BUNCH OF BALLOONS", R: "DAUGHTER sprinting up the staircase" });
  P("S52", { ...HA, master: null, size: "CLOSE", ang: "EYE", where: "at the foot of the stairs", L: "MOM's head and shoulders, large, staring down", C: "her hand on the frame of the open THE SAFETY GATE", R: "its loose, unhooked latch" });
  swap("S53", "DAUGHTER stands on the sofa holding", "DAUGHTER stands on the rug at the right holding");
  P("S53", { ...LR, size: "MEDIUM", ang: "LOW", where: "in the living room", L: "MOM kneeling, large, waving THE WHITE FLAG above her head", C: "the round rug", R: "DAUGHTER standing at the right holding THE TABLET high like a trophy" });
  { const e = E.find(x => x.ref === "S53"); ed("S53", e.on, e.change.split("DAUGHTER on the sofa").join("DAUGHTER at the right")); }
  // ── chapter 05: three responses ──
  P("S54", { ...LR, size: "MEDWIDE", ang: "LOW", where: "in the storm-purple living room", L: "SON sitting cross-legged guarding his tower of THE TOY BLOCKS, filling a third of the frame height", C: "THE TOY DINOSAUR flying across with motion dashes", R: "DAUGHTER, large, her throwing arm flung forward" });
  P("S55", { world: "LIVING_CLOSE_L", master: null, size: "XCLOSE", ang: "EYE", where: "in the living room", L: "MOM's brows, eyes and wide shouting mouth filling the frame, her face white", C: "short shout lines in the air beside her head", R: "two curled steam lines rising from the top edge" });
  P("S56", { ...LR, size: "MEDIUM", ang: "LOW", where: "in the storm-purple living room", L: "MOM, large, leaning over and pointing hard", C: "her jagged black-outlined speech bubble hanging over DAUGHTER", R: "DAUGHTER shrinking back" });
  P("S57", { world: "GRAN_STAIRWAY", master: "S26", size: "WIDE", ang: "EYE", where: "on stairs that look like the old house", L: "MOM at the foot of the stairs pointing up, filling half the frame height", C: "THE PENDULUM CLOCK against the wall", R: "DAUGHTER trudging up the steep steps alone, head down" });
  P("S58", { ...LR, size: "MEDIUM", ang: "HIGH", where: "in the living room", L: "MOM sitting back on the sofa, large, both hands open on her lap", C: "the round rug", R: "DAUGHTER a step away, swinging THE TOY DINOSAUR by its tail" });
  P("S59", { world: "LIVING_CLOSE_L", master: null, size: "CLOSE", ang: "OTS", where: "in the living room", L: "MOM's soft face, large, head tilted, hands open on her knees", C: "plain wall", R: "the back of DAUGHTER's head and one pigtail, close" });
  P("S60", { world: "LIVING_CLOSE_R", master: null, size: "CLOSE", ang: "EYE", where: "in the living room", L: "SON, small, two steps away, stacking THE TOY BLOCKS", C: "THE TOY DINOSAUR lifted again", R: "DAUGHTER's face, close, eyes sliding sideways toward SON" });
  P("S61", { ...LR, size: "WIDE", ang: "HIGH", where: "in the living room", L: "MOM on the sofa, nodding, filling a third of the frame height", C: "THE TUMBLEWEED rolling across the rug", R: "SON rubbing his head and glaring; DAUGHTER grabbing THE TOY DINOSAUR again" });
  P("S62", { size: "MEDWIDE", ang: "EYE", cam: null, where: "at the crossroads", L: "the broken edge of the left path", C: "MOM, large, gripping the post of THE SIGNPOST and leaning out over the drop", R: "the broken edge of the right path" });
  P("S63", { size: "WIDE", ang: "EYE", cam: null, where: "at the crossroads", L: "the left path ending at a broken edge", C: "MOM, small, stepping onto the straight middle path that runs on past THE SIGNPOST toward the horizon", R: "the right path ending at a broken edge" });
  P("S64", { world: "LIVING_CLOSE_L", master: null, size: "CLOSE", ang: "EYE", cam: "CLOSE_TWO", where: "in the living room", L: "MOM's head and shoulders, large, kneeling eye to eye, one hand on DAUGHTER's shoulder", C: "their two faces at the same height, filling the frame", R: "DAUGHTER's head and shoulders, large, clutching THE TOY DINOSAUR" });
  P("S65", { world: "LIVING_CLOSE_R", master: null, size: "CLOSE", ang: "OTS", where: "in the living room", L: "the back of MOM's head and shoulder, close, her hand on DAUGHTER's shoulder", C: "THE BALL OF ANGER held low in DAUGHTER's hands", R: "DAUGHTER's face looking up at MOM" });
  P("S66", { size: "HANDS", ang: "EYE", where: "on a plain warm background", L: "MOM's hand wrapping gently but firmly over DAUGHTER's", C: "THE TOY DINOSAUR between their hands", R: "DAUGHTER's small hand mid-swing" });
  P("S67", { ...LR, size: "MEDIUM", ang: "EYE", where: "in the living room", L: "SON, small, watching from the rug", C: "MOM, large, lowering her empty hand from the high shelf", R: "DAUGHTER reaching up toward THE TOY DINOSAUR on the high shelf" });
  P("S68", { world: "FIELD", master: null, mood: "WHITE", size: "MEDWIDE", ang: "EYE", where: "on a clean white background", L: "MOM sitting on the rug with DAUGHTER leaning on her, filling half the frame height", C: "a few of THE TOY BLOCKS", R: "SON holding THE GIANT MAGNIFYING GLASS up like a shield, peering through it at them" });
  P("S69", { world: "FIELD", master: null, mood: "NEUTRAL", size: "CLOSE", ang: "EYE", cam: "CLOSE_TWO", where: "on an almost-white background", L: "MOM's head and shoulders, large, her hand on DAUGHTER's pigtail, cupping THE BALL OF ANGER", C: "DAUGHTER's cheek resting on MOM's arm, their faces filling the frame", R: "one small tear drop drying on DAUGHTER's cheek" });
  P("S70", { world: "FIELD", master: null, mood: "WHITE", size: "OBJECT", ang: "EYE", cam: null, where: "on a clean white background", L: "clean white space", C: "THE LOCKBOX standing alone", R: "THE TOY DINOSAUR's green tail sticking out under its lid, wiggling" });
  P("S71", { size: "HANDS", ang: "EYE", cam: null, world: "FIELD", master: null, mood: "WHITE", where: "on a clean white background", L: "MOM's open hand held out", C: "DAUGHTER's small hand sliding into it", R: "clean white space" });
  P("S72", { world: "LIVING_CLOSE_R", master: "S1", size: "MEDIUM", ang: "LOW", where: "by the living-room shelf", L: "the sofa's round armrest", C: "DAUGHTER, large, looking up with a long sigh", R: "THE TOY DINOSAUR high on the shelf, out of reach" });
};
