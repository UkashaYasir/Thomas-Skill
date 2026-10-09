# Shot plan — v19 (the plan made before any prompt is written)

> **v24 (9 Oct 2026):** the order of decisions adds the **object-necessity pass** (every set piece and prop tells the
> story, carries the emotion or makes the moment understandable — or it goes) and the **zoom plan** (`zm`); `ce` is bright
> by default (`cm` for a quiet beat) and `ce2` names a second coloured object only when needed; words are `tx`/`kw` in the
> v24 hand-lettered style. See `v24-standard.md`.

Source: Thomas, 5 Oct 2026 (SOURCES.md A14, D): "It shows how important it is that we define the emotional beats, camera
angles, reactions, and visual contrasts very clearly before production starts. I do not simply want 'more images.' I want
better and more varied images with a clear purpose. If we are working with 300+ images, the viewer should still never
feel like the visuals are repeating or that the same composition keeps coming back." And: "For every scene, ask: What is
the viewer supposed to feel here? Only after that should we decide: background, prop, color, camera angle, movement."
This file applies references/v19-principles.md §0.4–§0.7.

Every list here is a set of seed examples plus a method. The plan has no quotas: no number of ideas per line, close-ups per
chapter, interrupts per minute or words per video. Each choice is judged by the moment and by the tests in §3.

---

## 0. When the plan is made

1. Read the whole script once as a viewer. Mark the chapters and scenes, and sketch the emotional curve (§4 pass A).
2. Plan every line in order, making the decisions in §1 and filling the fields in §2.
3. Run the whole-film passes (§4) and revise the frames they flag.
4. Only then write prompts.

Muhammad produces the whole video in one pass from the Copy page, so the plan and the prompts arrive together in one
delivery. The plan fields show next to each frame on the Copy and Edit pages. Script lines and voice-over timing are
final; the plan serves them and never changes them.

---

## 1. The order of decisions for each frame

| Step | Decide | Field |
|---|---|---|
| 0 | What kind of line is this? | `ln` |
| 1 | **What should the viewer feel?** A feeling, from the viewer's side, in plain words — "the sting of being compared", not the topic "comparison". | `ft` |
| 2 | **The idea.** Explore every direction and keep the strongest (§3). | `idea`, `alt` |
| 3 | **The camera.** Shot, angle, composition (who or what is at the left, the centre and the right, and what is near or far); for close shots, where the eyes go and why the shot makes sense. | `sz`, `an`, placement, `look`, `ctx` |
| 4 | **The reaction.** Who does what, who reacts how, and how far apart they are. | `ia`, `dist` |
| 5 | **The contrast.** What this frame sets against the frame before, or inside itself. | `cx` |
| 6 | **The interrupt.** Is this frame a switch in kind? Which kind? | `ip` |
| 7 | **The word.** Is this a strong moment where one idea word sharpens the line? | `kw` |
| 8 | **The colour element and the mood.** The one coloured thing (or none), the background treatment, and whether this is a peak. | `ce`, `m`, `pk` |
| 9 | **Movement and edits.** An in-scene edit (one change), a mask reveal on a voice-over word, a camera move in Premiere, or a held still. | edits, reveals, move |

Why this order: emotion leads, and "background, prop, color, camera angle, movement" follow (Thomas). Colour comes late on
purpose — the colour element is the thing the feeling and the idea have already made important
(references/style-and-colour-v19.md §5).

---

## 2. The plan fields

These short keys go on each frame in the segment files. The frame's other decisions use the build's existing fields
(scene `sc`, shot `sz`, angle `an`, mood `m`, placement, word `kw`, move, reveals, edits and sequences); the compiler README
(assets/compiler-v24/README.md) lists them all. In v19, `ln` holds the line type.

