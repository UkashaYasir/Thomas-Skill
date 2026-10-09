# R2: Build audit, "Seven Things" (232 frames), measured against Thomas's final priorities

Source: `/home/claude/v3/out/build.jsx` (PROMPTS, read-only). Measured against SOURCES.md §D (final priorities) and §A (points 1–16). Background and shot-size totals are in §G and are not repeated here. Timing assumes about 2.2 s per frame. Anything marked **proposal** is my suggestion, not a client instruction.

Method: each frame's `map` (left / centre / right) was reduced to a slot signature. A slot is a character (MOM, SON, LB = Little Boy, DAD…), `(face)` when that character's face fills the slot, OBJ for a prop, or env for wall, door or background. Signatures were then counted across frames and in runs.

---

## 1. Repetition in framing and composition

**Rotation from one frame to the next works. Repetition at the level of the whole video is the problem.** The compiler's rotation rule holds: shot + angle never repeats more than twice in a row (11 back-to-back pairs, 22 frames in all), and the same shot size never runs 3 frames in a row. But MEDIUM↔MEDWIDE counts as a change in the data and reads the same on screen (§G: 14 stretches of 3–6 medium/wide frames). And a small set of layouts keeps coming back.

| Measure | Count | Evidence |
|---|---|---|
| Eye-level camera | **165 / 232 (71%)** | PROFILE 25, OTS 12, LOW 12, SQUARE 11, HIGH 7 |
| Three default pairs (MEDIUM/EYE 43, CLOSE/EYE 42, MEDWIDE/EYE 38) | **123 (53%)** | |
| **Two characters on either side, gap or object in the centre** (one character left, another right) | **69 (30%)**: 46 medium/wide, 23 close | for example S21, S28, S32, S41, S42, S94, S144, S146, S149, S213, S217, S219 |
| of which MOM left / child right | **43** (child left / MOM right: 15) | MOM is on the left in 74% of the MOM–child pairs |
| of which "MOM left · object/gap centre · child right" | **33** | S21 S27 S28 S32 S41 S42 S50 S54 S56 S57 S59 S82 S94 S98 S125 S136 S144 S146 S149 S154 S187 S192 S198 S203 S208 S213 S214 S217 S219 S223 S224 S230 S231 |
| Gap between medium/wide two-character frames | median **3 frames (~6.6 s)**; 25 of 45 gaps ≤ 3 frames | |
| One subject centred, empty wall either side (env · X · env) | **47 (20%)** | 11 of them are SON alone centred (S10 S13 S20 S87 S171–S174 S185 S196 S204) |
| "Across the table" staging | 13 | S32 S82 S102 S147 S148 S149 S163 S210 S212 S213 S216 S217 S224 |
| Kitchen (4 kitchen sets) | **83 (36%)**; 41 frames reuse one kitchen master (S12) | Son's room master S10: 18; living-room master S35: 18; hall master S2: 14 |

**Most repeated layouts (L | C | R signature, 100 distinct in 232 frames):**

| n | Signature | Frames |
|---|---|---|
| 15 | MOM · OBJ · SON | S21 S28 S32 S41 S42 S94 S144 S146 S149 S213 S217 S219 … |
| 11 | env · SON · env | S10 S13 S20 S87 S171 S172 S173 S174 S185 S196 S204 |
| 8 | env · JAR alone · env | S6 S19 S44 S74 S104 S130 S139(bottle) S190 |
| 7 | MOM · gap · SON | S27 S136 S154 S187 S192 S198 S208 |
| 7 | env · MOM · env | S29 S68 S83 S109 S122 S137 S147 |
| 6+6 | SON · gap/OBJ · MOM (mirror) | S14 S22 S75 S162 S170 S200 / S73 S95 S184 S206 S215 S216 |
| 5 | MOM(face) · phone · LITTLE BOY, profile | S50 S54 S56 S57 S59 |

**The same set-up repeated in full** (set, shot, angle and L|C|R all identical): 12 groups. Examples:
- SON's eyes extreme close-up at the kitchen table: S33, S165, S195 (a strong device, used three times in the same layout)
- Hands over the table, MOM left, object centre, SON right: S42, S149, S223
- Profile phone two-shot: S56, S57, S59 (three in four frames)
- Kevin centred on the stage: S110, S113
- The doorframe height-mark two-shot: S106, S107, S124, S128 (4 frames, MEDIUM, near-identical)

**Chapter openers follow one formula.** 6 of the 7 "NUMBER …" frames are the same picture: THE JAR alone, centred, eye level, on a surface, plain wall either side (S19 hall table, S44 shelf, S74 counter, S104 table, S130 pedestal, S190 floor). S155 varies it slightly (a hand lifts it). The same layout is also used at S6 and S17. The jar returning is something Thomas likes (§A.11, "evolve with the story"). But the *picture* of it never changes.

