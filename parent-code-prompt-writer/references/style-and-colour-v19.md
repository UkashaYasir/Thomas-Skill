# Style and colour — v25 (the clean white stage, the colour focus, line places, the intensity ladder)

Updated to v24 on 9 Oct 2026 (the file keeps its v19 name so every link still works). Thomas's words behind each rule are
in `references/v24-standard.md` §2–§3 and `references/client-feedback-ledger.md`; where an older file says otherwise
about backgrounds or colour (tinted walls, coloured furniture or floors, soft-grey outlines, calm-toned focus objects,
"one colour element" in its everyday tone, red for danger only), this file and v24-standard.md win.

Every list below is a set of seed examples plus the method for making new ones. When a script needs a place, a colour
or a sentence that is not listed, make it with the method and add it here after the video.

---

## 0. The look in one paragraph

White characters with bold black outlines stand on the clean white stage of Video 08 — "The clean white background is
very good and should stay" (Thomas). The place is shown by the fewest thin black line drawings with white fill that say
where we are — one door, one bed, one window — and only the ones the moment needs ("If an element doesn't contribute to
the story, emotion, or visual understanding, simply remove it"). The important object carries **bright, vivid colour by
meaning** ("Use stronger, brighter, and more vibrant colors on important objects to bring the scenes to life"); a second
object is coloured only when the moment needs both; everything else is black line. Full-colour fields stay for marked
emotional peaks and night. The viewer sees the characters and their faces first, then the bright object, and the place
last — "Color should guide the viewer's attention toward the characters and important objects."

What Thomas rejected, so it never comes back:
- "Too many scenes are still completely built around one color tone… When the wall, floor, furniture, and surrounding
  objects all have similar colors, the frame becomes flat and repetitive" (5 Oct).
- Coloured grounds, fridges, windows, trees and grass in Video 08: "the ground does not also need to be colored. It is too
  much"; "black and white is enough for those elements"; "too much green" (8–9 Oct).
- Dull colours on the important objects: "too dry and slightly boring" (8 Oct).

---

## 1. The five moods

The mood is the frame's background treatment. It is chosen after the feeling, the idea and the camera
(references/shot-plan-v19.md §1), never first.

| Mood | Ground | What it is for | Places are drawn as | Colour |
|---|---|---|---|---|
| **CLEAN** (default) | the clean white of Video 08: `CLEAN_GROUND` #F7F6F3, a very light warm white, flat and even | every frame that is not one of the others: story moments, explanation, interaction, reactions that keep a place cue | thin black ink lines (#2B2B2B) with white fill, thinner than the characters' outlines; wider shots get one thin ground line, never a filled floor | the focus, bright (calm with `cm`); `ce2` only when needed; or none |
| **WHITE** | pure white (#FFFFFF), nothing behind | face-only frames (large face, eyes-only), object-only frames, WORD frames, deliberate white breaks; FACE_HANDS and REACTION frames that draw no place | nothing — no line, no ground line | the focus, or none (the face carries it) |
| **PEAK** | one flat, even full-colour field in the emotion's colour (`pc`: RED, YELLOW, BLUE, GREEN, VIOLET, GREY) | the wider frames of a line that carries the emotional intensity (`pk: true`) — the intensity ladder, `v24-standard.md` §2a | solid darker shapes of the field colour | the field is the colour; an object adds colour only in a clearly different hue — in the field's own hue it is drawn white |
| **NIGHT** | one flat night-navy field | scenes that happen at night | solid slate-navy shapes | the screen's light (purple, with drawn rays), a warm lamp, or the story object |
| **MEMORY** | a faded, very light warm paper ground | scenes in the past (a parent's own childhood, an earlier moment remembered) | faded warm-grey lines | only the story object keeps its colour |

An absence frame (`mu`) is CLEAN drained on purpose: a very light cool grey ground, the pieces in quiet cool grey-blue,
every object black line except the colour focus in its calm tone — the grey atmosphere Thomas approved for the absent
parent. The exact hex values live in the compiler's MOOD table (assets/compiler-v24/). Old mood names still compile as
aliases (BRIGHT, WARM, EVENING, COOL, DUSK, NEUTRAL, ACCENT → CLEAN; TENSE, SUNNY → PEAK; DARK → NIGHT; ICY → MEMORY).

### 1.1 CLEAN — the default
- Use it unless the frame is face-only, object-only, a word frame or a white break (WHITE), part of a marked peak scene
  (PEAK), at night (NIGHT) or in the past (MEMORY).
- Nothing in a CLEAN frame is tinted: no wall colour, no floor or grass colour, no coloured furniture, no soft colour patch
  behind the characters. The ground is the clean warm white, a hair below pure white; that step is what keeps white
  heads and mittens readable (§4).
- A CLEAN frame may draw no place at all (a medium figure with one ground line) when the place is already known or does
  not matter.

### 1.2 WHITE — pure white
- **Face-only**: a large face or an eyes-only crop. "Sometimes a large face on a white background is much stronger than a
  complete room." Nothing is drawn behind the face, and the frame's own text names no room part (no door, table, bed or
  stair), so the generator does not add one. This is where the sudden close-ups land (v24-standard.md §5).
- **Object-only**: the story object alone, large, bright, with its bold black outline.
- **WORD frame**: pure white with the word hand-lettered into it (or one small object the plan names) — generated like any
  other frame, never an empty frame with the word added later (Muhammad, 9 Oct).
- **White break**: a deliberate cut into white after place frames — Thomas's "suddenly white background". Every chapter
  balances white moments with place moments ("the balance between minimal white scenes and environmental scenes").
- **FACE_HANDS and REACTION** frames go WHITE when they draw nothing of the place, CLEAN when they keep a line cue.
- Hands-only inserts and frames with small figures stay CLEAN: white mittens and small white heads need the warm-white
  step to separate from the ground.

### 1.3 PEAK — the colour stage of an intense line (v25 — `v24-standard.md` §2a)
- "Full coloured scenes stay for emotional peaks and night scenes" (the summary Thomas approved); "Neutral first. Color
  with purpose." Muhammad, 9 Oct: white is the default, and "whenever a scene… shows the emotion intensity and the overall
  scenario, we convert to colours" — minimal, never monotonous. So PEAK is earned by the line, never decoration: every
  line that carries the intensity (the fight, the breaking point, the aha, the breakthrough, the screen taking over, the
  emptiness) converts the stage, and the film returns to white after it.
- A PEAK frame carries `pk: true` and names its emotion colour with `pc` (RED, YELLOW, BLUE, GREEN, VIOLET, GREY — which
  also sets the mood); a PEAK mood without `pk` fails the checks, one without `pc` is listed.
- PEAK colours the wider frames of the moment — the scenario. A full-colour field never sits behind a face close-up: the
  close-up goes WHITE, and the jump from the field to white is itself the contrast.
- The field is one flat, even colour; pieces are solid darker shapes of the same hue; characters stay pure white; an
  object, mark or word in the field's own hue is drawn white (words black on a light field) — the compiler does it.
- The colour follows the emotion, one meaning for the whole video — not the chapter (replaces "each chapter's peak colour
  differs" and "never a red field": the fight takes red). Still no peach, orange or mustard field: warm colours render
  stronger than written and swallow warm objects (render-lessons.md); warmth is a warm light shape on white.
- One moment keeps one field colour; more than about five colour frames in a row lose the shock.

### 1.4 NIGHT — the night scenes
- For scenes that happen at night. "The darker atmosphere works well" (Thomas, Video 08, 01:40); "dark blue/grey night
  scenes work well" (Video 4).
- NIGHT is for the time of day, not for sadness in general. A heavy moment in daylight is CLEAN (or PEAK at the peak).
- Face close-ups inside a night scene go WHITE; the next wider frame brings the night back. A hands-only insert may stay
  NIGHT: white mittens read strongly on navy.
- At night a phone's screen is the light in the room: a bright light-purple panel ringed by drawn strokes, its flat
  wedge of pale purple light across the nearest face and hands ("Make the smartphone glow more noticeable"). Otherwise the
  colour is a warm lamp or the story object, in a hue far from navy.

### 1.5 MEMORY — the past
- For scenes in the past. The faded ground says "this was then"; the story object keeps its colour so it links past and
  present. Close-ups inside a memory may stay MEMORY.
- A jump forward in time ("years later") is not a memory: it stays CLEAN, and the change shows in the characters (age,
  height) and the anchor object.

---

## 2. The CLEAN ground

- `CLEAN_GROUND` is one compiler constant: **#F7F6F3, the clean warm white Video 08 was approved on**. Do not change it
  without a test render and Thomas's word.
- Other values stay available for a test (`CLEAN_GROUND=#FFFFFF node assemble.cjs …`): #FFFFFF pure white, #F4F2EE a
  touch warmer, #F2F4F5 very light cool. Pure white everywhere risks the white characters fading into the page
  (Thomas, 3 Oct: "they partly disappear against very light or white backgrounds").
- Prompts never name the ground by any other colour word than the one the constant prints.

---

## 3. Places as line pieces

### 3.1 What a line piece is
A line piece is one set piece that tells the viewer where we are, drawn **only as a thin black ink line with white fill:
a complete, closed line drawing, not a coloured object** — "simple with black outlines on a white background" (Thomas).
It is finished (legs to the floor, every edge closed), thinner than the characters' bold outlines, with no colour, no
texture and no small parts. "Line" never means half-drawn, sketched or implied.

### 3.2 Establishing a place with the fewest pieces
- Ask: what is the single shape that makes this place obvious? Draw that. Add a second piece only when the action uses it
  (a chair someone sits on, a counter someone leans on) — and ask of every piece: does it tell the story, carry the
  emotion, make the moment understandable, or carry the humour, symbol or contrast the frame is built on? If not, cut it.
- A piece appears only when the frame names it — no automatic anchor furniture, no room master copying furniture.
- Once the place is known, the next frames may drop it (a face on WHITE, a CLEAN medium with only a ground line).

Seed pieces (open: add new places with the same question):

| Place | The piece that says it | A second piece only if the action uses it |
|---|---|---|
| Kitchen | the edge of the table, or the counter as a flat top on a plain block | one chair per person sitting; one window outline to say "home" (Video 08: no fridge, no cabinets) |
| Hall / front door | the front door frame | the bottom stair |
| Teen's bedroom | the bed (frame, one pillow, one blanket) | the door frame, the desk |
| Living room | the sofa | the doorway |
| Landing | the bedroom door, half open | the stair rail |
| Office | the desk with a monitor | one framed certificate on the wall |
| School gate / sideline | the gate posts, or one goal frame | a bench |
| Park path | the path as two thin lines | a bench (Video 08: no tree, no grass colour) |
| Campfire / outdoors | the one rock or log they sit on | — (Video 08: the ground stays plain) |
| Car | the curve of the seat back and the window line | the seat belt |
| Doorway as a place in itself | two upright lines and a top line | the door edge |

Method for a new place: name the place → list what a viewer would recognise it by → keep the one shape that cannot be
anything else → check that it can be drawn as a closed line with no small parts (a counter, not a sink with taps) → add a
second piece only if a character touches it.

### 3.3 Ground line
Wider shots (WIDE, MEDWIDE, often MEDIUM) get one thin ground line so the figures stand on something. It is a line, never
a filled floor, lawn or sand. Close shots usually need none.

### 3.4 Keeping lines thin
- Line order: characters and story objects in the bold black outline; set pieces and the ground line in a thin black ink
  line. The background never shares the character line.
- Set pieces never overlap a character's outline with their white fill; a seated body's line sits in front of the chair.
- No room dress: pictures, posters, rugs, plants, lamps that do nothing, skirting, tiles, planks, appliances. If removing a
  piece makes the idea clearer, remove it.

---

## 4. Keeping white characters readable

Thomas, 3 Oct: "first I see the characters and their emotion, then the main action or object, and only after that the
background." Thomas, 9 Oct: "Avoid showing characters too small or too far away. Facial expressions and emotions must be
immediately recognizable."

1. **The ground**: CLEAN's warm white sits a hair below pure white, so white heads, mittens and white-filled pieces
   separate from it.
2. **Bold black character outlines** against thin black background lines (§3.4).
3. **Size**: emotion is shown large — WIDE only where distance or place is the point, and even then every face reads;
   MEDWIDE is the usual full-figure shot; sudden close-ups grab attention.
4. **Pure white only where the subject is large** (face-only, object-only, a word) or for a white break.
5. **Nothing white overlaps a character's outline.**
6. **The bright colour sits near the action**: it pulls the eye to the face or the hands, never to a corner.
7. **Faces stay pure white** in every mood; colour never tints a head.

---

## 5. The colour focus

### 5.1 The rule
"Only the important object or emotional element should carry strong color. If the phone is important, let the phone
stand out." "Use stronger, brighter, and more vibrant colors on important objects to bring the scenes to life." Each frame
names its colour focus in the plan field `ce`:
- a PROP key — the object in its **bright** tone (`ce: "PHONE"`); if the prop defines a coloured part, only that part;
- a PROP key followed by the part in plain words (`ce: "TEST circle"`);
- `"none"` — nothing carries colour; the white face carries the frame (or drawn marks `mk` / a light shape `li` carry
  the feeling, §5.4).
`cm: true` keeps the focus in its calm tone for a deliberately quiet beat (sadness, absence, a held moment).
`ce2` names a second coloured object only when the moment needs both (the phone and the F in one argument), in its own
clear colour, quieter than the focus. Every other object is black line with white fill.

### 5.2 How to choose it
1. **Where must the eye go after the face?** That thing carries the colour. "Nowhere, the face is everything" → `none`.
2. **Is the object the cause of the feeling?** Colour the cause.
3. **Is the object large?** Colour only its telling part, so the colour stays a point, not a field — unless the object
   *is* the moment, drawn two or three times larger.
4. **Two objects matter?** Choose the one this line is about; use `ce2` only if the picture fails without the second.
5. **Does the colour serve the contrast plan?** A stretch of `none` frames makes the next bright object land harder.

### 5.3 One colour, one meaning, all video
| Colour | Means | Typical use |
|---|---|---|
| Yellow | surprise, energy, attention, discovery | the "aha", a surprise entrance, an exaggerated cutaway |
| Red | conflict, frustration, stress, danger | the failed grade, the object of the fight, a warning |
| Blue | trust, safety, calm | the safe moment, reassurance |
| Purple / dark violet | smartphones, digital distraction | every phone and screen, in every video |
| Green | positive development, growth | the step forward, the bike he finally rides |
| Orange / warm amber | fire, warmth, positive highlights | the campfire, the warm accent of a hug or a reward |
| Grey | absence, drained on purpose | the absent parent, waiting (`mu`) |

- Each recurring object keeps one fixed colour for the whole film; its meaning changes through staging, and each return
  gets a new picture. Two story objects never share a colour family.
- Bright means saturated, crisp-edged and high in contrast against the white ("before i was using sort of dull colours",
  Muhammad).

### 5.4 Emotional moments carry colour too
"key objects and emotional moments need stronger, brighter colors" (Thomas). When the feeling has no object: a few drawn
marks at the action (`mk`: red impact strokes where a hand hits the table, yellow surprise strokes), or a flat light
shape (`li`: warm for warmth, cool for loneliness), or — at a line that carries the intensity — the colour stage in the
emotion's colour (PEAK with `pc`, `v24-standard.md` §2a). Marks may sit beside a coloured focus. A glow is drawn (`gl`: a halo
of clean-edged rings, short radiating strokes, or a rainbow burst for real delight), never a soft blur.

### 5.5 What never carries the colour
Walls, floors, grass, furniture, the sky, the ground, a soft patch behind a character, decoration, a generic symbol (a
heart, a star, a trophy, an emoji-style icon). Character accessories keep their small, muted identity colours and never
compete with the focus.

---

## 6. Red

Red means conflict, frustration, stress and danger (Thomas, 8 Oct). It is a focus colour — the failed F, the object of a
fight, red impact strokes in a conflict — and, since v25, the colour stage of the fight's breaking point (`pc: RED`).
Never decoration, never love or warmth.

---

## 7. How prompts phrase colour and absence

Describe what IS there (Google's prompting guidance, R3 §8). The compiler writes these sentences; hand-written frame text
uses the same patterns:
- Background: **"The background is plain very light warm white (#F7F6F3), flat and even from edge to edge."**
- Place: **"… told by this piece: one plain square window with a cross frame, with white fill. Every set piece is a clear,
  complete drawing in thin black ink (#2B2B2B) line… with plain white fill — never coloured, never shaded."**
- Wider shots: **"… with one thin black ink ground line that the figures stand on."**
- Colour: **"THE BRIGHT COLOUR FOCUS in this frame is … — vivid, saturated, crisp-edged and full of life, deliberately the
  brightest colour in the picture… Every other object and every set piece is black line with white fill."**
- Face frames with `ce: "none"`: **"Nothing carries strong colour; the white face… with its bold black outline carries the
  frame."**
- Empty space: **"The space around him is empty, clean ground."** — not "no furniture, no wall, no objects".

Words to keep out of the prompt: colour words for walls, floors, grass or furniture; room words in a face-only WHITE frame;
"suggested", "implied", "sketched", "half-drawn"; soft-light words (glow as a blur, bloom, gradient, shadow); long "no …"
lists outside the AVOID constant.

---

## 8. Before → after (Seven Things, the v19 audit — history)

The v19 fixes of Seven Things, kept as examples of cutting tints and symbols. Their colours (a turquoise phone, calm
tones) predate v24: today the focus would be bright and the phone purple.

| Frame · line | Before | After (v19) |
|---|---|---|
| **S75** · "Your stress becomes my stress." | a sage wall and sage furniture; a stress knot over MOM's head | CLEAN, two layers: MOM gripping her phone, shoulders up; SON at the table outline copying her posture. `ce: "PHONE"`. No knot. |
| **S77** · "They notice the silence between parents." | a sage wall; an empty speech bubble over SON | CLEAN wide, one table outline, a large gap between MOM and DAD; DAD reaches for the salt, MOM slides it over without looking up. |
| **S177** · "Not because your child stopped loving you." | a blue wall and a raspberry heart | CLEAN medium: SON silently sets a mug of tea beside MOM's laptop. `ce: "TEA_MUG"`. |
| **S197** · "I hate you!" | SON's face in front of a full-colour field | WHITE face-only; the wide before it keeps the PEAK colour. |

---

## 9. Quick checks for the writer

Before a frame's prompt is final:
- Is the mood CLEAN unless there is a reason (face-only, object-only, word, white break, `pk: true`, night, the past)?
- Does any wall, floor, grass or furniture carry a colour word? Remove it.
- Is every set piece needed, and is each a complete thin black line drawing with white fill?
- Is the colour focus the thing the eye must go to after the face, and is it bright (or calm on purpose)?
- Is anything else coloured that does not need to be?
- Is red on conflict, frustration, stress or danger only? Is every phone purple?
- Is a face close-up anywhere in front of a full-colour field? Make it WHITE.
- Does this chapter balance white moments with place moments?

## Sources
- Thomas, 3–9 Oct 2026: `references/client-feedback-ledger.md` (A, C–N); v19 sources: SOURCES.md A–G.
- Seven Things measurements: research/R2_build_audit.md; craft research: R3 §4, §8.
- Render lessons on warm colours, small figures and white characters: references/render-lessons.md.
