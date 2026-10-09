# Style and colour — v19 (backgrounds, the one colour element, outline places)

Source: Thomas's messages of 5 Oct 2026 (SOURCES.md A1, A10, A12, A13, A16, B, C, D), his earlier contrast note of 3 Oct
2026, the Seven Things build audit (research R2) and the craft research (R3 §4 and §8). It applies
references/v19-principles.md §1. Where an older file in this skill says otherwise about backgrounds or colour (tinted
walls, one hue per room, coloured furniture, NEUTRAL beige, ACCENT walls, "white is not the default", "never a floating
head"), this file wins.

Every list below is a set of seed examples plus the method for making new ones. When a script needs a place, a colour
element or a sentence that is not listed, make it with the method and add it here after the video.

---

## 0. The look in one paragraph

White characters with bold black outlines stand on a very light neutral ground. The place is shown by the fewest thin,
soft-grey outline drawings that say where we are — "one door outline, one bed outline, one chair, one object is enough"
(Thomas). One thing in the frame carries strong colour: the object or emotional element the moment is about, or nothing
when the face carries the frame. Full-colour fields stay for emotional peaks and night scenes. The viewer sees the
characters and their faces first, then the one coloured element, and the background last. Thomas: "Less: background,
decoration, full-screen color, random props, generic symbols."

What Thomas rejected, so it never comes back: "Too many scenes are still completely built around one color tone,
especially blue, beige, or green. When the wall, floor, furniture, and surrounding objects all have similar colors, the
frame becomes flat and repetitive." Seven Things measured this: almost half of its frames were tinted rooms with coloured
furniture, and only a small share were pure white (SOURCES.md G).

---

## 1. The five moods

The mood is the frame's background treatment. It is chosen after the feeling, the idea and the camera
(references/shot-plan-v19.md §1), never first.

| Mood | Ground | What it is for | Places are drawn as | Colour element |
|---|---|---|---|---|
| **CLEAN** (default) | a very light neutral ground, flat and even (the constant CLEAN_GROUND, §2) | every frame that is not one of the others: story moments, explanation, interaction, reactions that keep a place cue | thin soft-grey outlines with white fill; wider shots get one thin soft-grey ground line instead of a filled floor | one element, or "none" |
| **WHITE** | pure white (#FFFFFF), nothing behind | face-only frames (large face, eyes-only), object-only frames, WORD frames, deliberate white breaks; FACE_HANDS and REACTION frames that draw no place | nothing — no outline, no ground line | one element, or "none" (the face carries it) |
| **PEAK** | one flat, even full-colour field: the chapter's emotional colour | the wider frames of a scene the plan marks as an emotional peak (`pk: true`) | darker tonal outlines of the field colour | the field is the colour; an object adds colour only in a clearly different hue family |
| **NIGHT** | one flat night-navy field | scenes that happen at night | slightly lighter navy outlines | one warm light or story object, or "none" |
| **MEMORY** | a faded light grey ground | scenes in the past (a parent's own childhood, an earlier moment remembered) | faded grey outlines | only the story object keeps its colour |

The exact hex values of each mood live in the compiler's MOOD table (assets/compiler-v19/). The old mood names still work
as aliases: BRIGHT, WARM, EVENING, COOL, DUSK, NEUTRAL and ACCENT all become CLEAN; TENSE, SUNNY and the old chapter
"emo" palettes become PEAK variants; DARK becomes NIGHT; ICY becomes MEMORY.

### 1.1 CLEAN — the default
- Use it unless the frame is face-only, object-only, a word frame or a white break (WHITE), part of a marked peak scene
  (PEAK), at night (NIGHT) or in the past (MEMORY).
- Nothing in a CLEAN frame is tinted: no wall colour, no floor colour, no coloured furniture, no soft colour patch behind
  the characters. The ground itself is the very light neutral; that is what keeps white characters readable (§4).
- A CLEAN frame may draw no place at all (a medium figure on the ground with one ground line) when the place is already
  known or does not matter.

### 1.2 WHITE — pure white
- **Face-only**: a large face or an eyes-only crop. Thomas: "Sometimes a large face on a white background is much stronger
  than a complete room." Nothing is drawn behind the face, and the frame's own text names no room part (no door, table,
  bed or stair), so the generator does not add one.
- **Object-only**: the story object alone, large, with its bold black outline. The School of Life move: "a single object
  lying in the centre of the composition" (R3 §4).
- **WORD frame**: pure white with nothing drawn (or one small object if the plan names it); the word is added by Muhammad in
  Premiere (references/humour-text-contrast-v19.md holds the word style).
- **White break**: a deliberate cut into white after a run of place frames — Thomas's "suddenly white background". It shows
  a face, an object, a word, or hands with the one coloured object.
- **FACE_HANDS and REACTION** frames go WHITE when they draw nothing of the place, CLEAN when they keep an outline cue
  (a table edge, a door post).
- Hands-only inserts and frames with small figures stay CLEAN: white mitten hands and small white heads need the very
  light ground to separate from it. Small figures go on pure white only as a deliberate white break, and only after a
  test render shows they still read.

### 1.3 PEAK — full colour for an emotional peak
- Thomas's approved summary: "Full coloured scenes stay for emotional peaks and night scenes." His long note also puts
  "full-screen color" on the Less list. Both stand, so PEAK is rare and only ever earned: it marks a scene where the
  film's emotion is at its strongest, chosen in the plan's emotional-curve pass (references/shot-plan-v19.md §4). Not
  every chapter has one. Never for decoration, never to vary the look, never because a stretch "feels pale".
- A PEAK frame carries `pk: true`. A PEAK mood without `pk: true` fails the build checks.
- PEAK colours the wider frames of the peak scene (WIDE, MEDWIDE, MEDIUM): the field is the emotion around the figures.
- A full-colour field never sits behind a face close-up. When the peak scene cuts to a face (CLOSE, XCLOSE, REACTION,
  FACE_HANDS), that frame goes WHITE: the face is the important thing, so everything else stays neutral, and the jump from
  the colour field to white is itself a strong contrast.
- The field is one flat, even colour. Pieces are darker outlines of the same hue. Characters stay white with bold black
  outlines; faces are never tinted.
- Each chapter's peak colour differs from the others, so the peaks do not blend into one look. Never red (red is for
  danger, §6). Avoid peach, orange and mustard fields: warm colours render stronger than written and swallow orange story
  objects (render-lessons.md).

### 1.4 NIGHT — the night scenes
- For scenes that happen at night: a child lying awake, Dad asleep on the couch, a late talk at the kitchen table.
  Thomas, Video 4: "dark blue/grey night scenes work well."
- NIGHT is for the time of day, not for sadness in general. A heavy moment in daylight is CLEAN (or PEAK if it is the
  marked peak).
- Face close-ups inside a night scene follow the same rule as PEAK and go WHITE; the next wider frame brings the night
  back. A hands-only insert inside a night scene may stay NIGHT: white mitten hands with bold black outlines read
  strongly on navy, and the scene keeps its time of day (tested in assets/v19-samples/car-ride, S9).
- A colour element on NIGHT needs a hue far from navy (a warm yellow, amber or orange); a blue object disappears into the
  field, and the colour check fails it.
- The usual colour element is the one warm light the scene needs (a lit bedside lamp shade in flat warm yellow, the lit screen of a phone in flat pale turquoise) or the story
  object.

### 1.5 MEMORY — the past
- For scenes in the past: the parent as a child, an earlier version of the family, a moment the line remembers. The faded
  grey says "this was then" at a glance; the story object keeps its colour so it can link past and present.
- MEMORY is light and neutral, so close-ups inside a memory may stay MEMORY.
- A jump forward in time ("years later") is not a memory: it stays CLEAN, and the change is shown by the characters
  (age, height) and the anchor object (references/camera-and-closeups-v19.md, line type time-jump).

---

## 2. The CLEAN ground and the test strip

- The CLEAN ground is one compiler constant, `CLEAN_GROUND`. Default: a very light warm neutral, **#F7F6F3**.
- The candidates prepared for the test: **#FFFFFF** (pure white), **#F7F6F3** (very light warm neutral, default),
  **#F4F2EE** (a touch warmer and darker), **#F2F4F5** (very light cool neutral).
- **The final shade is settled by a test strip that Muhammad renders** before the next full build: the same short run of
  frames (a wide with small figures, a medium two-shot, a hands insert, a face close-up, an object frame) rendered on each
  candidate. Choose the shade where:
  1. the white characters are seen first, including small figures in a wide and white mitten hands;
  2. the ground reads as clean and neutral, never as beige, cream or blue (the hues Thomas named);
  3. the outline places stay quiet behind the characters;
  4. the coloured element is the brightest thing in the frame.
- Change `CLEAN_GROUND` once, in the compiler. Prompts never name the ground by a colour word other than the one the
  constant prints, so a change never leaves a wrong word behind.

---

## 3. Places as outline cues

### 3.1 What an outline cue is
An outline cue is one set piece that tells the viewer where we are, drawn **only as a thin soft-grey outline with white
fill: a complete, closed line drawing, not a coloured object.** It is finished (legs to the floor, every edge closed), but
it carries no colour, no texture and no small parts. "Outline" never means half-drawn, sketched or implied.

### 3.2 Establishing a place with the fewest cues
- Ask: what is the single shape that makes this place obvious? Draw that. Add a second cue only when the action uses it
  (a chair someone sits on, a counter someone leans on).
- The place is established by the frame that names its outline cue. A piece appears only when the frame names it — there
  is no automatic anchor furniture and no room master that copies furniture into every frame.
- Once the place is known, the next frames in the same scene may drop it entirely (a face on WHITE, a CLEAN medium with
  only a ground line), and the viewer still knows where we are.

Seed cues (open: add new places with the same question):

| Place | The cue that says it | A second cue only if the action uses it |
|---|---|---|
| Kitchen | the edge of the table, or the counter as a flat top on a plain block | one chair per person sitting; the fridge as one block with one handle |
| Hall / front door | the front door frame | the bottom stair, the hall table |
| Teen's bedroom | the bed (frame, one pillow, one blanket) | the door frame, the desk |
| Living room | the sofa | the doorway |
| Landing | the bedroom door, half open | the stair rail |
| Office | the desk with a monitor | one framed certificate on the wall |
| School gate / sideline | the gate posts, or one goal frame | a bench |
| Car | the curve of the seat back and the window line | the seat belt |
| Doorway as a place in itself | two upright lines and a top line | the door edge |

Method for a new place: name the place → list what a viewer would recognise it by → keep the one shape that cannot be
anything else → check that it can be drawn as a closed outline with no small parts (a counter, not a sink with taps) →
add a second cue only if a character touches it.

### 3.3 Ground line
Wider shots (WIDE, MEDWIDE, often MEDIUM) get one thin soft-grey ground line so the figures stand on something. It is a
line, not a filled floor. Close shots usually need none.

### 3.4 Keeping outlines thin and soft
- Line order: characters and story objects in the bold black outline; set pieces and the ground line in a thinner,
  softer grey line. The background never shares the character line.
- Set pieces never overlap a character's outline with their white fill. A character stands in front of or clear of a
  piece; when someone sits on a chair or a bed, the piece's line sits behind the body line, never across it.
- No room dress: pictures, posters, rugs, plants, lamps that do nothing, skirting, tiles, planks. If removing a piece makes
  the idea clearer, remove it.

---

## 4. Keeping white characters readable

Thomas, 3 Oct: "Because our characters are mostly white, they partly disappear against very light or white backgrounds…
The goal should always be: first I see the characters and their emotion, then the main action or object, and only after
that the background." Thomas, 5 Oct: "The viewer should always know immediately where to look."

The v19 answer is not a tinted wall (that is what he rejected). It is this set of rules together:
1. **The ground**: CLEAN's very light neutral sits a step below white, so white heads, white mittens and white-filled
   pieces separate from it. The test strip (§2) sets that step.
2. **Bold black character outlines** against thin soft-grey background lines (§3.4).
3. **Size**: emotion is shown large. A face that must be read is a close shot, never a small face in a wide (R2: many
   Seven Things faces were too small to read at MEDWIDE/WIDE). Small figures are for distance, space and loneliness.
4. **Pure white only where the subject is large** (face-only, object-only) or for a deliberate white break. Hands-only
   inserts and small figures stay on CLEAN.
5. **Nothing white overlaps a character's outline** (§3.4).
6. **The colour element sits near the action**: it pulls the eye to the face or the hands, never to a corner.
7. **Faces stay pure white** in every mood; colour never tints a head.

---

## 5. The one colour element

### 5.1 The rule
"Only the important object or emotional element should carry strong color." "If the phone is important, let the phone
stand out. If the face is important, keep almost everything else neutral." (Thomas.) Each frame names its one colour
element in the plan field `ce`:
- a PROP key — the object carries its fixed colour (`ce: "PHONE"`); if the prop's entry defines a coloured part, only that
  part is coloured;
- a PROP key followed by the part in plain words — only that part is coloured (`ce: "JAR lid"`, `ce: "PHONE screen"`);
- `"none"` — nothing carries colour; the white face with its bold black outline carries the frame.

Every other object in the frame is drawn uncoloured: story objects in the bold black outline with white fill, set pieces
in the thin soft-grey outline with white fill.

### 5.2 How to choose it
Ask, after the feeling and the camera are set:
1. **Where must the eye go after the face?** That thing carries the colour. If the answer is "nowhere, the face is
   everything", choose `none`.
2. **Is the object the cause of the feeling?** (the phone she won't put down, the test he hides, the keys in her own
   hair) Colour the cause.
3. **Is the object large?** Colour only its telling part (the jar's lid, the test's mark, the phone's case) so the colour
   stays a point, not a field.
4. **Two objects both matter?** Choose the one this line is about; draw the other uncoloured. The next frame can swap
   them — that swap is a contrast in itself.
5. **Does the colour help the contrast plan?** A stretch of `none` frames makes the next coloured object land harder
   (Thomas's "neutral scene vs one bright color"). Plan it in the contrast map (references/shot-plan-v19.md §4).

### 5.3 Fixed colours, changing meaning
- Each recurring object keeps one fixed colour for the whole film (Seven Things: the phone turquoise #00B3B8, the jar lid
  tangerine #F57C00, the pencil emerald #00A86B). The viewer recognises it on sight when it returns.
- The meaning changes through staging, not colour: the same turquoise phone is first the thing that pulls MOM away, later
  the thing she turns face-down to listen. Each return also gets a new picture (references/props-symbols-metaphors-v19.md).
- Two story objects never share a colour family, and no story object shares the hue of a PEAK field it appears in.

### 5.4 What never carries the colour
Walls, floors, furniture, the sky, the ground, a soft patch behind a character, decoration, a generic symbol (a heart, a
star, a trophy, an emoji-style icon). Character accessories (a headband, a tie, glasses) keep their own small, muted
identity colours from the cast design and never compete with the frame's colour element.

---

## 6. Red for danger only

Thomas's standing rule since Video 1: strong red only for danger or a warning. Red (`DANGER_RED`, #D32F2F) is used only
where something is a danger or a warning in the story: the red stamp on an overdue bill, a failing mark on a test when the
fear of failing is the point, a real hazard. Never as decoration, never
for love or warmth, never as a PEAK field. A frame whose colour element is red must be about that danger or warning.

---

## 7. How prompts phrase colour and absence

Google's own prompting guidance (R3 §8): "Describe the scene, don't just list keywords", and describe a wanted absence
positively ("an empty, deserted street with no signs of traffic") instead of listing what is missing. So the colour and
background sentences say what IS there.

### 7.1 Sentence patterns
- Background: **"The background is …"** — the mood's ground in one plain phrase.
- Place: **"The place is shown only by … drawn as a thin soft-grey outline with white fill: a complete, closed line
  drawing, not a coloured object."**
- Wider shots: **"One thin soft-grey ground line runs behind the figures."**
- Colour: **"The only coloured element in the whole image is … (hex); everything else is drawn in black or soft-grey line
  with white fill."**
- Face frames with `ce: "none"`: **"Nothing carries colour; the white face with its bold black outline carries the
  frame."**
- Empty space: **"The space around him is empty, clean ground."** — not "no furniture, no wall, no objects".

### 7.2 Per mood
- **CLEAN**: "The background is a very light neutral ground, flat and even. The place is shown only by the edge of
  the kitchen table along the bottom of the frame, drawn as a thin soft-grey outline with white fill: a complete, closed
  line drawing, not a coloured object. The only coloured element in the whole image is the turquoise (#00B3B8) case of THE
  PHONE in MOM's hand; everything else is drawn in black or soft-grey line with white fill."
- **WHITE (face)**: "The background is pure white, with nothing drawn behind the face. Nothing carries colour; the white
  face with its bold black outline carries the frame."
- **WHITE (object)**: "The background is pure white. THE JAR stands alone in the centre, large, in the same bold black
  outline as the characters. The only coloured element in the whole image is its tangerine-orange (#F57C00) lid."
- **PEAK**: "The background is one flat, even field of deep berry filling the whole frame. The landing is suggested only
  by the bedroom door, drawn as a darker berry outline. The characters stay white with bold black outlines."
- **NIGHT**: "The background is one flat, even night-navy field. The bed is drawn as a slightly lighter navy outline. The
  only coloured element in the whole image is the lit shade of the bedside lamp in flat warm yellow."
- **MEMORY**: "The background is a faded light grey ground, as if the colour has drained out of the moment. The doorway is
  drawn as a faded grey outline. The only coloured element in the whole image is the lime-green deck of THE SKATEBOARD."

### 7.3 Words to keep out of the prompt
- Colour words for walls, floors or furniture in CLEAN frames ("a sage wall", "a blue kitchen", "quiet slate chairs").
- Room words in a face-only WHITE frame ("at the kitchen table") — they make the generator draw the room.
- "Suggested", "implied", "sketched", "half-drawn": an outline cue is complete and closed.
- Long "no …" lists in the colour sentences. The short AVOID constant in the compiler is the one place for prohibitions.

---

## 8. Before → after (Seven Things)

The "before" wording is quoted from the Seven Things build (Version 9, research R2). The "after" applies this file and
the R2 proposals. Script lines never change.

| Frame · line | Before | After (v19) |
|---|---|---|
| **S75** · "Your stress becomes my stress." | MEDWIDE kitchen: "a flat cool sage (#D1E1D6) back wall… one small round table in quiet sage (#B4C2B8)… one plain chair in quiet sage"; a big indigo STRESS KNOT over MOM's head. One hue for wall and furniture, a symbol for the feeling. | **CLEAN, two layers.** Foreground, left: MOM, large, gripping her phone, jaw tight, shoulders up. Background, right: SON at the table outline, spoon stopped mid-air, his shoulders rising to the same height as hers. The table is a thin soft-grey outline; one ground line. `ce: "PHONE"`. No knot: the copied posture is the meaning. |
| **S77** · "They notice the silence between parents." | MEDIUM at the kitchen table: "a flat cool sage (#D1E1D6) wall behind; the edge of the small round table in quiet sage… the top of one plain chair back in quiet sage"; THE EMPTY SPEECH BUBBLE over SON. | **CLEAN wide, one table outline**, a large empty gap between MOM and DAD at its two ends. DAD reaches for the salt; MOM slides it over without looking up. Edit: SON's pupils go left, then right. `ce: "SALT"` — the one exchange between them. The silence is empty space and no eye contact. |
| **S106** · "Your brother was reading at your age." | MEDIUM at a child's height: "a flat warm sage (#DAE3D2) wall and the plain door frame in white… over a flat clean white floor". | **CLEAN low close.** The doorframe is two thin soft-grey lines. SON's face fills the lower half, eyes sliding down and away; only MOM's hand enters top-left, tapping a high mark with THE PENCIL. `ce: "PENCIL"`. |
| **S177** · "Not because your child stopped loving you." | CLOSE at his bed: "a flat cool blue (#CDE0EC) wall behind"; HERO COLOUR "THE HEART in saturated raspberry". A tinted wall and a childish symbol. | **CLEAN medium, the table and the laptop as outlines.** SON silently sets a mug of tea beside MOM's laptop and is already turning away. Edit: her hand pauses on the keys, her face softens. `ce: "TEA_MUG"` — a plain mug, no heart. |
| **S215** · "All three things can be true." | MEDIUM in "one flat soft warm beige (#ECE6DC) colour field filling the entire background"; MOM juggles a stop paddle, a sand timer and a heart. | **CLEAN, face and hands, the table edge as one outline.** MOM's one palm raised flat (the boundary), her other arm round SON's shoulders (the love), her eyes level and calm; the sand timer on the table edge between them (the pause). `ce: "SAND_TIMER"`. |
| **S21** · "not fix me." | ACCENT at the counter: "a flat soft mint (#D3E7DF) wall; one plain counter in white with thin soft grey outlines". | **CLEAN**: the counter outline stays, the mint wall goes; THE TOOLBOX keeps its sky blue as the only coloured element. The idea was already strong; only the tint was wrong. |
| **S197** · "I hate you!" | CLOSE on TENSE: SON's face in front of a full-colour field. | **WHITE face-only** (a full-colour field never sits behind a face close-up). The wide before it, S196 "The tantrum.", keeps the chapter's PEAK colour with `pk: true`; the cut from the colour field to the white face is the contrast. |
| **S171–S174** · "And if love seems brightest after achievement…" | Four MEDWIDE frames of SON centred on a dark stage (the old night mood used for an idea, not for night). | Not NIGHT. If the plan marks this as the chapter's peak, PEAK with `pk: true` for the wide and WHITE for the faces; otherwise CLEAN, with the spotlight idea carried by one colour element. Never four near-identical frames (references/camera-and-closeups-v19.md §8). |

---

## 9. Quick checks for the writer

Before a frame's prompt is final:
- Is the mood CLEAN unless there is a reason (face-only, object-only, word, white break, `pk: true`, night, the past)?
- Does any wall, floor or furniture carry a colour word? Remove it.
- Is the place said with the fewest outline cues, each one a complete closed line drawing?
- Is there exactly one colour element (or `none`), and is it the thing the eye must go to after the face?
- Is red only on danger or a warning?
- Is a face close-up anywhere in front of a full-colour field? Make it WHITE.
- Are the colour and background sentences written positively ("The background is…", "The only coloured element…")?

## Sources
- Thomas, 5 Oct 2026 and 3 Oct 2026: SOURCES.md A, B, C, D, F.
- Seven Things measurements and examples: research/R2_build_audit.md §1, §5, §10; SOURCES.md G.
- Spot colour, colour scripts, minimal adult style: R3 §4 (S14 No Film School on the red coat; S15 MoMA on the Toy Story
  colour script; S16 It's Nice That on School of Life; S17 UPA).
- Positive phrasing and narrative prompts: R3 §8 (S25 Google Developers Blog, "How to prompt Gemini 2.5 Flash Image
  Generation for the best results").
- Render lessons on warm colours, small figures and white characters: references/render-lessons.md.