**Held images.** Five frames are edit-only re-uses of the previous image: S57<S56, S59<S57, S65<S64, S120<S119, S172<S171. Four of these have identical action text. Longest runs of the same broad layout: S171–S174 (4 × SON centred on the dark stage), S64–S67 (4 × medium/wide Son's-room door frames), S106–S108 (doorframe).

**Per chapter, frames with two characters on either side:** Ch01 12/25, Ch02 9/30, Ch03 10/30, Ch04 8/26, Ch05 8/25, Ch07 **11/26**, Ch08 5/17. Ch06 has the lowest share outside the hook (5/35; Ch00 has 1/18) and the most varied shot sizes.

**Proposal:** add a layout check next to the shot-rotation check:
- no more than 2 frames with two characters on either side in any 6;
- MOM must not always be on the left (flip sides, or stage the pair front and back instead of left and right);
- vary the camera height (eye level ≤ 55%);
- each chapter opener should show the jar in a new way (extreme close-up of the lid, top-down, in SON's lap, reflected in an eye) instead of the same centred shot.

---

## 2. Expressions and body language

The frames have 349 character performance entries (one per character per frame; 223 frames have characters). **82% (287) use one fixed sentence pattern:** "eyebrows …, pupils …, mouth …; hands …". So the features Thomas lists are almost always *named*. The gaps are in head and posture, how strong the expressions are, how varied the wording is, and how big the face appears on screen.

| Feature (§A.4) | Entries naming it (of 349) | Frames naming it (of 223) |
|---|---|---|
| Eyebrows | 318 (91%) | 208 |
| Eye direction (pupils/gaze) | 314 (90%) | 206 |
| Mouth | 319 (91%) | 208 |
| Hands / gesture | 338 (97%) | 218 |
| **Head position** (tilt, bow, chin, turn) | **67 (19%)** | 74 |
| **Posture** (lean, slump, hunch, freeze, step back) | **54 (15%)** | 51 |

**How strong the expressions are and what they say:**
- Eyebrow phrases: 81 are low-intensity (soft, relaxed, level, flat, calm) and 73 are strong (shooting up, pulled down hard, steeply tilted).
- Eye direction is mostly generic: "pupils on SON" 43 and "pupils on MOM" 36. In total, 93 entries (27%) simply look at the other character. Looking away or avoiding someone: 13.
- Hand to face, mouth, forehead or heart: 13. Arms crossed: 9. **One raised eyebrow (the "seriously?" look): 3.** Eyes closed: 10.
- **Face is too small to read:** 132 of the 223 character frames have face size NORMAL (§G). 57 of those are MEDWIDE/WIDE, where the written eyebrow and mouth detail is a few pixels.

**Most repeated phrases:**

| Mouth | × | Eyebrows | × |
|---|---|---|---|
| "big round open circle" | 21 | "soft" | 21 |
| "hard flat line" | 13 | "tilted up" | 19 |
| "wide open oval" | 11 | "relaxed" | 16 |
| "tight pressed line" | 9 | "shooting up" | 13 |
| "warm smile" | 7 | "raised" | 13 |
| "big wavy line" | 6 | "lifted" | 11 |

Taken together, "round open circle" and "wide open oval" are the default surprised or reacting mouth in 32 entries.

**Frames where a character "just stands" (§A.4).** These are entries with hands at the sides, hanging or in the lap, and no head or posture beat. 34 entries in all. The clearest:

| Ref | Line | Who stands inert |
|---|---|---|
| S47 | "…not deliberately ignoring their children." | LITTLE BOY, both hands at his sides, while MOM is pulled by the cable |
| S106 | "Your brother was reading at your age." | SON, both hands at his sides, against the post |
| S108 | "Why can't you be more like your cousin?" | SON, arms hanging, mouth an open circle |
| S145 | "…not perfection." | SON, hands at his sides, gazing up |
| S160 | "they look at your face." | MOM, hands at her sides, face level and closed |
| S184 | "But make failure safe enough to tell you about." | SON, big surprise on the face but arms at his sides |
| S215 | "All three things can be true." | SON "amazed", arms at his sides, watching MOM juggle |
| S225 | "And when things get difficult," | MOM, hands relaxed at her sides |

There are also 12 frames where the second character is only a watcher ("stands/sits … watching"): S15 S32 S52 S64 S65 S73 S82 S101 S152 S160 S213 S215.

**Proposal:** make head and posture required parts of every performance (for example "head pulled back", "chin tucked", "shoulders up to the ears", "leaning away while eyes stay"). Replace "pupils on X" with a motivated eye beat (glance away and back, eyes on the hands, side-eye). Add a cap on the open-circle mouth. And when the line is about a face, never write a detailed expression into a NORMAL-size face at MEDWIDE/WIDE.

---

## 3. Interaction between characters

Multi-character frames: **123** (53%). This excludes S201, where LITTLE BOY is only inside SON's thought bubble. Shot sizes: MEDIUM 51, CLOSE 35, MEDWIDE 26, WIDE 7, HANDS 4. So 84 of the 123 (68%) play the interaction at medium or wider.

| Interaction signal | Frames (of 123) | Notes and evidence |
|---|---|---|
| **Mutual eye contact** (both sets of eyes on each other, or "lock eyes" / "hold each other's gaze") | **39 (32%)** | S14 S21 S32 S95 S97 S100 S102 S158 S169 S198 S200 S216 S221 S224 S230 … |
| One-way gaze (one looks, the other looks at an object, phone or away) | 50 (41%) | 8 of them are deliberately one-sided (`oneSided`: S59 S60 S64 S65 S66 S77 S81 S91, the phone chapter) |
| Nobody's eyes on another person | 31 (25%) | S30 S52 S80 S98 S107 S108 S123 S124 S129 S144 S146 S151 S181 S183 S215 S219 … |
| **Person-to-person touch** | **22 (18%)** | hugs or an arm round them 9 (S1 S2 S96 S181 S183 S192 S211 S226 S232); a hand on the shoulder, arm or head 7 (S26 S36 S97 S124 S129 S200 S214); shoulders touching 3 (S144 S222 S225); hand-holding or tugging 2 (S45 S100); a high five 1 (S125) |
| Reach / hand-over / offer | 22 (18%) | S22 S27 S47 S50 S95 S149 S187 S210 S217 S223 … |
| None of gaze, touch or reach | **52 (42%)** | for example S12 S30 S38 S54 S73 S75 S82 S106 S108 S115 S124 S128 S132 S146 S167 S180 S213 S215 |
| Explicit reaction verb (flinch, freeze, leans back, falters, blinks…) | 20 (16%) | for example S38 "blinks at it", S136 "leans back", S194 "flinches back", S198 "yell falters" |

**Distance is written with stock phrases, not used as a feeling.** "An arm's length away/at arm's length" appears in 15 actions (S21 S27 S32 S41 S70 S77 S82 S102 S115 S123 S136 S180 S198 S213 S217). "A few/several/couple of steps" appears in 18. Only 5 frames use distance *as* the device (DISTANCE: S60 S81 S162 S173 S203).

**Thomas's behaviour list (§A.3), what exists:**

| §A.3 situation | Frames | Count |
|---|---|---|
| A parent quietly sitting next to the teen | S95 S97 S222 S226 (S208 back-to-back through the door) | 4–5 |
| A teen looking away but still listening | S26 (turns his head away), S199 (turned half away), S203 (back turned, peeking) | 3 |
| A hand reaching out | S22 (MOM toward SON), S187 (SON toward MOM), S100 (takes his hand) | 3 |
| A parent stopping before reacting | S31 (freezes, magnifier sinking), S42 (hands stop pulling) | 2 |
| A child hesitating before telling the truth | S159 (test not yet opened), S178 (knock stopped short), S188 (hand stops short of the knob) | 3 |
| Someone noticing the other is uncomfortable | S22 only (MOM's concern), and arguably S160 | 1–2 |
| A parent kneeling to the child's level | S34 S100 S103 S146 S200 | 5 |
| Two people sitting together, no symbol | S222 S226 | 2 |

**Side-by-side posing** (both characters face an object or the camera, not each other):
- the doorframe run S106–S108, S124, S128, S129 (6 frames, MOM and SON side by side against the post)
- the museum S145–S146
- the trophy hug S181 and the fridge hug S183 (both look at the object)
- S98 (parents side by side, each with half a photo)
- S215 (SON watches MOM juggle)

The joint laugh at the cake (S219) is the one shared-attention frame that reads as real.

**Proposal:**
- In every two-character frame, name one interaction verb (looks up at, pulls back from, reaches, waits for, avoids). Name also one reaction from the *other* character, not just a second expression.
- Raise mutual eye contact and touch at emotional peaks.
- Stage more pairs at CLOSE (face + face, face + hand) instead of medium two-shots with the two characters on either side.

---

## 4. Relatable everyday situations vs symbolic staging

How frames were classified (from each frame's action, props, metaphor key and set, then a manual pass over all 232):
- **REAL**: a literal everyday action with real objects only.
- **SYMBOL**: a real setting with a symbolic overlay (jar of thoughts, thought or speech bubble with pictures, mask, star, knot, magnifier as "detective").
- **METAPHOR**: impossible or staged imagery (giant object, stage, juggling, quills, ice).
- **ABSTRACT**: an object or figure alone in a non-place (chapter jar on a plain wall, white field).

| Chapter | Frames | REAL | SYMBOL | METAPHOR | ABSTRACT |
|---|---|---|---|---|---|
| 00 What they hide | 18 | **2** | 11 | 3 | 2 |
| 01 Listen, not fix | 25 | 10 | 5 | 8 | 2 |
| 02 The phone | 30 | 18 | 7 | 3 | 2 |
| 03 Your stress | 30 | 10 | **13** | 6 | 1 |
| 04 Stop comparing me | 26 | **7** | 9 | 9 | 1 |
| 05 Forgive me too | 25 | 13 | 3 | 8 | 1 |
| 06 Scared to disappoint you | 35 | **22** | 8 | 5 | 0 |
| 07 Hardest to love | 26 | 16 | 3 | 5 | 2 |
| 08 Safe to tell | 17 | 8 | 8 | 1 | 0 |
| **Total** | 232 | **106 (46%)** | 67 (29%) | 48 (21%) | 11 (5%) |

- The hook (first 14 frames, about 30 s) has only **2 REAL** frames (S1 hug, S13). The longest stretch with no REAL frame is **S2–S12 (11 frames, about 24 s)**, mostly jar symbolism.
- Ch03 (stress) is the most symbolic: knots, an empty bubble, a scribble, thought bubbles, a clue board.
- Ch06 (test, juice, goal, dented car) and Ch07 (slammed door, eye roll, tantrum) are the most real and closest to the brief.

**Real moments that exist** (the strongest everyday beats):
- S22–S23 (comes home: "Today was terrible")
- S26–S27 (MOM fires questions, reaches for the phone to call the teacher)
- S35–S37 (adult "worst day" on the sofa)
- S46, S52–S53, S55, S58, S60 (half-listening on the phone, "Uh-huh", "Really?", the boy gives up)
- S62–S67 (the boy's shrug, the door closing over the years)
- S69/S71 (frog in a jar)
- S78, S80, S81 (bill, the face after a message, Dad on the couch)
- S102 (parents lock eyes over SON)
- S105/S124/S129 (height marks on the doorframe)
- S133–S141 (forgotten permission form, keys in her own bun, lost water bottle, the lecture)
- S147–S148 (apology)
- S158–S166 (test behind his back, missed goal and a look to the sideline, juice spill freeze)
- S174 (broken skateboard pushed under the bed)
- S178 (knock stopped short)
- S185–S188 (dented car, keys)
- S194–S197 (slammed door, eye roll, tantrum, "I hate you!")
- S210 (toast slid across the table after the fight)
- S217–S219 (cookie "no", muddy footprints, the lopsided cake laugh)
- S221 (phone face-down, "I see you")
- S227–S229 (attic)

**Coverage of Thomas's §A.7 list:**

| §A.7 situation | In build? | Frames |
|---|---|---|
| Teen says "I'm fine" but clearly is not | **No** (for the teen) | the nearest are S62 (LITTLE BOY's tight-smile shrug) and S82–S83 (MOM, staged as the SMILE MASK symbol) |
| Parent asks too many questions | Yes | S26 (real), S25/S28/S30 (magnifier, spanners, investigation) |
| Teenager rolls their eyes | Yes, 1 frame | S195 (S141 side-eye) |
| Child hides something | Yes, but mostly as a jar | real: S158 S166 S174; jar: S2 S10 S12 S175 S176 S189 |
| Parent walks past, notices, comes back | **No** | none |
| Teen wants attention but pretends not to care | **No** | none |
| Parent misunderstands silence as disrespect | **No** | none |
| Child starts to say something but changes their mind | Partly | S178, S188 (hand stops); S103 and S216 use a speech-bubble tangle (symbol) |
| Parent tries to help but makes it worse | Yes, mostly as metaphor | S21 S28 S30 S38–S40; real: S27 |
| Awkward silence after an argument | Partly, symbolic | S77 (empty bubble), S208 (door cutaway), S213 (sand timer) |

**Lines staged symbolically where a §A.7 moment would fit (proposal; voice-over unchanged):**

| Ref | Line | Current | Proposal (§A.7 moment) |
|---|---|---|---|
| S4 | "Not secret relationships." | HEART PHONE on the floor (the symbol Thomas criticised) | SON's phone lights up on the table; he flips it face-down a beat too fast; MOM's single raised eyebrow (*child hides something*) |
| S13 | "they love their parents so much" | SON leans on the table and gazes | SON hovers in the doorway "looking for snacks", stealing glances at MOM (*wants attention, pretends not to care*) |
| S77 | "They notice the silence between parents." | empty speech bubble | dinner, only forks; DAD reaches for the salt and MOM slides it over without looking; SON's eyes go left-right (*awkward silence after an argument*) |
| S82–S83 | "…Mom says she is fine in a voice / that clearly does not mean fine." | smile mask on a stick | MOM: "I'm fine!" with a bright smile, red-rimmed eyes, scrubbing an already clean pan too hard; SON's slow side-eye (*"I'm fine"* + §A.8 say/do contradiction) |
| S92 | "But silence is not always protection." | worry scribble over SON on the stairs | MOM walks past SON's half-open door with laundry, stops, steps back and looks in (base + edit) (*walks past, notices, comes back*) |
| S103 | "They are not always good at explaining it." | speech bubble with a knot | SON goes quiet and looks down; MOM, hands on hips: "Don't give me that look" (*misreads silence as disrespect*; MISREAD word, see §8) |
| S177 | "Not because your child stopped loving you." | SON colouring a big HEART | SON quietly sets a mug of tea by MOM's laptop without a word (love shown through behaviour, §A.3) |
| S180 | "to remain the version of themselves they think you love most." | SON's smile mask | "It went great!" with a big grin while one hand pushes the test deeper into his backpack (*"I'm fine"*, contradiction) |
| S216 | "Maybe that is what children struggle to explain." | speech-bubble tangle (repeat of S103) | SON opens his mouth, stops: "…never mind", turns back to his cereal (*starts to say something, changes mind*) |

---

## 5. Props

The build uses 74 prop keys. 178 frames carry at least one prop, and only **70** of those carry real everyday objects alone. The jar is the spine: **41 frames (18%)**. Next are PHONE 24 and TEST 10.

### 5a. Every prop key, grouped (frame counts in brackets)

**Flagged as childish or generic symbols (16 keys, 26 frames).**

| Prop | Frames | Reason |
|---|---|---|
| HEART_PHONE (1) | S4 | The exact item Thomas named as "too much like children's content" (§A.2), still in the build |
| HEART (2) | S177, S215 | A raspberry heart shape: SON colouring a heart, MOM juggling a heart. Standard symbol, §A.2/§A.16 |
| GOLD_STAR (2) | S108, S118 | A primary-school sticker as the measure of a teen and of an adult colleague |
| SARAH_FRAME (4) | S117, S119–S121 | Gold star frames on an office wall: the same sticker logic in an adult world |
| REPORT_CARD (1) | S111 | Five gold stars, no grade: reads as kindergarten |
| TROPHY (3) | S171, S172, S181 | A generic success icon (§G already counted 3) |
| PODIUM (1) | S110 | Sports podium with a star: cartoon shorthand |
| GOLD_PILLOW (1) | S114 | Gag prop. Works as a joke, but adds more gold-star logic |
| COIN_TOWER (1) | S113 | Cartoon wealth stack |
| SMILE_MASK (3) | S82, S83, S180 | Paper-plate mask on a stick, a craft-class object. Replaces the real "I'm fine" face that §A.7 asks for |
| STORY_BUBBLE (4) | S54, S56, S57, S59 | Speech bubble with a dinosaur drawing (§G) |
| EMPTY_BUBBLE (1) | S77 | An icon of silence instead of an awkward silence |
| SPEECH_BUBBLE (1) | S101 | Bubble on a seesaw against a boulder: diagram-like |
| MOMENT_BOWL + MARBLES (1) | S220 | Generic "token jar" idea that competes with THE JAR |
| STOP_PADDLE (1) | S215 | Traffic-sign icon for "no" |

**Borderline: a mature idea with a childish finish (7 keys, 19 more frames).**

| Prop | Frames | Reason |
|---|---|---|
| MUG / MENDED_MUG (1 + 7) | S145, S146, S149–S152, S154, S223 | Kintsugi repair is a strong, mature idea. But the mug carries "one big flat raspberry heart" on its side, so it is a heart symbol in every frame. **Proposal:** a plain mug, or SON's own initial-free stripe mug |
| GOOD_TEST (4) | S179, S183, S184, S206 | The grade is shown as a gold star. Reads as a primary-school sticker for a teen |
| SCRIBBLE / KNOT (3 + 1) | S75, S85, S86, S92 | Crayon-loop monster "with two round white eyes" (S86). Works as an imagination metaphor, but the eyes make it cartoonish |
| BOARDED_HOUSE (1) | S87 | A child's drawing of a house (sunflower walls) inside a thought bubble |
| TORN_PHOTO (2) | S88, S98 | A cliché, but readable and adult |

**Metaphor props (judged on the idea, not maturity; 26 keys):**
- fix-it set: TOOLBOX 3, WHITEBOARD 3, MAGNIFIER 7, PINBOARD 1, DESK_LAMP 2, EVIDENCE_BAG 1, CLUE_BOARD 2, CRAYON 2
- other metaphors: VAULT 1, PILL_BOTTLE (giant) 1, BLANKET_FORT 2, GAVEL 1, SCROLL 1, MEGAPHONE 2, FISHING_ROD 1, RED_PEN (giant) 1, CUSHION (giant) 1, ICEBERG + ROWBOAT 1, SEESAW + BOULDER 1, SPOTLIGHT 3, UMBRELLA 2, SAND_TIMER 2, DOTTED_OUTLINE 1, SARAH_OUTLINE 1

These are adult-world objects used as gags or metaphors, which is the right register. MAGNIFIER (7) and the spine JAR (41) are the recurring ones; §6 covers them.

**Real everyday objects (mature, 26 keys):**
- PHONE 24, TEST 10, PENCIL 7, KEYS 7, BILL 4, HOMEWORK 3, FROG 3
- FORM, MILK_GLASS ×2, JUICE ×2, WATER_BOTTLE, SKATEBOARD ×2, HEADPHONES, FOOTBALL ×2, SON_CHAIR ×2, COOKIE, CAKE, SPADE, TOY_BOX, PARTY_HAT, SUITCASE, ROCKING_CHAIR, TEACUP, STOPWATCH

### 5b. Overlay symbols (pops, not props)

17 pop-ins are emoji-style icons:
- HEART_POP 3 (S1 S13 S205)
- CROSS 3 (S3 S4 S11)
- CONFETTI 3 (S110 S181 S207)
- SPARKLE 3 (S118 S125 S154)
- SIREN (S24), QUESTION (S26), LIGHTNING (S102), SWEAT (S107), CLOUD_ICON (S167)

10 more frames use thought or speech bubbles holding drawings or scribbles: S6 S8 S48 S79 S87 S88 S89 S103 S201 S216.

Childish props, emoji pops and picture bubbles together: **49 frames (21%)**.

**Proposal:** remove HEART_PHONE, HEART, the gold-star family and the smile mask. Use a real equivalent:
- a grade written as a red circle with a crossed-out answer
- a real framed certificate
- a forced smile on the actual face

Swap heart, sparkle and confetti pops for a reaction pop (a raised eyebrow insert, a sweat-drop-free freeze) or a single key word (§8). Keep the metaphor props, which carry the strongest ideas.

---

## 6. Visual metaphors

**Volume:**
- 103 frames carry a `metaphor` key across **29 metaphor families**. 22 of those frames are the jar.
- 21 frames use the METAPHOR_OBJECT/WORLD devices.
- 21 frames have a non-ordinary scale (13 DOMINANT, 8 OVERWHELMING).
- A new metaphor family is introduced on average every **~8 frames (~18 s)**, but there are two 21-frame gaps (~46 s): S110→S131 and S171→S192.

**Test applied** (§F, Video 4 / Video 1 notes: "amplify rather than illustrate"; "visualise the message in a surprising way, not exactly what the VO says"):
- **A = amplifies**: the image adds a twist, an exaggeration or a consequence not in the words.
- **I = illustrates**: the image draws the noun or verb the voice-over already says.

| Family | Frames | Line (key) | Verdict |
|---|---|---|---|
| jar (spine) | S2 S5–S10 S17 S41–S43 S70 S72 S93–S94 S153 S175–S176 S189 S193 S224 S230–S232 + 7 chapter openers | "still hiding things" / "carry it alone" / "not small" / "removes a weight" | **Mixed.** A: S2 (jar behind his back during the hug), S72 (frog jar becomes the secret), S189 (buried), S230–S231 (opened). I: S43 (carry), S70 (not small → giant), S93 (weight → on his back). Openers are labels. |
| giant-fears | S3, S11 | "Not drugs" / "distrust" | I (giant pill bottle) / A (vault, humour) |
| thin-ice | S14, S61 | "disappointing them feels terrifying" | **A** |
| fix-it | S21 S24 S25 S28 S30 S38–S40 | "not fix me" / "parent brain activates" / "federal investigation" / "pull out a whiteboard" | Mixed. A: S21 (spanner to his head), S28 (buried in spanners). I: S24 (alarm), S30 and S38–S40 (the voice-over says investigation and whiteboard; the joke is in the line) |
| blanket-fort | S34, S222 | "sit inside this feeling" | I (literal "inside"), warm and readable |
| giant-phone | S45, S47 | "your phone is more interesting than me" / "not deliberately ignoring" | **A**. But S45 repeats the Video 4 example Thomas cited ("giant phone pulling the character in", §F) |
| shrinking-story | S56 S57 S59 | "Uh-huh" / "They keep talking" | **A** |
| door (over years) | S65–S67, S208, S226 | "Mom's busy" → "She wouldn't understand anyway" | **A**, and it evolves (§A.11) |
| stress-knot | S75 | "Your stress becomes my stress." | I (stress = tangle) |
| detective | S76 S90 S100 S123 S170 | "emotional detectives" / "Did I do something?" / "evidence" / "experts at reading approval" | Mixed. I: S76, S123. A: S90 (turns the magnifier on himself) |
| smile-mask | S82–S83, S180 | "says she is fine" / "the version they think you love most" | I, and a generic symbol (§5) |
| imagination | S85 S86 S92 | "imagination fills the gap" / "something worse" | I |
| night-fears | S87–S89, S98 | "Are we losing the house?" … | I (thought-bubble pictures of the quoted words) |
| adult-shelf | S91 | "You do not have to tell children every adult problem." | **A** (bills put on top of the fridge, out of reach) |
| weight | S101 | "That last sentence can matter more than you think." | **A** (a small bubble outweighs a boulder), but diagrammatic |
| measuring | S105–S108 S115 S122 S124 S127–S129 | "Your brother was reading at your age" … "a different person" | **A**, the best-developed recurring device (the marks evolve to S129's skateboard mark) |
| kevin | S110–S114 | "Cousin Kevin. Perfect grades…" | I (literal list gags), humour carried by the line |
| judge | S131, S132 | "You forgive yourself faster than you forgive me." | **A** |
| landing | S142, S143 | "Adults receive context. Children receive correction." | **A** (cushion vs red circle) |
| gold-seam | S145–S146 S149–S152 S223 | "not perfection. It is recovery." | **A** (statue → kintsugi) |
| iceberg | S157 | "This is deeper than grades." | I (cliché for "deeper") |
| frozen-moment | S164 | "They freeze for half a second" | A (time-stop on a real spill) |
| weather | S167 | "checking the emotional weather" | I (umbrella for "weather"), witty |
| spotlight | S171–S173, S204 | "love seems brightest after achievement" / "what happens when achievement disappears" | I → A (the beam vanishing) |
| spikes | S192 S214 S225 | "you love me most when I'm hardest to love" | **A** |
| inner-child | S201, S202 | "underneath … a quiet question" | I |
| juggle | S215 | "All three things can be true." | I, with generic props (heart, stop sign) |
| moments | S220 | "enough moments that tell them" | I (marbles) |
| fading | S227–S229 | "may forget the toy…" | real staging, not a metaphor |

**Tally of the 28 metaphor families** (fading excluded): **12 amplify**, **11 illustrate**, **5 mixed**.
- The amplifying families are the most memorable and cluster in Ch01–Ch05 (thin ice, the door over the years, the measuring marks, judge, landing, kintsugi, spikes).
- The illustrating ones mostly repeat a word the voice-over says: weather, deeper, inside, weight, detective, evidence, imagination, underneath.

**Proposal:** for every illustrating metaphor, push one step past the noun. For example:
- S157: instead of an iceberg for "deeper", SON hands over a test and MOM's eyes go to *his face*, not the paper.
- S167: instead of an umbrella for "weather", SON pauses outside the kitchen and listens to how hard the cupboard doors close.

Retire generic tokens inside metaphors (heart and stop sign in S215).

---

## 7. Humour beats

The build labels 18 frames `humour:`. Reading the frames found 5 more that work as humour but carry no label (S39 S113 S121 S141 S219). **23 beats in total (10% of frames).**

| Ref | Line | Beat | Type |
|---|---|---|---|
| S11 | "because they distrust their parents." | SON behind a bank-vault door | gag (metaphor) |
| S21 | "not fix me." | MOM aims a spanner at SON's head | gag (metaphor) |
| S24 | "your parent brain activates." | head snaps up, siren pop | exaggerated parent reaction (§A.8) |
| S28 | "Here's what you should do tomorrow." | SON buried in spanners | gag / parent over-helping |
| S30 | "…launched a federal investigation." | pinboard, string, interrogation lamp | gag set-piece |
| S38 | "…pull out a whiteboard." | DAD plants a whiteboard | gag |
| S39* | "I've identified four efficiency improvements." | DAD presenting, MOM's over-the-shoulder stare | parent overthinking + stare (subtle) |
| S40 | "You would probably throw away the whiteboard." | whiteboard swung toward the window | slapstick |
| S58 | "Really?" | eyebrows jump, eyes stay on the phone | **say/do contradiction (subtle)** |
| S108 | "…more like your cousin?" | gold star above the door frame | gag (symbol) |
| S109 | "Ah yes." | MOM, deadpan presenter on a stage | **short deadpan reaction (subtle)** |
| S110 | "Cousin Kevin." | Kevin on a podium | gag |
| S113* | "Six-figure job." | Kevin on a coin tower | gag |
| S114 | "Apparently invented sleep." | golden pillow trophy | gag |
| S121* | "Week." | star frames cover the wall, MOM sunk to her eyes | gag + reaction |
| S122 | "Eventually you do not become Sarah." | MOM stuck in a ponytail-shaped hole | slapstick |
| S131 | "You forgive yourself faster" | MOM as a breezy judge over her own spill | contradiction (metaphor) |
| S134 | "Oops." | DAD's sheepish shrug | **reaction (subtle)** |
| S137 | "Mom loses her keys." | the keys hang from her own bun | **say/do contradiction (subtle)** |
| S141* | "Kids notice this." | SON's one-eyebrow side-eye at DAD | **"seriously?" look (subtle)** |
| S195 | "The eye roll." | pupils pressed to the top | teen reaction (exaggerated) |
| S218 | "…never get angry." | muddy footprints, MOM's hands up, SON frozen on the last print | **exaggerated parent reaction (subtle)** |
| S219* | "They do not need perfect childhoods." | MOM and SON laugh at a lopsided cake | **shared laugh (subtle)** |

\* = not labelled in the build.

**Type split:** gag, slapstick or metaphor joke **12**; subtle human types from §A.8 **11**.

**Gaps in the §A.8 list:**
- awkward pause: **0**
- teen's "seriously?" look *at a parent*: 0 (S141 is aimed at DAD as a bystander; S195 is the only eye roll)
- parent overthinking something simple: 1 (S39)

**Distribution:** Ch01 has 8 and Ch04 has 6, but **Ch03 (30 frames, ~66 s) and Ch06 (35 frames, ~77 s) have none**. Longest stretches with no humour:
- **S141 → S195: 53 frames (~117 s)**
- S58 → S108: 49 frames (~108 s)

Six of the 12 gag beats cluster in two set-pieces: the fix-it run S21–S40 and the Kevin run S108–S122.

**Proposal:** one small human beat per ~20–30 s, drawn from §A.8:
- Ch03: S80 "The face you make after reading a message." could carry MOM's over-the-top "fine" smile snapping on when she notices SON.
- Ch06: S182 "Absolutely." could show MOM's pride turning into a slightly too-big fist pump, or S170 MOM catching SON's magnifier stare with a raised eyebrow.
- Add one awkward pause (two people, same frame, both start to speak).

---

## 8. Text moments (`keyword` field)

The build has 11 text moments (§G). Times assume ~2.2 s per frame.

| Ref | ~Time | Word | Line | Judgement |
|---|---|---|---|---|
| S19 | 0:40 | NUMBER ONE | "Number one." | chapter label: navigation, not an idea word |
| S44 | 1:35 | NUMBER TWO | "Number two." | label |
| S74 | 2:40 | NUMBER THREE | "Number three." | label |
| S104 | 3:47 | NUMBER FOUR | "Number four." | label |
| S130 | 4:44 | NUMBER FIVE | "Number five." | label |
| S146 | 5:19 | **RECOVERY** | "It is recovery." | **Good.** One word, the chapter's thesis, on the kintsugi peak |
| S155 | 5:39 | NUMBER SIX | "And now number six." | label |
| S167 | 6:07 | EMOTIONAL WEATHER | "…checking the emotional weather." | Weak. A two-word phrase that echoes the line and its umbrella metaphor; it decorates rather than sharpens |
| S190 | 6:56 | NUMBER SEVEN | "And number seven." | label |
| S215 | 7:50 | ALL THREE | "All three things can be true." | Weak. "ALL THREE" carries no meaning without the line |
| S230 | 8:24 | **SAFE** | "…how safe it felt..." | **Good.** On Thomas's list, at the payoff |

**Findings:**
- Only **4 idea words** in ~8.5 min, and **none before 5:19**. The first five chapters carry only number labels.
- Only **1 of Thomas's 11 example words** is used (SAFE). The 7 number cards all share the same jar layout (§1), so the label is the only change between them.
- Several lines say one of Thomas's words or a close relative with no text on screen:
  - S20 "…I need you to **listen**," (0:42)
  - S68 "…perfect **attention**." (2:27)
  - S92 "But **silence** is not always protection." (3:20)
  - S96 "but you are **safe**." (3:29)
  - S178 "…stopped **trusting** you." (6:29)
  - S184 "…make failure **safe** enough to tell you about." (6:43)
  - S224 / S231 "…the **truth**" (8:11, 8:26)

**Proposal** (one word per chapter, at the emotional turn, never on a label frame; all words are from Thomas's list or his line):

| Chapter | Ref | Word |
|---|---|---|
| Ch01 | S20 | LISTEN |
| Ch02 | S68 or S53 | ATTENTION |
| Ch03 | S92 | SILENCE ≠ SAFE (or OVERWHELMED at S86) |
| Ch04 | S129 | DIFFERENT, or NOT COMPETING at S127 |
| Ch05 | S146 | RECOVERY (keep) |
| Ch06 | S169 | TESTING (he is testing the reaction), with SHAME as an option |
| Ch07 | S211 | NOT REJECTION |
| Ch08 | S230 | SAFE (keep), with HONESTY or TRUTH as an alternative at S231 |

Swap EMOTIONAL WEATHER and ALL THREE for MISREAD (S103, if the misread-silence scene from §4 is used). That makes 8–9 idea words, roughly one every 55–60 s.

---

## 9. Contrast and pattern interrupts across time

What counts as a switch between frame *n−1* and frame *n*:
- a **scale jump** of ≥ 3 steps on the scale WIDE 0 · MEDWIDE 1 · MEDIUM 2 · CLOSE 3 · HUGE face 4 · XCLOSE 4.5 · eyes-only 5 (HANDS/OBJECT count as 3.5)
- a **cut into pure white**
- a **cut into a full-colour field** (mood DARK, TENSE, ICY or BRIGHT; this approximates §G's 39)
- a **humour beat** (§7)
- an **idea word** (§8; number labels are counted separately)
- a **new metaphor** family, or a giant (OVERWHELMING) object

| Switch type (§A.10/§A.15) | Count | Where |
|---|---|---|
| Wide/medwide → XCLOSE / eyes / huge face | **5** | S3>S4, S22>S23, S45>S46, S164>S165, S185>S186 |
| XCLOSE / huge → wide/medwide | 6 | S1>S2, S33>S34, S53>S54, S90>S91, S156>S157, S195>S196 |
| Any scale jump ≥ 3 steps | 26 | |
| Cut into pure white | **14** | S11 S20 S23 S31 S33 S46 S90 S130 S141 S156 S165 S169 S180 S182 |
| Cut into a full-colour field | 18 (+2 full→white) | for example S79 (night), S171 (dark stage), S194 (berry) |
| Serious → humour | 23 | §7 |
| Idea word on screen | 4 | S146 S167 S215 S230 |
| New metaphor family / giant object | 29 / 8 | §6 |
| Visual silence (SILENT_BEAT) | 11 | S16 S31 S33 S46 S164 S165 S168 S178 S188 S191 S202 |

**Stretches of 30 s or more without a strong switch.** The answer depends on what counts:
- **All switch types counted** (including colour-mood changes and new metaphors): no gap is longer than 7 frames (~15 s, S123–S129). Something changes often.
- **Excluding new metaphors and cuts into dark** (only scale, white, humour, idea text, giant): 1 stretch ≥ 30 s, **S71–S85 (15 frames, ~33 s)**, the frog, then the jar, then the stress chapter. Next longest: S95–S107 (13 frames, ~29 s).
- **Only the hard visual switches Thomas names** in §A.15 (sudden white, extreme close-up, one-word text):
  - **S92–S129: 38 frames (~84 s)** (end of Ch03 plus all of Ch04)
  - **S55–S89: 35 frames (~77 s)** (most of Ch02 and Ch03)
  - S216–S229: 14 frames (~31 s)

**Gaps in the strongest devices:**
- **No pure-white frame in the last 50 frames (S183–S232, ~110 s).** None either between S46 and S90 (43 frames, ~95 s).
- The largest gaps between big-face moments (XCLOSE / eyes-only / HUGE) are **S99 → S156 (57 frames, ~2 min 5 s)** and S53 → S90 (37 frames, ~81 s). Ch04 and Ch05 contain no huge face or eyes-only frame at all.
- **Switch density by minute** (frames with any switch, of the frames in that minute):

| Minute | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| Switches | 18/27 | 17/27 | 13/27 | 13/28 | **8/27** | **9/27** | 19/27 | 13/28 | **6/14** |

Minutes 4–5 (Ch04 end and Ch05) and the closing minute are the flattest.

**Proposal:**
- Put a hard switch (white extreme close-up, idea word or reaction face) at least every ~25 s.
- Specifically: one huge-face or eyes-only frame in Ch04 (S106 "Your brother was reading at your age." → SON's eyes sliding down) and one in Ch05 (S140 "You need to be more responsible." → SON's face, huge, on white).
- Give the closing chapter a white-background close-up before the final hug (S224 "You can tell me the truth here.").

---

## 10. Before / after examples (proposal; voice-over lines unchanged)

Every "after" uses a white or near-white background with outline-only furniture (§C), unless stated. The one strong colour sits on the emotional object.

| # | Ref · line | Current staging (one sentence) | Problem | **Proposal** |
|---|---|---|---|---|
| 1 | **S4** · "Not secret relationships." | XCLOSE of MOM's narrowed eyes over THE HEART PHONE lying face up (cool son-room). | The exact heart-phone symbol Thomas rejected (§A.2) | **Object close-up on white:** SON's thumb flips his phone face-down on the table a beat too fast. The only colour is a thin turquoise screen glow. Edit: MOM's single raised eyebrow enters from the top edge. *Child hides something.* |
| 2 | **S75** · "Your stress becomes my stress." | MEDWIDE kitchen: MOM grips the counter with a big indigo STRESS KNOT over her head; a small knot forms over SON across the room. | Symbol in place of behaviour; faces small | **Two layers, close:** in the foreground MOM's hand white-knuckled on the phone, jaw tight, shoulders up. In the background SON at the table outline, spoon stopped mid-air, *his shoulders rising to the same height as hers*. The posture copies hers; no knot. |
| 3 | **S77** · "They notice the silence between parents." | MEDIUM square shot: MOM and DAD at opposite ends of the table with THE EMPTY SPEECH BUBBLE over SON. | Icon for silence (§A.2); an "awkward silence" is in §A.7 | **Wide on white with one table outline**, a huge gap between MOM and DAD. DAD reaches for the salt; MOM slides it over without looking up. Edit: SON's pupils go left, then right. Silence is shown by empty space and no eye contact. |
| 4 | **S82** · "They notice when Mom says she is fine in a voice" | MEDIUM across the table: MOM holds a paper-plate SMILE MASK on a stick; SON looks at it. | Craft-class prop where §A.7 lists "I'm fine" | **CLOSE on MOM, white with a pale blush behind her:** a bright, too-wide smile, red-rimmed eyes, and one hand scrubbing an already clean pan too hard. S83 edit: the smile drops for half a second when she turns away, while SON's side-eye sits large in the foreground. *Says-vs-does contradiction (§A.8).* |
| 5 | **S98** · "but we're working through it." | MEDIUM: MOM and DAD side by side at the table, each pushing half of THE TORN PHOTO together; SON behind DAD. | Side-by-side posing over a symbol | **CLOSE on hands, then faces:** DAD slides his coffee mug across to MOM; MOM's fingers rest on his for a second. Edit: SON in the doorway outline lets his shoulders drop. Real repair behaviour (§A.3). |
| 6 | **S106** · "Your brother was reading at your age." | MEDIUM low angle at the doorframe: MOM taps a high mark beside a tiny book drawing; SON stands with both hands at his sides. | "Just stands" (§2); repeated layout (S106/S107/S124/S128) | **Low CLOSE from SON's height on white, doorframe as two lines:** SON's face fills the lower half, eyes sliding down and away, chin tucking, swallowing. Only MOM's hand and pencil enter top-left, tapping the high mark (emerald pencil is the colour). |
| 7 | **S108** · "Why can't you be more like your cousin?" | MEDWIDE low kitchen: MOM points at THE GOLD STAR stuck far above the doorframe; SON cranes up. | Gold-star sticker (§5); no human humour | **CLOSE reaction on white:** SON's "seriously?" look (one eyebrow up, flat mouth, slow blink) at MOM's phone, pushed into frame from the left. The phone shows a framed photo of a beaming cousin with a certificate (no words). *Teen "seriously?" look (§A.8).* |
| 8 | **S119–S120** · "Every." / "Single." | Two identical MEDIUM office frames: BOSS beside the desk points at a star frame; MOM sits upright. (S120 is an edit-only re-use.) | Same composition twice in a row (§1) | **Escalate by camera instead of repeating:** S119 MEDIUM, BOSS's finger jabs at one framed certificate. S120 **HUGE face on white**: MOM's eye twitches, her smile held too long. Then S121's wide wall reveal lands as a contrast. |
| 9 | **S177** · "Not because your child stopped loving you." | CLOSE: SON kneels at his bed colouring a big raspberry HEART on a card. | Childish symbol; love as an icon (§A.2–3) | **MEDIUM-CLOSE, kitchen as outlines:** SON silently sets a mug of tea next to MOM's laptop and is already turning away before she looks up. Edit: MOM's hand pauses on the keys, and a small surprised softening shows in her face. Love shown through behaviour. |
| 10 | **S215** · "All three things can be true." | MEDIUM in a beige field: MOM juggles a STOP PADDLE, a SAND TIMER and a HEART; SON watches, "amazed", arms at his sides. | Generic props; illustrates "three"; SON inert | **CLOSE face + hands on white:** MOM's one palm raised flat (the boundary), her other arm round SON's shoulders (the love), her eyes level and calm. The sand timer stands on the table edge between them (the pause) and is the only coloured object. SON leans in a few degrees. Three truths in one real gesture; the idea word could become **NOT REJECTION** (§8). |

---

## Summary of key numbers

- Two characters on either side of the frame: **69 frames (30%)**. MOM is on the left in 74% of the MOM–child pairs. "MOM left · object · SON right" appears **33 times**.
- Camera at eye level: **71%**. The kitchen set holds **36%** of frames, and 41 frames reuse one kitchen master.
- Shot + angle never repeats more than twice in a row.
- **6 of the 7 chapter openers** are the same centred jar picture.
- 82% of performances follow one template. Head position is named in 19% and posture in 15%.
- 57 frames show a NORMAL-size face at MEDWIDE/WIDE.
- 123 multi-character frames: mutual eye contact **32%**, person-to-person touch **18%**. **42%** have no gaze, touch or reach.
- Real staging: **46%** of frames. Symbol 29%, metaphor 21%, abstract 5%. The hook has 2 real frames out of 14. Four §A.7 situations are absent.
- Childish/generic props, emoji pops and picture bubbles: **49 frames (21%)**. This includes the HEART_PHONE (S4) and a heart on the kintsugi mug.
- Metaphor families: 28. **12 amplify, 11 illustrate, 5 mixed.**
- Humour beats: 23, split 12 gags and 11 subtle. **No humour beat in Ch03 or Ch06.** The longest gap is ~117 s.
- Idea words on screen: **4**. None appear before 5:19, and only SAFE is from Thomas's list.
- Hard switches (white, extreme close-up, text) are missing for **84 s (S92–S129)** and **77 s (S55–S89)**. There is no white frame in the last ~110 s.