| Key | Meaning | Required | How to write it | Example |
|---|---|---|---|---|
| `ft` | what the viewer should feel | every frame | a feeling in plain words, from the viewer's side | "a laugh of recognition with a sting under it" |
| `ln` | line type | every frame | one type from the open list in references/camera-and-closeups-v19.md §10, or a new one | "dialogue" |
| `idea` | the chosen idea | every frame | one line: who does what, and where the camera is | "SON's 'seriously?' look at MOM's phone, pushed into frame from the left" |
| `alt` | the other ideas considered | every frame | an array of short strings; when revising, include the old staging and why it lost | ["the gold star above the doorframe (sticker logic)", "the cousin's photo on the fridge"] |
| `ia` | the interaction beat | whenever two or more characters are in the frame (a hand or a shoulder of a listed character counts) | "who does what → who reacts how" | "MOM taps the high mark → SON's eyes drop away and his chin tucks" |
| `dist` | the distance between the characters | whenever two or more characters are in the frame | touching / close / apart / far | "apart" |
| `look` | where the eyes go, and on which side | CLOSE, XCLOSE, FACE_HANDS, and REACTION with a face | the target and the side | "toward MOM, out of frame left" |
| `ctx` | what makes the close shot make sense | the same frames as `look` | the frame it follows, or the context in the frame | "follows wide S22", "hands + THE PHONE", "over MOM's shoulder" |
| `ce` | the one colour element | every frame | a PROP key, a PROP key followed by the part, or "none" | "PHONE", "JAR lid", "none" |
| `cx` | the contrast this frame makes | whenever the frame makes a contrast; when sameness with the frame before is chosen (a calm stretch, a held peak), write "affinity — " and why | with the frame before, or inside the frame | "MEDIUM office → huge face on white" |
| `ip` | the interrupt type | when the frame is an interrupt | white-break, extreme-close-up, word, unexpected-object, funny-reaction, strong-pose, short-metaphor, visual-silence, large-face — or a new type | "funny-reaction" |
| `pk` | an emotional-peak frame | every frame of a marked peak; required for a PEAK mood | true | true |

Meanings of `dist` (as in references/acting-and-interaction-v19.md §7.3): **touching** — in contact; **close** — within
reach; **apart** — out of reach, across the table or the room; **far** — at opposite ends of a wide frame, or through a
doorway: the distance is the feeling.

---

## 3. Ideation — explore every direction, keep the strongest

### 3.1 The directions
For every line, think through each direction and write down the best idea it gives. Some directions give nothing for a
given line; note that and move on.

| Direction | The question |
|---|---|
| **Real moment** | What does this look like in a real home this week — a moment parents and teenagers recognise at once? (references/everyday-situations-v19.md) |
| **Behaviour** | What does someone do with their body that shows it — sitting down beside, stopping before reacting, looking away but still listening? (references/acting-and-interaction-v19.md) |
| **Reaction** | Whose face tells the viewer what this means, and what exactly does that face do? |
| **Object** | Which real, mature object carries it — and is it a cause, a clue or a consequence? (references/props-symbols-metaphors-v19.md) |
| **Contrast** | What is the opposite — in the frame before, or inside this frame? |
| **Humour** | Where is the small human joke — a say/do contradiction, a "seriously?" look, an awkward pause, a parent overthinking? (references/humour-text-contrast-v19.md) |
| **Metaphor** | What picture adds meaning the words do not already carry? |
| **Unexpected angle** | Whose point of view, or which camera position, does nobody expect — the phone's view, the child's height, the empty room just after? |

### 3.2 Keep going until one is clearly strongest
An idea is clearly the strongest when you can say in one sentence why it beats each runner-up on the tests below. If two
are level, push both one step further (a sharper behaviour, a stronger contradiction, a clearer object) and judge again.
The first idea is rarely the best one; the most obvious one usually illustrates the words instead of adding to them.

### 3.3 Thomas's tests
1. **Emotion first** — does it make the viewer feel `ft`?
2. **Mature** — would it sit in a film for parents and teenagers, not a kids' channel? No hearts, stars, trophies, emoji
   icons or picture bubbles standing in for a feeling.
