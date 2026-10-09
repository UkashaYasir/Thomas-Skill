# Colour direction — superseded by v19

> **Superseded by v19 — see `style-and-colour-v19.md`** (background, colour, outline places, prompt phrasing) and
> `v19-principles.md` §1. This file now keeps only (a) the parts of the old colour system that still hold, rewritten to
> agree with v19, and (b) the history of how the direction got here, clearly labelled as history. The old six mood
> palettes for rooms, the per-room colour script, "simple never means white", the colour shares and the colour run
> limits are retired. Nothing in this file that disagrees with v19 is an instruction.

> "Colour is not simply decoration. Colour controls attention and emotion. If everything has the
> same colour intensity, the eye does not immediately know where to look." — Thomas, Video 3 review

## 1. The v19 colour rule (the law is `v19-principles.md` §1; the detail is `style-and-colour-v19.md`)
- Thomas, 5 Oct 2026: "White or very light neutral backgrounds as the default." The default mood is **CLEAN** (a very
  light neutral ground, places drawn as outlines, one colour element). **WHITE** (pure white) is for face-only frames,
  object-only frames, word frames and deliberate white breaks.
- "Only the important object or emotional element should carry strong color." Every frame names its one colour element
  (`ce`: an object, a part of an object, or "none" when the face carries the frame). "If the phone is important, let the
  phone stand out. If the face is important, keep almost everything else neutral."
- "Background environments can often be shown only with simple outlines"; "do not fully color every object just because
  it exists in the scene." Places, furniture and secondary objects are thin soft-grey outlines with white fill —
  complete, closed line drawings. Never a tinted wall, a coloured room or coloured furniture.
- Full-colour fields stay only "for emotional peaks and night scenes" (**PEAK** with `pk: true`, and **NIGHT**), and they
  stay rare — "full-screen color" is on Thomas's "Less" list. A full-colour field never sits behind a face close-up.
- Characters are seen first: white characters with bold black outlines; set pieces in thinner, softer lines that never
  compete.
- Red stays for danger only.

## 2. What still holds from the old system (rewritten for v19)

### The order inside every frame
1. **Characters and faces** — white fill, bold black outline. The eye lands here first.
2. **The one colour element** — the hero object, or the one part of it that matters, in a strong, saturated colour that
   nothing else in the frame shares.
3. **The place** — thin soft-grey outlines with white fill on the very light neutral ground, or nothing at all.
4. **Everything else** — uncoloured: black or soft-grey line on white.
If the face is the hero, nothing carries colour: the white face with its bold black outline carries the frame.
Thomas, Video 4 brief, still true: *"Not every second needs to be extremely colourful. I specifically do not want
that."* And: *"the goal is not more detail and not simply more colours. The goal is: better colour selection, stronger
contrast, clearer eye guidance, and more variety between scenes."* In v19 the variety comes from camera distance,
faces, contrast and interrupts (`camera-and-closeups-v19.md`, `humour-text-contrast-v19.md`), not from tinting rooms.

