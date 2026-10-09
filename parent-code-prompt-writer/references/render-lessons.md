# Render lessons (v17–v18) — what the image generator follows, proven on test renders

> **v25 — lookup only.** `v24-standard.md` and `RULES-CARD.md` win over everything below, then `v19-principles.md`.
> Where this file says otherwise, the current rule is: the CLEAN ground is the clean warm white #F7F6F3 and set pieces
> are thin **black** ink lines with white fill (never soft grey), the fewest the frame needs; the colour focus is bright;
> at most two coloured objects (`ce`, `ce2`); colour by meaning (red = conflict, frustration, stress, danger; phones
> purple); white by default, and an intense line turns the whole stage to its emotion's colour (`pc`, `v24-standard.md`
> §2a); words are short, playful and hand-lettered **inside the frame's own image prompt** — never added in Premiere,
> never numbers or titles; drawn glow and action marks are allowed; "larger heads" means sudden close-ups.

> **v19:** the lessons still hold; the "Rule now" column has been brought up to v19 where the old rule was a tinted-room
> rule. Background, colour and outline places: `style-and-colour-v19.md`. Close-ups: `camera-and-closeups-v19.md`.

| Lesson | Evidence | Rule now |
| --- | --- | --- |
| Angle names alone are ignored; steep up/down views tilt the room and float the characters | S1 tilted twice | Use only the camera presets below; describe what the camera sees; horizon always level |
| Small figures in big rooms cost the most points | 8 of 16 cold-open frames, round 1 | THE PICTURE line states how much of the frame each character fills ("fills the right half from her feet to her raised hands", "cropped at the knees") |
| Close crops drew white blobs below the heads | S2 | Automatic line on close/over-the-shoulder prompts: only thin line necks and arms below the heads |
| Coloured walls tinted faces skin-coloured | S3 | v19 has no coloured walls on CLEAN frames; on PEAK and NIGHT fields an automatic line keeps faces pure white and only the field carries the colour |
| Warm rooms slid to peach | S10 | v19 has no warm rooms; PEAK fields state their colour exactly, never drifting to peach or orange |
| Same staging three times reads as one picture | S2, S5, S7 | Neighbouring frames in one place change size or angle |
| Heaps read as rubble; unusual furniture is misread | hill of toys, school desk | Objects are named recognisable things with the few structural details that make them that thing, and standard shapes |
| A fixed room layout with a master image keeps rooms stable | living room, rounds 1–3 | Every place has one layout (left · centre · right) of outline cues; a master, when used, is a minimal outline drawing |
| "Final check" wording reads as a hidden instruction | skill QA | Close with THE PICTURE IN SHORT — a plain description |
| Muhammad: close-ups wanted, no weird angles | Oct 2026 | Close-ups wherever the emotion calls for them (Thomas, 5 Oct: "Bring the camera closer"), each one making sense — a reason, the place known, the gaze matched, the head whole; natural angles only |
| White characters vanish on white; strong rooms steal the eye (v18.2) | Seven Things test renders, Oct 2026 | v18.2 tinted the wall behind the characters — Thomas rejected the result on 5 Oct ("completely built around one color tone"). v24: bold black character outlines on the clean warm white (#F7F6F3), set pieces in thinner black ink outlines with white fill, nothing white-filled overlapping a character's outline; pure white for face-only, object-only and word frames |
| Warm materials render stronger than written | honey floor #D2A26C came out #D99B46 and swallowed the tangerine jar lid; a straw wall came out mustard | Keep large areas cool or clean near an orange spine object; no wood, honey, mustard or peach behind it |
| "Counter" becomes a sink, taps and cabinets; listed furniture fills every frame | Seven Things kitchen renders | No automatic anchor piece; a piece appears only when the frame names it; counters described as a flat top on a plain block |
| An attached room master copies its furniture into every later frame | Seven Things, Versions 3–5 | Minimal outline masters; the room reference draws only the pieces the setting names |
| Two hands entering from opposite side edges render as long cables | S7 (jar held in both hands) | Hands rise from the bottom edge, or the bottom corners for two people |
| A child alone in a medium shot reads as the teenager | S5 (memory) | Give a size cue: the bed at his shoulder height, the object big in his arms |

## Camera presets (natural angles only)
CHILD_EYE — camera at a small child's height, level horizon, upright walls; high things near the top edge.
SLIGHTLY_ABOVE — a little above head height, looking gently down; never a ceiling view.
OTS — over the shoulder: the near character's head and shoulder big in the foreground.
CLOSE_TWO — close two-shot, both faces at the same height.
Eye level is the default. No floor cameras, no ceiling cameras, no top-of-object views, no tilted rooms.

## Prompt structure (keep the full length; make every sentence agree with the shot)
1 THE PICTURE (shot + angle + who is where + size) → 2 camera, PLACEMENT left to right → 3 action (+ the interaction clause, b.touch) → performance → objects → setting + ROOM MASTER / ROOM REFERENCE → construction (close crops get the thin-body line) → colour (+ UNCOLOURED OBJECTS line when b.plain is set) → style and text locks → avoid list → 12 THE PICTURE IN SHORT.
Edits: one change, from what to what, ≥ 180 characters, a "stays exactly as" sentence, only names in the frame, cue word from the line, no finger/anatomy words, mouths as shapes never quoted letters.

## Tools
v19: assets/compiler-v24/ (README: keys, moods, shot types, checks) and the v19 scripts in scripts/. Legacy below.
assets/build-template.jsx is the v19 worked example; the old "Seven Things" build is assets/legacy/build-template-v18-seven-things.jsx and assets/legacy/compiler-v18_3/ holds the parts that rebuild it byte-for-byte (template, assemble.cjs, dicts.cjs, segs/). The Video 05 build is kept as assets/build-template-video05.jsx.
assets/legacy/compiler-r13/ holds the part files that built it (transform.cjs driver; seg04.cjs has the api.P helper that writes THE PICTURE, framing, placement and THE PICTURE IN SHORT from one left-centre-right spec; seg08/seg09 show a creative pass).
scripts/copy-page.cjs (ONLY=S1-S16 prints a range; shows room masters, sequences, edit-only lines and keywords) and scripts/edit-page.cjs (edits and sequence images in order, each saying which image to open).
Checks: qa.cjs (skill), qa-render-risk.cjs (steep wording, sizes, presets, repeated staging, locks, close-up share), qa-sequences-colour.cjs (sequences, edit-only frames, camera, key lines, quoted letters), qa-colour-v17.cjs (white space, contrast, variety, keywords), qa-consistency.cjs (v18.2: white close-ups, white wording, room dress, texture, hands, object focus, hidden objects, colour words in placement, cast, chairs).