3. **Real** — would parents and teenagers recognise it from their own lives?
4. **Adds meaning** — does it add something the voice-over does not already say (amplify, not illustrate)?
5. **One strong object, one strong face, one strong gesture** — does the eye know at once where to look?
6. **Fits the story so far** — the characters, places, screen sides and motif states already established.
7. **No repetition** — not an idea, composition or motif picture already used (check the logs, §4).
8. **Feasible to generate** — two reference characters (others copied from them), a natural angle, few elements, revealed
   objects apart from hands, no words in the image, edits that change one thing at a time.

### 3.4 Recording and reusing the runner-ups
- `alt` keeps the runner-ups in short strings. When revising an existing build, the old staging goes in `alt` with the
  reason it lost.
- Before ideating a later line, read the earlier `alt` lists. A runner-up that fits a later line better moves to that
  frame's `idea`, and the earlier entry is marked "(used S…)". No idea is used twice.
- After the video, ideas that worked go back into the libraries they came from, so the system keeps growing.

---

## 4. The whole-film passes

When every frame has a first plan, read the whole plan once per strand and revise the frames each pass flags. Keep short
pass notes with the build (the curve, the peak scenes, the motif log, the word moments) so Muhammad can read the plan in
one place.

**A. Emotional curve.** Chapter by chapter: where the feeling builds, where it peaks, where it releases. Mark the peak
scenes (`pk: true`); only these may use PEAK. Check that pace follows emotion: more switches in kind through calm
explanation, fewer and held related frames at the peaks, and a dense, strong opening.

**B. Distance script.** Read two strands side by side along the film:
- camera distance — the distance family of each frame (references/camera-and-closeups-v19.md §1). No long stretch of
  medium and wide frames; emotional lines near or very near; the same character in back-to-back frames changes size or
  angle clearly;
- character distance — `dist`. It tells the relationship story: apart in conflict, closer in repair, touch where it pays
  off. Each change in distance is visible and has a reason.

**C. Contrast map.** Read `cx` along the film. Thomas's contrasts appear where they serve the moment: "empty background vs
strong object; neutral scene vs one bright color; wide shot vs extreme close-up; serious moment vs humorous reaction; still
moment vs movement; small prop vs large face; silence vs strong visual beat." The strongest contrasts sit at the peaks;
calm stretches are chosen affinity, not drift (R3 §1, Block).

**D. Interrupt flow.** Read `ip` along the film. Interrupts are related to their line (an unrelated surprise grabs the eye
but is not remembered, R3 §7) and vary in kind; no type becomes a habit. Watch for stretches where nothing changes in
kind, and fix them with the strongest fitting interrupt, not with any interrupt.

**E. Word moments.** Read `kw` along the film. Idea words only, at strong moments, "not constantly": a word from
Thomas's list (TRUST, SAFE, LISTEN, TESTING, SHAME, CONTROL, MISREAD, ATTENTION, OVERWHELMED, HONESTY, NOT REJECTION) or
the line's own idea word. Never a chapter number, never a sentence. When two words sit close together, keep the stronger.

**F. Motif evolution.** Keep a motif log: for each recurring object, every return with its frame, its reason, its new
meaning, its new picture and the emotional step it supports. Thomas: every recurring object should "have a reason; evolve
with the story; mean something different later; support the emotional progression. It should not return only because it
looks good." A return with no new meaning or no new picture is cut or changed.

**G. Composition variety.** Keep a composition log: shot + angle + place + left/centre/right for every frame. No exact
repeats anywhere in the film, no near-repeats of the old formulas (references/camera-and-closeups-v19.md §8.1), screen
sides kept inside each scene and varied between scenes.

**H. Colour script.** CLEAN as the default; WHITE where faces, objects, words and white breaks land; PEAK only on marked
peaks; NIGHT only at night; MEMORY only in the past; each `ce` pulls the eye to the right place; red only for danger
(references/style-and-colour-v19.md).

**I. Life, humour and cast.** Everyday situations and humour beats spread through the film rather than clustering in one
chapter; every character the story needs is designed (references/cast-design-v19.md).