### Red means danger
Strong red (DANGER_RED #D32F2F) belongs only to danger, warning or negative pressure — the warning light, the red
correcting pen, the "danger" half of a safe-vs-danger split. Other important objects use other strong colours. Scan
every build for red on a non-danger object.

### Hero colours (accents)
Saturated, flat, clearly stronger than anything around them. Lock one per recurring object in its PROP entry and keep it
for the whole video. These are seed values; a new object may take a new hue if it keeps the rules above.

| Name | Hex | Good for |
|---|---|---|
| amber | #F2A900 | phones, keys, a spine object |
| sunflower | #FFC928 | good news, warmth on a NIGHT field |
| teal | #00A6A0 | calm, balance |
| cobalt | #2F6FE0 | school objects, structure |
| sky blue | #1FA3E0 | freedom, open possibility |
| raspberry | #E5457F | a gift, a child's toy |
| safe green | #2FAE5A | safe, allowed, the "safe" half of a split |
| orange | #F07A10 | attention, energy |
| violet | #7B4FD6 | mystery, the inner world |
| DANGER_RED | #D32F2F | danger, warning, negative pressure — nothing else |

Pairing: on CLEAN and WHITE frames any strong accent stands out. On a PEAK or NIGHT field the hero's hue sits far from
the field's hue (amber or sunflower on navy; cobalt or teal on orange). Never an amber phone on an apricot field, a
green toy on a green field.

### Full-colour fields — PEAK, NIGHT and MEMORY only
The old moods' full-voice "field" colours survive only as starting values for a chapter's emotional peak colour. The live
values sit in the compiler (`assets/compiler-v19/`); when to use them is decided in `style-and-colour-v19.md`.

| v19 mood | Use | Compiler default (5 Oct) | Other starting values (from the old palettes) |
|---|---|---|---|
| PEAK | an emotional-peak frame (`pk: true`), in the chapter's emotional colour | storm violet #9C86C0 (outlines #7E68A6); SUNNY variant lemon yellow #F5E77E | apricot #F6BE7E · strong orange #F08A3A · steel blue #8EA8C6 · lavender #B7A3D8 · cornflower #9AAEF4 |
| NIGHT | night scenes (old DARK) — Thomas: "dark blue/grey night scenes work well" | night navy #2C384E (outlines #5A677D) | storm navy #2A3446 · deep slate #3F4B5E |
| MEMORY | the past (old ICY): a faded light grey, only the story object coloured | #DDE1E7 (outlines #B8BFCA) | #EEF0F3 |

On a PEAK or NIGHT field the set pieces are darker tonal outlines of the field colour, faces stay white and readable,
and hair stays solid black. No gradients, glows or vignettes: one even flat field from edge to edge.

### Prompt-writing consequences
- The compiler writes a per-frame colour block from the frame's mood and its colour element, phrased positively: "The
  background is …", "The only coloured element in the whole image is … (hex); everything else is black or soft-grey line
  on white." Don't restate colour inside the action text except for the colour element and deliberate story colour
  (a red pen).
- Describe the colour element by name and hex every time; a colour name alone drifts between generations.
- Never write quota language ("at least three areas of colour", "the room itself must carry colour").

## 3. Self-check — the colour pass (v19)
Per frame:
1. What should the viewer feel here? (Emotion before decoration.)
2. Which one element carries colour — or is it a face frame where nothing does?
3. Is the place only outlines (thin, soft grey, white fill), or nothing?
4. Are the characters seen first?
5. Is anything red? Is it danger?
6. Is this frame a full-colour field? Then is it a planned emotional peak (`pk: true`) or night — and not behind a face
   close-up?
Across the film:
- Colour arrives where it means something: the colour elements, the peaks, the night. Never to fill space.
- The white default never feels pale or flat, because camera distance, faces, contrast and interrupts keep changing.

## 4. History — how the colour direction got here (not instructions)
- **Video 1:** Thomas asked for "predominantly white backgrounds, black/white, colour only with purpose." Colour on the
  important object (the laundry basket) was right; the seven multi-coloured cards were too busy.
- **Video 2:** our rule forced "at least three large areas of solid colour" into every frame and the environment palette
  reused the props' hues → whole scenes in one colour: an all-brown kitchen, an all-green garden. He flagged both.
- **Video 3 first pass:** we overcorrected to "environment black / white / pale grey only." Result: lots of beige, pale
  green, grey and soft pastel at the same strength — *"even though the locations are different, the overall visual
  feeling often remains very similar… the image can still feel empty or monotonous… several scenes in the middle with
  white or very pale backgrounds — this is where we lose visual energy."* He praised the orange scene at 2:20 and the
  dark storm scene because each had its own mood.
- **Video 4 brief:** *"Plan the colours before creating the scenes. Backgrounds simple and clean, while the characters
  and important objects stand out clearly. Not flat, pale or tired. Important objects brighter and more saturated. The
  dominant colour feeling should change naturally throughout the story."*
- **Video 4 review:** *"Neutral first. Color with purpose. Never color just to fill empty space."* The skill read
  "neutral" as tinted and beige rooms; that reading is what Thomas rejected on 5 Oct 2026.
- **v18.2 (Oct 3, Seven Things):** to keep white characters visible we put a soft tint on every room's wall with tonal
  furniture in the same hue. On screen this became rooms "completely built around one color tone, especially blue,
  beige, or green" — Thomas's first point on 5 Oct.
- **5 Oct 2026 (v19):** white or very light neutral by default, outlines for places, colour only on the important object
  or emotional element, full colour for peaks and night. The Video 3 "pale middle" risk is now answered by camera,
  faces, contrast and interrupts, not by colouring rooms.

### Old failure table (history, with the v19 answer)
| What we did | What Thomas saw | v19 answer |
|---|---|---|
| Wall, table, chairs, sofa all soft beige at the same strength (Video 3) | "no clear visual focus… feels empty or monotonous" | outline places on a very light neutral ground, one strong colour element, faces seen first |
| Environment coloured in the prop's hue (Video 2) | an all-brown kitchen, an all-green garden | no coloured environment at all; the colour lives on the one element |
| Every frame white or near-white with nothing happening (Video 3 middle) | "this is where we lose visual energy" | keep the white ground; change the camera distance, push the faces, add contrast and pattern interrupts |
| Seven cards in seven colours (Video 1) | "visually busy… we need visual hierarchy" | one colour element, everything else neutral |
| A red object that wasn't dangerous | red stops meaning warning | DANGER_RED only on danger |
| Forced "three large areas of solid colour" wording | whole scenes in one saturated colour | never write quota language; the colour block names exactly what is coloured |
| A tinted wall per room with tonal furniture (v18.2, Seven Things) | "completely built around one color tone, especially blue, beige, or green" | no tinted walls, no coloured furniture: outlines with white fill |
