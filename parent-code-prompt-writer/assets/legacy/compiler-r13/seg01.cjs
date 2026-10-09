// Revision 13 — the cold open (S1–S16) built from Delivery 2's shot list: the living room laid out once (sofa LEFT,
// window CENTRE, high shelf with the tablet RIGHT), MOM always left and DAUGHTER right, the storm as the room turning purple
// on the peaks, white idea frames (the teacup, the classroom, the endless chart), the kitchen with its own colours.
// Every frame carries THE PICTURE (first), PLACEMENT, its room master and a FINAL CHECK (last).
module.exports = function (api) {
  const { rw, ed, by, srep, E } = api;
  srep(`  "LIVING_SHELF": {`, `  "LIVING_ROOM": { kind: "INDOOR", set: "LIVING", text: "the living room seen straight on from the front, always laid out the same way: a flat {WALL} back wall with one thin skirting board along its foot, meeting a flat {FLOOR} floor seen in gentle perspective; at the LEFT of the room one low chunky sofa in {FURN} with round armrests and two plump cushions, one cushion with a small square patch sewn on; in the CENTRE of the back wall one plain square window framed in {FURN} showing a flat {SKY} sky; at the RIGHT of the room, high on the wall far above a small child's reach, one plain wall shelf in {FURN} on two small curled brackets; one plain round rug in {FURN} lying flat on the floor in the middle. Nothing else in the room — clean wall around everything. The walls stay {WALL} — never peach, never orange." },
  "LIVING_CLOSE_R": { kind: "INDOOR", set: "LIVING", text: "the right-hand side of the living room seen close: a flat {WALL} wall behind, plain, with the end of the high wall shelf in {FURN} entering at the top right corner of the frame, and nothing else." },
  "LIVING_CLOSE_L": { kind: "INDOOR", set: "LIVING", text: "the left-hand side of the living room seen close: a flat {WALL} wall behind, plain, with the round armrest of the low sofa in {FURN} entering at the lower left corner of the frame, and nothing else." },
  "KITCHEN_ROOM": { kind: "INDOOR", set: "KITCHEN", text: "the kitchen seen straight on from the front, always laid out the same way: a flat {WALL} back wall with one thin skirting board along its foot, meeting a flat {FLOOR} floor seen in gentle perspective; at the LEFT one tall plain fridge in {FURN} with two doors and one long straight handle; in the CENTRE one small round table and two plain chairs in {FURN}, complete with legs; at the RIGHT one plain counter in {FURN} under one small square window showing a flat {SKY} sky. Nothing else in the room." },
  "LIVING_SHELF": {`);
  const SAME = "the same front view of the living room";
  const F = (ref, f) => rw(ref, f);
  // S1 — want: she is alone, the tablet far above her (room master)
  F("S1", { world: "LIVING_ROOM", shotSize: "MEDWIDE", angle: "LOW", face: "NORMAL", scale: "DOMINANT", mood: "EVENING", roles: "Daughter", props: ["TABLET"], hero: "TABLET", master: "S1",
    picture: "a medium-wide shot from low down at a small child's height in the living room — DAUGHTER on tiptoe at the right, reaching for THE TABLET on a high shelf far above her, the sofa at the left, nobody else in the room yet.",
    framing: "Medium-wide shot from low down at DAUGHTER's eye height, looking slightly up: the high wall shelf at the upper right with THE TABLET standing on it, drawn big; DAUGHTER on tiptoe below it in the right half of the frame; the sofa at the left and clean empty floor between — nobody else is here yet.",
    map: "left — the low sofa and empty floor; centre — the window on the back wall; right — DAUGHTER on tiptoe below the high shelf, THE TABLET on the shelf above her.",
    action: "DAUGHTER stands on tiptoe below the shelf with both arms stretched straight up toward THE TABLET, both mitten hands open, and looks back over her shoulder toward the left as if calling someone; THE TABLET stands alone on the shelf with plain wall around it, touching nothing but the shelf.",
    performance: "DAUGHTER: eyebrows lifted high in a pleading slope, pupils turned back over her shoulder toward the left, mouth a wide open calling oval; on tiptoe, both arms up, mitten hands open.",
    check: "medium-wide shot from a low camera; DAUGHTER at the right on tiptoe; THE TABLET drawn big on the high shelf at the upper right; the sofa at the left; living-room colours; no other people and no extra objects.",
    reveal: { what: "TABLET", on: "iPad", method: "MASK", cover: "{WALL}", how: "Premiere: draw a {WALLNAME} ({WALL}) shape over THE TABLET standing on the shelf; take it away on “iPad”. Eyedropper the wall right beside it if the render differs." } });
  // S2 — the mother enters and kneels: no
  F("S2", { world: "LIVING_ROOM", shotSize: "MEDIUM", angle: "EYE", mood: "EVENING", master: "S1",
    picture: "a medium shot at eye level in the living room — MOM, just come in, kneeling at the left with one calm palm held low; DAUGHTER standing at the right below the shelf with THE TABLET; both faces at the same height.",
    framing: `Medium shot at eye level, ${SAME}: MOM has just come in from the left and kneels on one knee in the left half; DAUGHTER stands in the right half below the high shelf, one small step away, their faces at the same height; THE TABLET on the high shelf at the top right; the round armrest of the sofa at the left edge.`,
    map: "left — MOM kneeling, the sofa's armrest behind her; centre — clean space between them; right — DAUGHTER, the high shelf with THE TABLET above her.",
    check: "medium shot, eye level; MOM kneeling at the left, DAUGHTER standing at the right; THE TABLET on the high shelf at the top right; living-room colours." });
  // S3 — the scream: the room flashes storm purple
  F("S3", { world: "LIVING_CLOSE_R", mood: "TENSE", master: "S1",
    picture: "an extreme close-up of DAUGHTER's screaming face at eye level, the room behind her flooded storm purple, THE TABLET small on the corner of the shelf at the top right.",
    map: "left and centre — DAUGHTER's screaming face filling the frame; right — the corner of the high shelf with THE TABLET, small.",
    check: "extreme close-up at eye level; the face fills the frame; storm-purple background; THE TABLET small in the top right corner; no arms, body or feet." });
  // S4 — calm is a full teacup carried through the noise (white idea frame)
  F("S4", { world: "FIELD", shotSize: "MEDIUM", angle: "EYE", face: "NORMAL", scale: "ORDINARY", mood: "WHITE", roles: "Mom", props: ["TEACUP"], hero: "FIGURE", device: "METAPHOR_OBJECT",
    picture: "a medium shot on a clean white background — MOM walking from left to right carrying a brim-full teacup like a waiter's tray while short purple scribble lines fly at it, and not a drop spills.",
    framing: "Medium shot at eye level on a clean white background: MOM walks from left to right through the centre of the frame carrying THE FULL TEACUP; short storm-violet scribble lines fly in from the right edge; plenty of clean white space around her.",
    map: "left — clean white space behind her; centre — MOM carrying THE FULL TEACUP; right — short storm-violet scribble lines flying in.",
    action: "MOM walks steadily, carrying THE FULL TEACUP on its saucer perfectly level in both mitten hands, arms held out like a waiter's tray, while short jagged scribble lines in storm violet (#A48FC4) fly in from the right and curve round the cup; not one drop of tea spills.",
    performance: "MOM: eyebrows level and drawn slightly together with effort, pupils fixed down on the tea, mouth a thin steady line; walking, both hands locked level under the cup, chin tucked.",
    check: "medium shot at eye level; clean white background with one thin floor line; MOM in the centre carrying THE FULL TEACUP; violet scribbles at the right; nothing else.",
    pop: { what: "TEACUP", on: "stay", type: "PUNCH", motion: "the cup wobbles once and settles" } });
  ed("S4", "calm", "MOM's eyes close to two soft lid curves and her shoulders drop as she lets out one long breath, her eyebrows lifting slightly in the middle. THE FULL TEACUP stays exactly level in her hands; the scribble lines, the white background and the camera stay exactly as they are.");
  // S5 — the heart offered and refused
  F("S5", { world: "LIVING_ROOM", shotSize: "MEDWIDE", angle: "HIGH", mood: "EVENING", props: ["HEART_CUSHION"], hero: "HEART_CUSHION", master: "S1",
    picture: "a medium-wide shot from slightly above in the living room — MOM kneeling at the left holding out THE HEART CUSHION, DAUGHTER at the right with her arms crossed, turned half away.",
    framing: `Medium-wide shot from slightly above, ${SAME}: MOM kneels on the round rug in the left half holding out THE HEART CUSHION; DAUGHTER stands in the right half, an arm's length away, arms crossed; the rug under them.`,
    map: "left — MOM kneeling with THE HEART CUSHION held out; centre — the round rug; right — DAUGHTER, arms crossed, turned half away.",
    check: "medium-wide shot from slightly above; MOM kneeling at the left with THE HEART CUSHION, DAUGHTER at the right; living-room colours.",
    pop: { what: "HEART_CUSHION", on: "validate", type: "PUNCH", motion: "the cushion gives one soft bounce as she offers it" } });
  // S6 — over DAUGHTER's shoulder, sides kept
  F("S6", { world: "LIVING_CLOSE_L", mood: "EVENING", master: "S1",
    picture: "a close shot over DAUGHTER's shoulder — the back of her head at the lower right, MOM's soft face at the left, a speech bubble with a tiny drawing of the tablet between them.",
    framing: "Over DAUGHTER's shoulder, from behind her on the right: her pigtail and the back of her head in the lower right foreground; MOM's head and shoulders fill the left half, facing her; a baked speech bubble floats in the upper middle, clear of both heads, against the plain wall; the round armrest of the sofa at the lower left corner.",
    map: "left — MOM's face and shoulders, the sofa armrest behind her; centre — the speech bubble with a tiny tablet drawing; right — the back of DAUGHTER's head and one pigtail, close.",
    check: "close shot over DAUGHTER's shoulder; MOM's face at the left, the back of DAUGHTER's head at the lower right; one speech bubble with a tiny tablet drawing; living-room colours.",
    reveal: { ...by("S6").reveal, cover: "{WALL}", how: "Premiere: draw a {WALLNAME} ({WALL}) shape over the whole speech bubble against the wall; take it away on “wanted”. Eyedropper the wall right beside it if the render differs." } });
  // S7 — louder: the whole room floods purple
  F("S7", { world: "LIVING_ROOM", shotSize: "WIDE", angle: "HIGH", mood: "TENSE", master: "S1",
    picture: "a wide shot from slightly above — the whole living room flooded storm purple, DAUGHTER stamping on the rug at the right, MOM on her knees at the left rocking back, the shelf with THE TABLET above.",
    framing: `Wide shot from slightly above, ${SAME}, the whole room graded storm purple: the sofa at the left, the high shelf with THE TABLET at the upper right; MOM kneels on the rug at the left, two steps back; DAUGHTER stamps on the rug at the right.`,
    map: "left — the sofa and MOM on her knees, rocking back; centre — the round rug; right — DAUGHTER stamping, the high shelf with THE TABLET above her.",
    check: "wide shot from slightly above; the whole room storm purple; MOM at the left, DAUGHTER at the right; THE TABLET on the high shelf at the upper right." });
  // S8 — the lecture as a classroom (white idea frame, gag)
  F("S8", { world: "FIELD", shotSize: "MEDIUM", angle: "LOW", mood: "WHITE", props: ["FLIPCHART", "SCHOOL_DESK"], hero: "FIGURE", device: "METAPHOR_OBJECT", gag: "she lectures a classroom of one",
    picture: "a medium shot from low down at the desk's height on clean white, like a tiny classroom — MOM at the left lecturing like a professor at THE FLIPCHART, DAUGHTER at the right squeezed into THE TINY SCHOOL DESK, arms crossed.",
    framing: "Medium shot from low down at the height of the little desk, so MOM towers like a teacher, on a clean white background like a tiny classroom: MOM stands at the left beside THE FLIPCHART like a professor; DAUGHTER sits at THE TINY SCHOOL DESK at the right, facing her; plenty of clean white space around them.",
    map: "left — MOM beside THE FLIPCHART; centre — clean white space; right — DAUGHTER at THE TINY SCHOOL DESK.",
    action: "MOM gives a full lecture like a professor: she taps THE FLIPCHART's white pad with one mitten hand, where one small simple black drawing shows a crescent moon above a small bed, her other palm raised as she makes her point; DAUGHTER sits at THE TINY SCHOOL DESK with her arms crossed tight, glaring at the desk top.",
    check: "medium shot from a low camera; clean white background with one thin floor line; MOM at the left by THE FLIPCHART, DAUGHTER at the right at THE TINY SCHOOL DESK; nothing else." });
  ed("S8", "reasoning", "DAUGHTER's crossed arms fly up and both of her mitten hands press flat over the sides of her head; her eyebrows press lower and her eyes squeeze to short lid lines with the pupils still visible. MOM, THE FLIPCHART, THE TINY SCHOOL DESK, the white background and the camera stay exactly as they are.");
  // S9 — the floor: the bottom of the storm
  F("S9", { world: "LIVING_ROOM", shotSize: "MEDWIDE", angle: "LOW", mood: "TENSE", roles: "Daughter, Mom", props: ["TOY_DINO"], hero: "FIGURE", master: "S1",
    picture: "a low floor-level shot in the purple living room — DAUGHTER flat on her back on the rug in the foreground, kicking and pounding, THE TOY DINOSAUR flying off to the right, MOM kneeling behind her at the left.",
    framing: `Low camera at floor level, medium-wide, ${SAME}, the whole room graded storm purple: DAUGHTER lies on her back on the round rug in the foreground, kicking; behind her at the left MOM kneels; THE TOY DINOSAUR flies off toward the right edge.`,
    map: "left — MOM kneeling behind, both hands raised; centre — DAUGHTER flat on her back on the rug in the foreground, kicking; right — THE TOY DINOSAUR in mid-air, flung clear.",
    action: "The storm is at its peak: DAUGHTER lies flat on her back on the rug kicking both legs and pounding both fists, short straight ink motion dashes beside each fist and foot; THE TOY DINOSAUR tumbles through the air toward the right, flung clear; MOM kneels behind her at the left, leaning back with both mitten hands raised helplessly.",
    performance: "DAUGHTER: eyebrows pressed low in a steep inward tilt, one short upper-lid line on each eye with the pupils pushed up, mouth a big open wailing oval; back flat on the rug, legs kicking, fists pounding. MOM: eyebrows tilted up in the middle, pupils on DAUGHTER, mouth a small open worried oval; leaning back on her knees, both palms raised. MOM looks at DAUGHTER; DAUGHTER looks at nothing.",
    check: "low camera at floor level, medium-wide; the room storm purple; DAUGHTER on her back in the foreground, MOM behind at the left, THE TOY DINOSAUR in the air at the right." });
  ed("S9", "throw", "DAUGHTER's kicking legs scissor the other way and her head rolls on the rug, both fists pounding in a new place a hand's width away, her mouth stretched into a wider wail. MOM, THE TOY DINOSAUR, the rug and the camera stay exactly as they are.");
  // S10 — time made huge
  F("S10", { world: "LIVING_ROOM", shotSize: "WIDE", angle: "LOW", mood: "EVENING", master: "S1",
    picture: "a wide shot from low at rug level in the living room — THE GIANT CLOCK, taller than MOM, fills the upper half of the frame, leaning over MOM in the middle of the room, its minute hand pressing her down, DAUGHTER small on the rug far behind at the right.",
    framing: `Wide shot from a low camera at rug level, ${SAME}: THE GIANT CLOCK stands in the middle of the room and fills the upper frame, leaning slightly over MOM, its minute hand pressing down toward her; MOM stands braced underneath at the left; far behind at the right, small on the rug, DAUGHTER lies flat, still kicking.`,
    map: "left — MOM braced under the minute hand; centre — THE GIANT CLOCK, huge, leaning over her; right — DAUGHTER small on the rug, kicking.",
    check: "wide shot from a low camera; THE GIANT CLOCK in deep teal and cream filling the upper frame; MOM at the left pushing up its minute hand; DAUGHTER small at the right; living-room colours." });
  // S11–S12 — the hand-over and Mom's face (white)
  F("S11", { world: "LIVING_CLOSE_R", mood: "EVENING", master: "S1", picture: "hands only, close, against the living-room wall with the corner of the empty high shelf above — MOM's hand from the upper left lowering THE TABLET into DAUGHTER's two small reaching hands from the lower right.",
    map: "upper left — MOM's forearm and hand lowering THE TABLET; centre — THE TABLET; lower right — DAUGHTER's two small hands reaching up.",
    check: "hands only, no heads; the plain living-room wall with the corner of the empty shelf at the top right; THE TABLET in the centre between the hands." });
  F("S12", { mood: "NEUTRAL", master: null,
    picture: "an extreme close-up of MOM's tired face, one mitten hand pressed to her forehead, on an almost-white background.",
    map: "left and centre — MOM's eyes, brows and the top of her face; right — her mitten hand pressed to her forehead.",
    check: "extreme close-up; MOM's tired eyes fill the frame; one hand on her forehead; almost-white background; nothing else.",
    mv: ["HOLD", "", "hold on her eyes"] });
  // S13–S15 — the score: the kitchen chart, then the endless chart on white
  F("S13", { world: "KITCHEN_ROOM", shotSize: "MEDWIDE", angle: "EYE", mood: "BRIGHT", roles: "Mom, Daughter", props: ["CHECKLIST", "TABLET"], hero: "CHECKLIST", master: "S13",
    picture: "a medium-wide shot at eye level showing the whole kitchen — MOM large in the left third, from her feet to her bun, pressing a gold star onto THE CHECKLIST on the fridge, DAUGHTER behind at the table on the right, happily absorbed in THE TABLET.",
    framing: "Medium-wide shot at eye level, the whole kitchen from the front: MOM stands at the left in front of the tall fridge, pressing a star onto THE CHECKLIST on its door; in the right half, a little further back, DAUGHTER sits at the small round table absorbed in THE TABLET.",
    map: "left — MOM at the fridge, THE CHECKLIST on its door; centre — the small round table; right — DAUGHTER at the table with THE TABLET.",
    action: "MOM presses one gold star sticker into the third circle of THE CHECKLIST with her mitten thumb bump, the two earlier gold stars already in their circles above it; behind her DAUGHTER sits at the table, happily absorbed in THE TABLET held in both small mitten hands.",
    performance: "MOM: eyebrows tilted up in the middle with doubt, pupils on the star under her thumb, mouth a small flat line pulled to one side; one hand pressing the star, the other hanging. DAUGHTER: eyebrows relaxed, pupils down on the screen, mouth a small happy curve; both hands on THE TABLET. MOM looks at the chart; DAUGHTER looks at the screen.",
    check: "medium-wide shot at eye level; the kitchen in its pale blue colours; MOM at the fridge on the left with THE CHECKLIST; DAUGHTER at the table on the right with THE TABLET." });
  F("S14", { master: "S13", picture: "THE CHECKLIST drawn big on the fridge door, three circles, three gold stars.",
    map: "left — the fridge's long handle; centre — THE CHECKLIST filling the middle; right — plain wall.",
    check: "an object close-up of THE CHECKLIST; three circles each with one gold star; no people." });
  F("S15", { world: "FIELD", shotSize: "WIDE", angle: "EYE", mood: "WHITE", device: "METAPHOR_OBJECT",
    picture: "a wide shot on clean white — MOM at the left holding up the top of THE ENDLESS CHECKLIST, the chart unrolling across the floor and out of the frame on the right, every circle starred but the last.",
    framing: "Wide shot at eye level on a clean white background: MOM stands at the left holding up the top of THE ENDLESS CHECKLIST; the chart unrolls down from her hands and runs across the floor to the right edge of the frame and beyond.",
    map: "left — MOM holding up the top of the chart; centre — the chart unrolling across the floor; right — the chart running out of the frame.",
    check: "wide shot at eye level; clean white background with one thin floor line; MOM at the left; THE ENDLESS CHECKLIST crossing the whole frame; nothing else.",
    mv: ["PULL_OUT", "", "pull out along the chart to its far end"] });
  ed("S15", "almost", "MOM's eyes follow the chart to its far right end and her eyebrows shoot up at the single empty circle there, her mouth dropping into a small round circle; her hands still hold the top of the chart up. THE ENDLESS CHECKLIST, the white background and the camera stay exactly as they are.");
  // S16 — the question: the hill of toys in the living room (the shelf now empty)
  F("S16", { world: "LIVING_ROOM", mood: "EVENING", master: "S1",
    picture: "a wide shot from slightly above in the living room — THE HILL OF TOYS rising in the middle, MOM small at its foot on the left holding THE PARENTING BOOK, DAUGHTER on its top at the right with THE TABLET, the high shelf now empty.",
    framing: `High camera, ${SAME}: THE HILL OF TOYS rises from the rug in the middle of the room; MOM stands small at its foot on the left; DAUGHTER sits on its flat top toward the right; the empty high shelf at the upper right.`,
    map: "left — MOM small at the foot of the hill with THE PARENTING BOOK; centre — THE HILL OF TOYS; right — DAUGHTER on its top with THE TABLET, the empty high shelf above.",
    check: "wide shot from slightly above; THE HILL OF TOYS in the middle of the living room; MOM small at the left, DAUGHTER on top at the right with THE TABLET; the shelf empty." });
  // S179 pays off S9: the same floor-level view, the same tantrum, MOM calm beside her, no purple
  rw("S179", { world: "LIVING_ROOM", shotSize: "MEDWIDE", angle: "LOW",
    framing: `Low camera at floor level, medium-wide, exactly the view of S9: DAUGHTER lies on her back on the round rug in the foreground; MOM sits cross-legged right beside her at the left; the calm living room behind them.` });


  // ── Round 2, after the first test render (6.5/10): characters bigger, angles described as what the camera sees,
  //    stronger compositions with foregrounds, no repeated kneel-left/stand-right picture, colour slips fixed.
  api.setProp("TOY_HILL", { text: "THE HILL OF TOYS: one steep heap of clearly recognisable toys piled into a hill twice as tall as MOM — chunky toy blocks with raised shapes, soft balls, a small toy car, a stuffed bear and a toy drum, each a soft pale colour with a black outline — rising from the rug to one small flat top where a child can sit." });
  F("S1", { shotSize: "MEDIUM", angle: "LOW", face: "NORMAL",
    picture: "a medium shot from low down beside DAUGHTER, so we look up past her at THE TABLET on the high shelf — she fills the right half of the frame from her feet to her raised hands, both feet planted on the floor with her heels lifted; the underside of the shelf and the top of the wall are visible above her; the sofa's armrest just enters at the left edge.",
    framing: "Medium shot from a low camera at the height of DAUGHTER's knees, looking up: DAUGHTER stands large in the right half of the frame, seen from the side, both arms stretched up; above her the high shelf, seen slightly from below, with THE TABLET standing on it, drawn big; the round armrest of the sofa enters at the left edge; the window's lower corner on the back wall.",
    map: "left — the sofa's armrest and the empty floor; centre — the lower corner of the window; right — DAUGHTER, large, on tiptoe, THE TABLET on the shelf above her.",
    action: "DAUGHTER stands with both feet planted on the floor and her heels lifted, both arms stretched straight up toward THE TABLET, mitten hands open, and looks back over her shoulder toward the left as if calling someone; THE TABLET stands alone on the shelf with plain wall around it, touching nothing but the shelf.",
    check: "medium shot from a low camera looking up; DAUGHTER large in the right half, both feet on the floor; THE TABLET big on the shelf above her, the shelf seen from slightly below; warm off-white walls; no other people." });
  F("S2", { shotSize: "CLOSE", angle: "EYE", face: "LARGE",
    picture: "a close two-shot at eye level — MOM's head and shoulders at the left and DAUGHTER's at the right, faces at the same height, filling the frame from the shoulders up; MOM's calm open palm raised low between them; the corner of the high shelf with THE TABLET at the top right.",
    framing: "Close two-shot at eye level, cropped just below the shoulders: MOM, kneeling, fills the left half with her head and shoulders; DAUGHTER fills the right half, her face level with MOM's; MOM's open palm is raised low between them; the corner of the high shelf with THE TABLET in the top right corner; plain wall behind.",
    map: "left — MOM's head and shoulders, her open palm raised low; centre — the palm between them; right — DAUGHTER's head and shoulders, the shelf corner with THE TABLET above her.",
    action: "MOM, kneeling at DAUGHTER's height, gives a small calm shake of her head and raises one open palm low between them — a calm no, not a shrug; DAUGHTER looks back at her hopefully, one hand still half raised toward THE TABLET.",
    check: "close two-shot at eye level, cropped just below the shoulders; MOM at the left, DAUGHTER at the right, faces at the same height; THE TABLET small on the shelf corner at the top right." });
  ed("S2", "no", "DAUGHTER's head sinks forward, her two pigtails droop and her eyebrows slide into a disappointed slope, her mouth turning down; her raised hand drops out of view. MOM's calm face, her open palm, THE TABLET on the shelf corner and the camera stay exactly as they are.");
  F("S3", { performance: "DAUGHTER: eyebrows steeply tilted up in the middle and knotted, one short straight upper-lid line narrowing each eye with the pupils still visible and pushed up toward THE TABLET, mouth a huge round open oval; head level, facing a little to the left. Her face stays pure white with black ink lines like every character — only the wall behind her is purple.",
    check: "extreme close-up at eye level; the face fills the frame and stays pure white, never skin-coloured; storm-purple wall behind; THE TABLET small in the top right corner; no arms, body or feet." });
  F("S4", { picture: "a medium shot on clean white, cropped at MOM's knees so she fills two-thirds of the frame height: she walks to the right carrying THE FULL TEACUP held out in front of her, the cup and saucer big in the lower centre of the frame, short storm-violet scribbles flying in from the right and bending round the cup.",
    framing: "Medium shot at eye level on a clean white background, cropped at MOM's knees: MOM walks toward the right in the centre-left of the frame with THE FULL TEACUP held out in front of her, the cup drawn big in the lower centre; short storm-violet scribble lines fly in from the right edge; clean white space around her.",
    check: "medium shot at eye level, cropped at the knees; MOM fills two-thirds of the frame height; THE FULL TEACUP big in the lower centre; violet scribbles at the right; clean white background; nothing else." });
  F("S5", { shotSize: "MEDWIDE", angle: "OTS",
    picture: "over MOM's shoulder — the back of MOM's head and her arms in the left foreground holding THE HEART CUSHION out toward DAUGHTER, the cushion big in the centre of the frame; DAUGHTER stands in the right half facing us, arms crossed, turned half away; the high shelf at the upper right behind her.",
    framing: "Over MOM's shoulder from behind her on the left: the back of MOM's head, her bun and her shoulder fill the lower left foreground; her arms reach toward the centre holding THE HEART CUSHION out, big; DAUGHTER stands in the right half facing the camera, arms crossed, turned half away; the high shelf at the upper right and plain wall behind her.",
    map: "left — the back of MOM's head and shoulder, close; centre — THE HEART CUSHION held out, big; right — DAUGHTER, arms crossed, turned half away, the high shelf above her.",
    performance: "MOM (seen from behind at a three-quarter turn): head tilted toward DAUGHTER, both hands holding the cushion out, gentle. DAUGHTER: eyebrows pressed low and knotted, pupils pushed sideways away from MOM, mouth a tight downturned pout; arms crossed hard, shoulder turned toward MOM. Eye contact refused.",
    check: "over-the-shoulder shot from behind MOM; THE HEART CUSHION big in the centre; DAUGHTER facing us at the right, arms crossed; warm off-white walls." });
  F("S7", { picture: "a high wide shot looking down into the purple living room from near the ceiling — the floor and the round rug fill most of the frame; DAUGHTER stamps in the middle of the rug at the right with her head thrown back toward the camera; MOM kneels at the left, rocking back; the tops of the sofa and of the shelf with THE TABLET along the upper edge.",
    framing: "High wide shot from near the ceiling, looking down into the living room, the whole room graded storm purple: the floor and the round rug fill most of the frame; DAUGHTER stamps on the rug at the right, her face tipped up toward the camera; MOM kneels at the left, two steps back, rocking back; the sofa's top and the high shelf with THE TABLET run along the upper edge.",
    check: "high shot looking down; the floor and rug fill most of the frame; the room storm purple; MOM at the left, DAUGHTER at the right; THE TABLET on the shelf at the upper edge." });
  F("S8", { picture: "a low shot from just beside THE TINY SCHOOL DESK on clean white — DAUGHTER at the desk big in the right foreground, seen from the side with her arms crossed; MOM at THE FLIPCHART in the left background, towering above her like a teacher.",
    framing: "Low shot from just beside THE TINY SCHOOL DESK, at DAUGHTER's eye height, on a clean white background: DAUGHTER sits at the desk big in the right foreground, seen from the side; MOM stands at THE FLIPCHART in the left background, towering above her like a teacher.",
    map: "left — MOM at THE FLIPCHART, towering; centre — clean white space; right — DAUGHTER at THE TINY SCHOOL DESK, big in the foreground.",
    check: "low shot beside the little desk; DAUGHTER big in the right foreground; MOM at the flipchart in the left background, towering; clean white background with one thin floor line." });
  F("S9", { picture: "a camera lying on the rug in the purple living room — DAUGHTER's kicking feet and pounding fists big in the foreground, her wailing face in the centre, the rug's edge running across the bottom of the frame; MOM kneeling behind her at the left with both hands raised; THE TOY DINOSAUR flying off at the right; the ceiling line visible at the top.",
    framing: "Camera lying on the rug, at floor level, the whole room graded storm purple: DAUGHTER lies on her back with her kicking feet and pounding fists big in the foreground and her wailing face in the centre; the rug's edge runs across the bottom of the frame; behind her at the left MOM kneels, both hands raised; THE TOY DINOSAUR flies off toward the right; the walls rise straight up behind them with the ceiling line visible at the top.",
    check: "camera on the floor; DAUGHTER big in the foreground, kicking; MOM kneeling behind at the left; THE TOY DINOSAUR in the air at the right; ceiling line visible; the room storm purple." });
  F("S10", { check: "wide shot from a low camera; THE GIANT CLOCK in deep teal and cream filling the upper frame; MOM at the left pushing up its minute hand; DAUGHTER small at the right; the living room's warm off-white walls, never peach or orange." });
  F("S15", { shotSize: "MEDWIDE",
    picture: "a medium-wide shot on clean white — MOM fills the left third of the frame from her feet to her raised hands, holding up the top of THE ENDLESS CHECKLIST; the chart unrolls toward the camera and away to the right in one long curve across the floor, every circle starred but the last.",
    framing: "Medium-wide shot at eye level on a clean white background: MOM stands in the left third, large, holding up the top of THE ENDLESS CHECKLIST; the chart drops to the floor, curves toward the camera across the lower frame and runs away to the right edge and beyond.",
    check: "medium-wide shot; MOM large in the left third; THE ENDLESS CHECKLIST curving across the whole lower frame; clean white background with one thin floor line; nothing else." });
  F("S16", { shotSize: "WIDE", angle: "HIGH",
    picture: "a high shot from above the top of THE HILL OF TOYS — DAUGHTER sits on its top big in the right foreground, absorbed in THE TABLET; far below at the foot of the hill at the left, MOM looks up, small, holding THE PARENTING BOOK; the rug and floor spread out around the hill's base.",
    framing: "High shot from just above the top of THE HILL OF TOYS, looking down its steep slope: DAUGHTER sits on the flat top, big in the right foreground; the slope of toys falls away toward the lower left, where MOM stands small at the foot of the hill looking up; the round rug and the floor spread out far below around the base.",
    map: "left — MOM small at the foot of the hill, looking up, holding THE PARENTING BOOK; centre — the steep slope of toys falling away; right — DAUGHTER on the top, big in the foreground, with THE TABLET.",
    check: "high shot looking down the hill; DAUGHTER big on the top at the right; MOM small far below at the left; THE HILL OF TOYS of recognisable toys; warm off-white walls." });


  // ── Round 3, after the second test render: S1 came out tilted with DAUGHTER floating (a steep "look up" tilts the room);
  //    S2's close crop drew the bodies as white shapes; the little desk read as a tub. Everything else passed.
  F("S1", { shotSize: "MEDIUM", angle: "EYE",
    picture: "a medium shot with the camera at DAUGHTER's height and a level, straight horizon — DAUGHTER stands large in the right half, both feet on the floor, stretching both arms up toward THE TABLET on the high shelf, which sits near the top edge of the frame, far above her hands; the sofa's armrest enters at the left edge.",
    framing: "Medium shot with the camera at DAUGHTER's height, horizon level and walls perfectly upright: DAUGHTER stands large in the right half of the frame, seen from the side, from her feet to her raised hands; the high shelf with THE TABLET sits near the top edge above her, far out of reach; the round armrest of the sofa enters at the left edge; the lower corner of the window on the back wall.",
    action: "DAUGHTER stands with both feet on the floor and stretches both arms straight up toward THE TABLET, mitten hands open, a long gap of plain wall between her hands and the shelf, and looks back over her shoulder toward the left as if calling someone; THE TABLET stands alone on the shelf, touching nothing but the shelf.",
    check: "medium shot, camera at child height, horizon level, walls upright; DAUGHTER large in the right half with both feet on the floor; THE TABLET on the high shelf near the top edge, far above her hands; warm off-white walls; no other people." });
  F("S2", { performance: "MOM: eyebrows level and soft, pupils on DAUGHTER's eyes, mouth a gentle firm flat line; one open palm raised low. DAUGHTER: eyebrows lifted hopefully, pupils on MOM, mouth a small open oval; one hand half raised toward the shelf. Below their heads only thin black line necks and arms show, exactly as in the references — no shoulders or bodies drawn as white shapes. MOM looks at DAUGHTER; DAUGHTER looks back at her.",
    check: "close two-shot at eye level; MOM's head at the left, DAUGHTER's head at the right, faces at the same height; below the heads only thin black line necks and arms; THE TABLET small on the shelf corner at the top right." });



  // ── Round 4: natural angles only, and more close-ups (Muhammad) ──
  F("S7", { picture: "a wide shot from a little above head height into the purple living room — DAUGHTER stamps on the rug at the right, filling a third of the frame height, head thrown back; MOM kneels at the left, rocking back; the sofa at the left and the shelf with THE TABLET at the upper right.",
    framing: "Wide shot from a little above head height, the whole room graded storm purple: the sofa at the left, the high shelf with THE TABLET at the upper right; MOM kneels on the rug at the left, rocking back; DAUGHTER stamps on the rug at the right, her head thrown back.",
    check: "wide shot from a little above head height, horizon level; the whole room storm purple; MOM at the left, DAUGHTER stamping at the right; THE TABLET on the shelf at the upper right." });
  F("S9", { shotSize: "CLOSE", angle: "EYE", cam: null,
    picture: "a close shot at a small child's height in the purple living room — DAUGHTER lies on the rug, her wailing face and both pounding fists filling most of the frame, her kicking feet behind; THE TOY DINOSAUR tumbles away at the right edge; MOM's raised mitten hands enter at the left edge.",
    framing: "Close shot with the camera at a small child's height, level horizon, the room graded storm purple: DAUGHTER lies on her back on the rug, her head, wailing face and both pounding fists filling most of the frame, her kicking feet behind them; THE TOY DINOSAUR tumbles through the air at the right edge; MOM's two raised mitten hands enter at the left edge.",
    map: "left — MOM's raised hands entering the frame; centre — DAUGHTER's wailing face and pounding fists, close; right — THE TOY DINOSAUR tumbling away.",
    check: "close shot at child height, horizon level; DAUGHTER's face and fists fill most of the frame and stay white; the room storm purple; THE TOY DINOSAUR at the right edge; only MOM's hands at the left." });
  F("S16", { shotSize: "WIDE", angle: "HIGH",
    picture: "a wide shot from a little above head height in the living room — THE HILL OF TOYS rises in the middle, twice MOM's height; DAUGHTER sits on its top at the right with THE TABLET; MOM stands small at its foot at the left, looking up, holding THE PARENTING BOOK; the shelf at the upper right is empty.",
    framing: "Wide shot from a little above head height, the living room from the front: THE HILL OF TOYS rises from the rug in the middle; DAUGHTER sits on its flat top toward the right; MOM stands at its foot on the left looking up; the empty high shelf at the upper right; the sofa at the far left.",
    map: "left — MOM at the foot of the hill, looking up, holding THE PARENTING BOOK; centre — THE HILL OF TOYS; right — DAUGHTER on the top with THE TABLET, the empty shelf above.",
    check: "wide shot from a little above head height, horizon level; THE HILL OF TOYS of recognisable toys in the middle; MOM at its foot at the left, DAUGHTER on top at the right; the shelf empty; warm off-white walls." });

  // camera presets (proven wording from CAMERA_LIB) for the cold open
  for (const [r, c] of Object.entries({ S1: "CHILD_EYE", S2: "CLOSE_TWO", S5: "OTS", S6: "OTS", S7: "SLIGHTLY_ABOVE", S8: "CHILD_EYE", S10: "CHILD_EYE", S16: "SLIGHTLY_ABOVE" })) F(r, { cam: c });
  // the two new cold-open sequences
  const B = r => ({ ref: r, type: "base" }), Ed = (r, from) => ({ ref: r, type: "edit", from });
  const mk = (id, title, base, imgs) => ({ id, title, base, images: imgs.map((im, k) => ({ i: k + 1, ...im })) });
  api.SEQ.push(mk("Q25", "Your child asks for the iPad", "S1, S2 and S3 bases — generate them now (S1 first: it is the living-room master)", [B("S1"), B("S2"), Ed("S2", "image 2"), B("S3")]));
  api.SEQ.push(mk("Q26", "The score keeps rising", "S13 first (kitchen master), then S14 and S15", [B("S13"), B("S14"), B("S15"), Ed("S15", "image 3")]));
  // the cold open keeps Delivery 2's camera plan after the film-wide camera pass
  api.afterFinal = () => { const M = { S1: ["TILT_UP", "", "tilt from her reaching hands up to the tablet"], S2: ["PUSH_IN", "no", "slow push in on the two faces"], S3: ["SHAKE", "scream", "two-frame jolt"], S4: ["HOLD", "", "hold — calm"], S5: ["PUSH_IN", "", "slow push toward the cushion"], S6: ["PUSH_IN", "", "slow push toward the bubble"], S7: ["SHAKE", "louder", "hard two-frame shake"], S8: ["PAN_RIGHT", "", "pan from MOM to DAUGHTER"], S9: ["SNAP_ZOOM", "floor", "snap onto her as she hits the rug"], S10: ["TILT_UP", "", "tilt up the clock to the sagging hand"], S11: ["SNAP_ZOOM", "iPad", "snap in on the hand-over"], S12: ["HOLD", "", "hold on her eyes"], S13: ["PAN_LEFT", "", "pan to the star"], S14: ["HOLD", "", "hold on the chart"], S15: ["PULL_OUT", "", "pull out along the chart"], S16: ["TILT_UP", "", "tilt up the hill"] };
    for (const [r, m] of Object.entries(M)) { const b = by(r); b.move = { type: m[0], on: m[1], note: m[2] }; api.changed.add(r); } };
};