---

## 5. Worked example — Seven Things, re-planned

These rows re-plan lines from R2's before/after list (research/R2_build_audit.md §10) and two peak frames. The lines are
unchanged; "Version 9" is the delivered build. New PROP keys used below (PAN, CERTIFICATE, TEA_MUG, SAND_TIMER) are designed with the props
method before the build — seed designs in references/props-symbols-metaphors-v19.md ("Seed designs for the worked
example").

```text
S82 · "They notice when Mom says she is fine in a voice"
  sc   "Kitchen, after dinner"
  ft   "the sting of recognition — every parent has done this"
  ln   "rapid-list"   (the last items of "They notice…", S77–S83)
  idea "over SON's shoulder: MOM tells him she is fine with a bright, too-wide smile while her hand scrubs an
        already clean pan far too hard"
  alt  ["Version 9: a paper-plate smile mask on a stick (a craft-class prop, too childish)",
        "a cheerful thumbs-up while her other hand grips the counter edge",
        "'I'm fine!' over her shoulder without turning round, folding the same towel again"]
  ia   "SON asks from the doorway → MOM snaps on a bright smile, and her scrubbing does not stop"
  dist "apart"
  sz MEDIUM · an OTS · m CLEAN   (SON's spiky head and shoulder large at the left; MOM at the counter outline, right)
  ce   "PAN"
  cx   "inside the frame: the bright smile against the hand scrubbing too hard"

S83 · "that clearly does not mean fine."
  ft   "a quiet ache under the joke — he sees straight through it"
  ln   "rapid-list"
  idea "the reverse: SON's face large at the left, his eyes following MOM; small in the background at the right, she
        has turned back to the counter and her shoulders have sunk"
  alt  ["an eyes-only side-eye from SON (kept for a later 'he notices' line)",
        "an edit on S82 where her smile drops for a moment as she turns"]
  ia   "MOM turns back to the counter and her smile drops → SON's eyes follow her and his mouth flattens"
  dist "apart"
  sz CLOSE · an EYE · m CLEAN
  look "toward MOM, frame right (her back, small in the background)"
  ctx  "reverse of S82 with the sides kept (SON left, MOM right); the cause — her sunk shoulders — is in the frame"
  ce   "none"
  cx   "with S82: the bright smile → her sunk back; over-the-shoulder medium → close reverse"
  ip   "visual-silence"

S106 · "Your brother was reading at your age."
  sc   "Kitchen doorframe — the height marks"
  ft   "a small, familiar sting — being measured against someone else"
  ln   "dialogue"
  idea "low close from SON's height: his face fills the lower left, eyes sliding down and away, chin tucking; only
        MOM's hand enters at the top left, tapping a high mark on the door post with THE PENCIL"
  alt  ["Version 9: the doorframe two-shot, MOM tapping a mark beside a tiny drawn book while SON stands with his hands
        at his sides (a layout used four times; SON 'just stands')",
        "SON's reading book held upside down as MOM's voice lands (humour — kept for a lighter line)",
        "the brother's school photo on the fridge with SON's eyes on it"]
  ia   "MOM taps the high mark with THE PENCIL → SON's eyes drop away and his chin tucks"
  dist "close"
  sz CLOSE · an LOW · m CLEAN   (the doorframe as two thin soft-grey lines)
  look "down and away to the lower right, away from MOM's hand"
  ctx  "follows S105, where the doorframe, MOM (left) and SON (at the post, right) are set; hand + THE PENCIL show the cause"
  ce   "PENCIL"
  cx   "a small mark high at the top edge against his large face sinking low"

S108 · "Why can't you be more like your cousin?"
  ft   "a laugh of recognition with a sting under it"
  ln   "dialogue"
  idea "SON's 'seriously?' look — one eyebrow up, flat mouth, slow blink — at MOM's phone, pushed into the frame from
        the left, showing a photo of a beaming cousin holding a certificate"
  alt  ["Version 9: a gold star stuck high above the doorframe (sticker logic, too childish)",
        "MOM holding the cousin's framed photo up next to SON's face",
        "the family photo on the fridge with the cousin in the centre and SON at the edge"]
  ia   "MOM pushes her phone toward him → SON gives her the 'seriously?' look"
  dist "close"
  sz REACTION · an EYE · m WHITE
  look "toward MOM's hand and phone, frame left"
  ctx  "MOM's hand and THE PHONE enter from the left, where she stood in S105–S106"
  ce   "PHONE"
  cx   "S106's sinking hurt → this dry look: a serious moment against a humorous reaction"
  ip   "funny-reaction"

S119 · "Every."
  sc   "Office"
  ft   "the adult's own slow-building dread"
  ln   "rapid-list"   (the adult-mirror of S106)
  idea "BOSS, standing at the right of MOM's desk, jabs one hand at a framed certificate on the wall above her; MOM,
        seated at the left, holds a polite smile"
  alt  ["Version 9: BOSS points at a gold-star frame while MOM sits upright (gold-star logic)",
        "BOSS slides a printed photo of Sarah's award across the desk",
        "Sarah's certificate glowing on MOM's own monitor"]
  ia   "BOSS jabs at the certificate → MOM's smile stiffens and her shoulders lift"
  dist "close"
  sz MEDIUM · an EYE · m CLEAN   (desk, monitor and one frame as outlines)
  ce   "CERTIFICATE"
  cx   "the mirror of S106 with the sides flipped: the adult now sits in the child's place"

S120 · "Single."
  ft   "panic held behind a polite face"
  ln   "rapid-list"
  idea "huge face on white: MOM's smile held far too long while one eye squeezes half shut in a twitch"
  alt  ["Version 9: an edit-only reuse of S119 (the same composition twice in a row)",
        "MOM's hand gripping her pen until it bends"]
  sz XCLOSE · an EYE · m WHITE
  look "up toward BOSS, out of frame right"
  ctx  "follows S119 (BOSS stands at the right)"
  ce   "none"
  cx   "medium office → huge face on white"
  ip   "large-face"

S121 · "Week."
  ft   "the absurd scale of it — a laugh that stings"
  ln   "rapid-list"   (the end of the list)
  idea "wide reveal: the wall behind MOM's desk covered edge to edge in identical framed certificates, BOSS hanging one
        more; MOM small at her desk, sunk down to her eyes behind the monitor"
  alt  ["MOM's desk calendar with every single week circled",
        "BOSS's open mouth huge in the foreground, MOM tiny behind it"]
  ia   "BOSS hangs one more certificate → MOM sinks lower behind her monitor"
  dist "apart"
  sz WIDE · an EYE · m CLEAN
  ce   "CERTIFICATE"   (only the one being hung; every other frame on the wall is an outline)
  cx   "huge face → wide reveal; one certificate → a whole wall of them"
  ip   "unexpected-object"

S177 · "Not because your child stopped loving you."
  sc   "Kitchen table, evening"
  ft   "a lump in the throat — the love is still there, only quiet"
  ln   "statement"
  idea "SON silently sets a mug of tea beside MOM's laptop and is already turning away before she looks up"
  alt  ["Version 9: SON colouring a big raspberry heart on a card (a childish symbol)",
        "SON lingering in the doorway 'looking for snacks', stealing glances at MOM",
        "SON leaving the last biscuit on her side of the table"]
  ia   "SON sets the mug down and turns away → MOM's hand pauses on the keys and her face softens"
  dist "close"
  sz MEDIUM · an PROFILE · m CLEAN   (the table edge and the laptop as outlines)
  ce   "TEA_MUG"   (a plain mug, no heart)
  cx   "the hidden tests and hidden faces of the frames before → one small open act of care"
  edit on "loving": MOM's hand pauses on the keys, her eyebrows lift softly and her mouth eases

S196 · "The tantrum."
  sc   "Kitchen, evening"
  ft   "a jolt — the worst moment, at full volume"
  ln   "rapid-list"   (and the chapter's peak scene)
  idea "SON mid-tantrum in the kitchen, arms flung out, his chair shoved back; MOM stopped dead in the doorway at the
        left, one hand still on the frame"
  alt  ["SON's bag thrown across the floor, MOM's keys still in her hand",
        "the slammed cupboard door still swinging, SON's back to MOM"]
  ia   "SON shoves the chair back and flings his arms out → MOM stops dead in the doorway"
  dist "far"
  sz MEDWIDE · an EYE · m PEAK · pk true   (the chapter's peak colour field; the doorway as a darker outline)
  ce   "none"   (the field is the colour)
  cx   "the chapter's quiet CLEAN frames → its one full-colour field"
  ip   "strong-pose"

S197 · "“I hate you!”"
  ft   "the sting of the worst words"
  ln   "peak"
  idea "huge face on white: SON's mouth a huge open shout shape, eyebrows slammed down, head pushed forward"
  alt  ["Version 9: the same shout in front of the storm-colour field (a colour field behind a face close-up)",
        "MOM's face receiving the words, with SON only as a shoulder in the foreground"]
  sz XCLOSE · an EYE · m WHITE · pk true
  look "toward MOM, out of frame left"
  ctx  "follows the peak wide S196 (MOM in the doorway at the left)"
  ce   "none"
  cx   "full-colour field → white face"
  ip   "large-face"

S215 · "All three things can be true."
  ft   "relief — firmness and love can live in one moment"
  ln   "statement"
  idea "face and hands: MOM's one palm raised flat (the boundary), her other arm round SON's shoulders (the love), her
        eyes level and calm; the sand timer on the table edge between them (the pause)"
  alt  ["Version 9: MOM juggling a stop paddle, a sand timer and a heart while SON watches with his arms at his sides
        (generic props; SON inert)",
        "the three sentences as three hands on the table: one flat, one holding, one waiting",
        "MOM and SON back at the table where they fought, now on the same side of it"]
  ia   "MOM keeps her palm raised as SON leans in → SON's shoulders loosen against her arm"
  dist "touching"
  sz FACE_HANDS · an EYE · m CLEAN   (the table edge as one outline)
  look "MOM toward SON, frame right, level; SON down at her raised palm"
  ctx  "follows S212–S214, where the three sentences were said at the kitchen table (MOM left, SON right)"
  ce   "SAND_TIMER"
  cx   "three sentences in three frames → all three in one frame"
```

### What the whole-film passes add to these rows
- **Distance script**: S119 → S120 → S121 moves MOM from medium to a huge face to a wide — three distance families, three
  compositions. S82 → S83 keeps the scene's sides and moves from medium to close.
- **Character distance**: S196 is far; S197–S198 hold the distance; by S215 they are touching. The change carries the
  chapter.
- **Contrast map**: the chapter's one PEAK field (S196) lands against CLEAN frames, then cuts straight to a white face
  (S197). S108's humour lands right after S106's hurt.
- **Motif log**: THE PHONE returns at S108 with a new meaning — in chapter two it pulled MOM away from her child; here it
  is her comparison tool — and in a new picture (held up at SON's face, not in MOM's lap).
- **Word moments**: none of these rows carries a word. Chapter four's word goes on its turn, S129 "They are a different
  person." (DIFFERENT, the line's own idea word); chapter seven's goes on S211 (NOT REJECTION, from Thomas's list).
- **Composition log**: none of these compositions appears elsewhere in the film; the doorframe layout that Version 9
  used four times appears once (S105) and is then broken up by S106's low close and S108's reaction on white.

## Sources
- Thomas, 5 Oct 2026: SOURCES.md A10, A11, A14, A15, A16, D.
- Seven Things before/after list and measurements: research/R2_build_audit.md §1, §2, §4, §7, §8, §10.
- Contrast and affinity, Kuleshov, pace by emotion: research/R3_craft_research.md §1 and §7.
- Field keys: research/WORKPLAN.md "Shared names".
