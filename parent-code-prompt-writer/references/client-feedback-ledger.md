# Client feedback ledger — every point, and where it lives in the skill

Every instruction Thomas gave from the 5 Oct summary to the Video 08 approval (9 Oct 2026), and Muhammad's own decisions,
each traced to the rule that applies it and the check that guards it. Read it before a new video to see the whole standard
in one place, and after a feedback round to add the new points (one row per point, the date, the exact words).

Status: **Rule + check** — in the rules and enforced by a script · **Rule** — in the rules, judged in the read-through ·
**Superseded** — replaced by a later point (named) · **Production** — Photoshop or Premiere work, outside the prompts ·
**Test case** — a single-scene fix kept in `assets/v24-samples/video08-regression/`.
Files: V24 = `references/v24-standard.md`, V19 = `references/v19-principles.md`, RC = `references/RULES-CARD.md`.
Checks: `qa-v24`, `qa-v19`, `qa`, `qa-contradictions` (scripts/…cjs).

---

## A. Thomas, 5 Oct — the summary he approved after "Seven Things"

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| A1 | "stronger facial expressions" | V19 §3; V24 §5 | qa-v19 seven features | Rule + check |
| A2 | "more real interaction between characters" | V19 §3 | qa-v19 `ia` + `dist` | Rule + check |
| A3 | "more camera proximity" · "more close-ups" | V19 §2; V24 §5–§6 | qa-v24 attention punch | Rule + check |
| A4 | "stronger gestures and body language" | V19 §3 | qa-v19 seven features | Rule + check |
| A5 | "more relatable everyday situations" | V19 §4; `everyday-situations-v19.md` | — | Rule |
| A6 | "better and more mature props" | V19 §4; `props-symbols-metaphors-v19.md` §1 | qa-v19 symbol props | Rule + check |
| A7 | "more humor" | V19 §5; V24 §4 | — | Rule |
| A8 | "stronger visual metaphors" | V19 §4; V24 §4 | qa-v24 metaphor entrance | Rule + check |
| A9 | "more contrast throughout the video" | V19 §5; pass C | qa-v19 `cx` | Rule + check |
| A10 | "intentional text moments" | V24 §7 | qa-v24 words | Rule + check |
| A11 | "less repetition in framing and composition" | V19 §2; pass G | qa-v19 composition repeat, back-to-back change | Rule + check |

## B. Thomas, approving the Video 08 plan ("Exactly, Muhammad…")

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| B1 | "build the next video as a new standard rather than just adding random visuals" | V24 §15; SKILL.md | — | Rule |
| B2 | "Every scene should have a clear purpose and support the story, emotion, or message." | V19 §0.5; plan `ft`, `y` | qa-v19 `ft` on every frame | Rule + check |
| B3 | "Close-ups, stronger facial expressions, character interactions, purposeful visual metaphors" | V19 §2–§4; V24 §4–§5 | as A1–A8 | Rule + check |
| B4 | "the balance between minimal white scenes and environmental scenes" | V24 §2 | qa-v24 white moment per chapter | Rule + check |
| B5 | "If we now apply these new standards consistently, we can develop a truly unique and recognizable style." | V24 §1; RC | the whole suite | Rule |

## C. Thomas, 6 Oct (T1) — "the best version I have seen from you so far"

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| C1 | "think psychologically when using colours… create life, action, emotion and light. They should not just be decoration." | V24 §3 colour table, §2a stage colours; `COLOUR_LOGIC`, `EMOTION_FIELD` | the colour reason is shown on the Copy page (not judged by a script); qa-v24 phones purple | Rule (shown) |
| C2 | Yellow attention/energy/surprise · red danger/stress/conflict · green energetic/positive/unexpected · blue calm/trustworthy/digital · dark violet for a smartphone | V24 §3 (blue for digital refined by T3: purple for phones) | qa-v24 phones purple | Rule + check |
| C3 | "not everything should be colourful. The clean white background is very good and should stay." | V24 §2; `CLEAN_GROUND` #F7F6F3 (the approved clean warm white) | qa-v24 white ground | Rule + check |
| C4 | "because the background is simple, selected colours can become much more powerful" | V24 §3 bright focus | qa-v24 at most two coloured objects | Rule + check |
| C5 | the helicopter "large exaggerated yellow or bright green… behind the character for a few seconds… does not always have to look completely realistic" | V24 §4 exaggerated cutaways; sample S2 | — | Rule |
| C6 | "the fire could easily be twice as big… Important objects should sometimes dominate the scene for a moment." | V24 §4; `SCALE.DOMINANT` | qa-v24 oversized needs an object | Rule + check |
| C7 | "the short words and visual text moments we discussed are still missing. Please include them strategically" | V24 §7; director's read 11 | qa-v24 words | Rule + check |
| C8 | "push the colours, objects, exaggeration and text moments further so the visuals feel even more alive and memorable" | V24 §3, §4, §7 | — | Rule |

## D. Thomas, 7 Oct (T2)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| D1 | "colors are not simply used more, but… intentionally and psychologically" | V24 §2a, §3 | the colour reason is shown on the Copy page; qa-v24 INTENSITY | Rule + check (v25) |
| D2 | "Important objects, actions, or surprising moments can deliberately be brighter" | V24 §3 bright focus; `mk` for actions (beside a focus too, v25); §2a, §14 aha | qa-v24 peaks reach colour | Rule + check (v25) |
| D3 | "text moments: fewer, but exactly at the right moments" | V24 §7 | qa-v24 words land on their word | Rule + check |

## E. Thomas, 8 Oct 13:07 (T3) — eight general points

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| E1 | "Keep the current hand-drawn stick-figure style. Avoid overly polished or AI-generated-looking visuals." | V24 §5; SINGLE_FRAME "never glossy, never vector-perfect or AI-polished" | — | Rule |
| E2 | "facial expressions, larger heads, expressive eyebrows, active hands, exaggerated reactions, and natural character interactions" | V24 §5 ("larger heads" = sudden close-ups, Muhammad 9 Oct) | qa-v24 attention punch; qa-v19 seven features | Rule + check |
| E3 | Yellow surprise/energy/discoveries · red conflict/frustration/danger · blue trust/safety/calmness · purple smartphones/digital distractions · green positive development/selected objects | V24 §3; `COLOUR_LOGIC` | qa-v24 phones purple | Rule + check |
| E3b | "Our backgrounds should remain white and minimalistic, but key objects and emotional moments need stronger, brighter colors." | V24 §2a (white by default, the stage converts at intensity), §3 "emotional moments carry colour too" (`mk`, `li`, `pc`) | qa-v24 INTENSITY | Rule + check (v25) |
| E4 | "We do not want everything colorful. Use bright colors strategically to create contrast, attract attention, and strengthen emotions." | V24 §3 | qa-v24 at most two coloured objects | Rule + check |
| E5 | "Objects can also become two or three times larger when it improves the storytelling." | V24 §4; `SCALE.DOMINANT` | — | Rule |
| E6 | "Use dramatic close-ups, exaggerated reactions, expressive eyes, active hands, and stronger emotional contrasts. Humor and exaggeration are essential parts of our channel identity." | V24 §4–§5, §14 | qa-v24 peaks have a close-up | Rule + check |
| E7 | "Aim for a meaningful visual change approximately every 3–5 seconds… every movement should support the story. Avoid unnecessary animation." | V24 §6 | qa-v24 long-holding stills (timed from the word count — an estimate, never a measurement) | Rule + check |
| E8 | "different camera angles, zooms, reactions, object movements, and surprising visual elements" | V24 §6, §14; edits; `zm`; inserts `I()` (v25) | qa-v24 reframes, the same move four in a row, inserts | Rule + check |
| E8b | "different camera angles" | V24 §6 "different angles, all natural" | qa-render-risk natural angles | Rule + check |
| E9 | "clean, bold, highly readable text that works immediately, even on mobile devices" · "sophisticated does not necessarily mean more effective" | V24 §7; `HAND_LETTER` | qa-v24 presentation fonts | Rule + check |
| E10 | "distinguish between professional section headings and short, emotional keywords" | — | — | Superseded by I1–I4 and N4 (no section headings) |
| E11 | "Use text to strengthen important psychological moments, not simply decorate the scene." | V24 §7 | qa-v24 words | Rule + check |
| E12 | "stronger contrasts between frustration, sadness, humor, surprise, and positive emotional moments… immediately feel what the characters are experiencing" | V24 §8, §14 | — | Rule |
| E13 | "consistent character proportions, line thickness, facial features, colors, and object styling" | V24 §5; RECURRING_CONSISTENCY | qa, qa-consistency object locks | Rule + check |
| E14 | "approximately 8:57 is absolutely fine… up to 9:00 minutes" | RC §1 | — | Rule |
| E15 | "Every scene should create emotion, provide value, build curiosity, or entertain." | V24 §8; plan `ft` | qa-v19 `ft` | Rule + check |
| E16 | "establish a consistent visual standard that we can apply from the beginning of every future production" | SKILL.md; this ledger | — | Rule |
| E17 | "Our goal is to create a recognizable animation style that combines psychology, emotions, humor, and excellent viewer retention." | V24 §1 | — | Rule |
| E18 | "Please keep the strong elements of this version. We do not need to redesign everything. We need to refine the details." · "I can clearly see the improvements in character interactions, facial expressions, humor, exaggeration, and overall visual storytelling" | V24 §10 (what stays); SKILL.md revisions | — | Rule |
| E19 | Muhammad, 8 Oct 01:24: "i have added much sophisticated text font… As our videos target adults" | — | — | Superseded by E9 ("sophisticated does not necessarily mean more effective") and I2 |

## F. Thomas, Frame.io timestamp notes on Video 08 (T4)

Every note, the general rule it shows and where that rule lives: **V24 §16** (one row per note, with the exact words).
The single-scene fixes are test cases in the regression sample (V24 §12). Summary:

| # | Note | Status |
|---|---|---|
| F1 | 00:00 campfire — opening attracts attention, emotional reaction | Rule + check (qa: frame 1 is a hook) + test case S1 |
| F2 | 00:20 phone strong purple; child's reaction exaggerated | Rule + check (phones purple) + test case S3 |
| F3 | 00:30 calm indoor vs exaggerated playground | Rule (V24 §8) |
| F4 | 00:50 mother's eyes, eyebrows, head position | Rule + check (seven features) |
| F5 | 01:10 selfie and basketball: humour, stronger movement, reactions | Rule (V24 §6 action sequences, §3 drawn marks) |
| F6 | 01:40 night phone glow | Rule + compiler + test case S5 |
| F7 | 02:10 oversized F, brighter red | Rule + `ol` + test case S6 |
| F8 | 02:30 crying child: dramatic close-up, phone stands out | Rule + check (peaks have a close-up) |
| F9 | 02:50 hug, piano, achievement: warm accents, rewarding | Rule (V24 §3, §14) + test case S10 |
| F10 | 03:50 frustration → positive: contrast and timing | Rule (V24 §8) |
| F11 | 04:30 DIGITAL FOOTPRINT text ordinary | Rule (V24 §7, refined by I1–I4) |
| F12 | 04:40 absent parent: grey, loneliness | Rule (`mu`) + test case S9 |
| F13 | 05:10 sadness; calendar as missing time | Rule + test case S9 |
| F14 | 06:00 father's face further; bike sequence clear | Rule (V24 §6) + test case S7, S8 |
| F15 | 06:30 framing variety; positive looks different | Rule (V24 §6, §3) |
| F16 | 07:20 dials: surprising transition | Rule + check (metaphor entrance) |
| F17 | 07:40 dial settings vs conflict | Rule (V24 §4) |
| F18 | 08:10 positive interaction: highlights | Rule (V24 §3, §14) |
| F19 | 08:50 WHICH DIAL?: readable on mobile, short, no outro | Rule + check + test case S11 |
| F20 | Main priorities (typography, expressions, colour, variety, hand-drawn style) | Rule + checks as above |
| F21 | "targeted improvements, not a request to rebuild… preserve the elements that already work well" | Rule (SKILL.md revisions) |
| F0 | "The overall visual direction is improving. Please focus on refining these specific moments while keeping everything that already works well." | Rule (SKILL.md revisions; V24 §10) |

## G. Muhammad, 8 Oct 19:30 — the standard he promised Thomas

| # | Muhammad | Status |
|---|---|---|
| G1 | "White, minimal backgrounds, with bright colour used only where it matters" + the colour map | Rule + check (C3, C4, E3) |
| G2 | "Key objects up to 2–3× larger when it helps the story." | Rule (E5) |
| G3 | "Stronger expressions and more emotional close-ups." | Rule + check (E2, E6) |
| G4 | "A meaningful visual change every 3–5 seconds." | Rule + check (E7) |
| G5 | "Clean, bold text planned at the script stage: professional section headings, plus short emotional keywords" | Words planned in the director's read (row 11): Rule. Section headings: Superseded by I1–I4 |
| G6 | "Consistent characters, colours and objects from start to finish." | Rule + check (E13) |
| G7 | "Adding the new bold style onto frames that were already built didn't look natural, so I'd rather build it properly from the start." | Rule — words are planned in the director's read and written into the frame prompts (V24 §7) |
| G8 | 8 Oct 23:16: "Now the colours are much better, have better sharpness, contrast… before i was using sort of dull colours." | Rule — bright means saturated, crisp-edged, high in contrast (V24 §3; compiler "crisp-edged") |
| G9 | 9 Oct 01:01: "I have removed all unnecessary things… now every scene do show the visuals And our focus go directly to the action" | Rule — the question every frame answers first (V24 §2) |

## I. Thomas, 8 Oct 21:20 (T5)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| I1 | "I do not want these numbered section titles in the video. The numbers should be removed completely." | V24 §7 | qa-v24 numbers, section titles | Rule + check |
| I2 | "I also do not want this current font style with the clean presentation look, and the underline should be removed as well. It feels too cold, too formal and too much like a slide presentation." | V24 §7; `HAND_LETTER` | qa-v24 underline, presentation font | Rule + check |
| I3 | "I do not think we need to show full written section titles like this very often." | V24 §7 | qa-v24 section titles, long words | Rule + check |
| I4 | "short, meaningful words that feel playful, emotional and natural inside the scene… more hand-drawn, more alive… WAIT…, ENOUGH!, SAFE, TRUST, PRESSURE, WHY?" | V24 §7 | qa-v24 words; qa-v19 keyword checks accept … ! ? | Rule + check |
| I5 | "the colours still feel a bit too dry and slightly boring… they still need more life" | V24 §3 bright by default | — | Rule |
| I6 | "the colours can glow much more strongly, almost like a rainbow effect when it fits. Especially the important objects should stand out more and feel brighter" | V24 §3 drawn glow (`gl` halo, rays, rainbow) | qa-v24 glow belongs to a focus | Rule + check |
| I7 | "This does not mean making everything colourful all the time." | V24 §3, §9 | qa-v24 at most two coloured objects | Rule + check |

## J. Thomas, 8 Oct 23:58 (T6)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| J1 | "be careful not to fill each scene too much… The main focus must always remain on the characters and the important objects" | V24 §2; DETAIL_CAP; VISUAL ORDER | qa-v24 busy places | Rule + check |
| J2 | Campfire: "the ground does not also need to be colored. It is too much." | V24 §2; compiler (no floor plane) | qa-v24 no fills or floor planes | Rule + check + test case S1 |
| J3 | Books: "It is enough if the books are colorful… black and white is enough for those elements" | V24 §2–§3 | qa-v24 no fills; at most two coloured | Rule + check + test case S4 |
| J4 | Bike: "too much green… do not all need to compete with each other in similar strong colors" | V24 §2–§3 | as J3 | Rule + check + test case S8 |
| J5 | "The title text with the number must be removed." | V24 §7 | qa-v24 numbers | Rule + check |
| J6 | "not too many strong colored elements in the same scene… stronger contrast and better visual energy, while still keeping every frame clear, clean, and easy to read" | V24 §3 | qa-v24 at most two coloured objects | Rule + check |

## K. Thomas, 9 Oct 00:07 (T7)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| K1 | "remove the refrigerator completely… remove the kitchen furniture and cabinets… Keep only the window… black outlines on a white background" | V24 §2; `OUTLINE_GREY` #2B2B2B | qa-v24 busy places | Rule + check + test case S4 |
| K2 | "start making these creative decisions independently. Review each scene carefully and ask yourself whether every object is actually necessary. If an element doesn't contribute to the story, emotion, or visual understanding, simply remove it." | V24 §2 object necessity; SKILL.md step 3 and read-through | qa (props nobody uses); qa-v24 busy places | Rule + check |
| K3 | "clean, minimalist scenes with strong visual impact, not overcrowded backgrounds. Color should guide the viewer's attention toward the characters and important objects." | V24 §2–§3 | as above | Rule + check |
| K4 | "apply this principle consistently throughout the entire video and in all future projects, rather than waiting for me to point out individual objects" | SKILL.md; RC §0 | — | Rule |

## L. Thomas, 9 Oct 00:11 (T8)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| L1 | "You can simplify the existing scenes in Photoshop. Just make sure the final result stays clean and focused." | SKILL.md revisions (cheaper fixes in post) | — | Production |
| L2 | "use more zoom-ins, close-ups, and camera movements focusing on the characters, their facial expressions, and important objects" | V24 §6; `zm` | qa-v24 reframes; attention punch | Rule + check |
| L3 | "reuse the same material with different zoom levels and framing… without constantly creating new scenes" | V24 §6 reuse before regenerating; `zm`, CLARITY | qa-v24 reframes | Rule + check |
| L4 | "keep something visually interesting happening throughout the video without overcrowding it" | V24 §6, §2 | qa-v24 long-holding stills; busy places | Rule + check |

## M. Thomas, 9 Oct 00:13–00:17 (process)

| # | Thomas | Status |
|---|---|---|
| M1 | "apply everything we've learned from the very beginning in future videos. This will save us both time and avoid unnecessary revisions." | Rule — the read-through and checks run before delivery (SKILL.md) |
| M2 | "Once we've established the right style and you apply these guidelines independently, the process will become much faster" | Rule — this ledger and V24 are the guidelines |

## N. Thomas, 9 Oct 12:40 — approval and the five standards (T9)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| N1 | "Colors: Use stronger, brighter, and more vibrant colors on important objects to bring the scenes to life." | V24 §1, §3 | Copy page colour reason | Rule + check |
| N2 | "Zooms: Add more frequent zoom-ins and close-ups on faces, eyes, hands, and important objects." | V24 §1, §6 | qa-v24 reframes, attention punch | Rule + check |
| N3 | "Emotions: Avoid showing characters too small or too far away. Facial expressions and emotions must be immediately recognizable." | V24 §5; SHOT WIDE/MEDWIDE text | qa-v24 wide frames keep faces readable | Rule + check |
| N4 | "Text: No unnecessary numbering, large titles, or decorative elements. Only short, playful words when they genuinely support the scene." | V24 §7, §3 drawn marks | qa-v24 words | Rule + check |
| N5 | "Dynamic visuals: Keep scenes engaging through movement, camera changes, character reactions, and visual variety. Reuse existing visuals creatively through zooms and different framing." | V24 §6 | qa-v24 long-holding stills, reframes | Rule + check |
| N6 | "For the next production, I expect these improvements to be applied consistently from the start, without requiring repeated revisions." | SKILL.md | the whole suite | Rule |
| N7 | "You did a good job removing unnecessary numbers, distracting text, and extra graphic elements. The scenes now feel cleaner, more focused, and easier to follow." | V24 §3 drawn marks never decoration; §7 | qa-v24 words | Rule + check |

## O. Muhammad's decisions

| # | Muhammad | Where | Check | Status |
|---|---|---|---|---|
| O1 | 9 Oct: "Larger head means camera close or like the closeup to get a sudden visual change to grab the audience attention" | V24 §5, §13 | qa-v24 attention punch | Rule + check |
| O2 | 9 Oct: "need text in image prompts not seperate images" | V24 §7, §13; `kw`/`tx` lettered in; WORD frames lettered | qa-v24 words left for Premiere | Rule + check |
| O3 | 28 Sep (Video 05): "there should be no random scenes… each and everything must be organized" · "doesn't drift too much or get random. All scenes or story do still feel connected" | V24 §15; pass J; director's read row 0 | — | Rule |
| O4 | 28 Sep (Video 05): "Don't go according to percentage, just check where we need what" | V19 §0.2 | — | Rule |
| O5 | 5 Oct (v19): Thomas's words applied across the whole script, no overdoing, no undoing; plan before production; one pass | V19 §0; SKILL.md | — | Rule |
| O6 | 9 Oct, after the audit: "the default background is white… whenever a scene or a script segment occurs where we have to show the emotion intensity and the overall scenario then we do convert to colors to make the retention… staying minimalistic… we are not trying to go as a monotonous… fully engaged video" | V24 §2a (the intensity ladder), §14; RC §3; `pc`; style §1.3 | qa-v24 INTENSITY (peaks reach colour, a stage names its colour, one moment one colour, long colour runs, long white stretches); qa-contradictions (a focus or word in the field's hue) | Rule + check (v25) |
| O7 | 9 Oct: "don't try to show like too much furniture… just show the visuals that we have to show that can show the overall scenario" | V24 §2 (the fewest pieces); RC §3 | qa-v24 pieces by shot (close one slice, others three at most) | Rule + check (v25) |
| O8 | 9 Oct: the ground stays white — the clean warm white Video 08 was approved on (#F7F6F3) | V24 §2, §13; `CLEAN_GROUND` | qa-v24 ground; qa-contradictions (CLEAN called pure white) | Rule + check (v25) |
| O9 | 9 Oct: "about the Thomas time step… that's like misunderstanding it was like wrong" | V24 §13, §16 | — | Closed: the 02:10–03:10 gap was not a timing fault; `timestamp-map.cjs` stays as it is |
| O10 | 9 Oct: "the V23.1 and like release plan you can like go without it" | V24 §13 | — | Closed |
| O11 | 9 Oct: "analyze all the messages instructions like divide them and like work on it… implement it on the skill… the overall simple minimalistic but the best visuals" · "analyze all details, steps, and logics as we are performing a QA… do all things like each single thing" | v25 (CHANGELOG); `assets/v24-samples/video08-regression/TESTS.md` | every script | Done (v25) |

## P. Lessons from earlier videos that still hold

| # | Lesson | Where | Check | Status |
|---|---|---|---|---|
| P1 | A prop named after a character pulls that character in (Video 05) | V24 §4 | qa-v24 names in object texts | Rule + check |
| P2 | A fragment of an object along a close-up's edge reads as an error (Video 05) | V24 §6 | — | Rule |
| P3 | A motif's biggest picture spent early cheapens the peak (Video 05) | V24 §4 | — | Rule |
| P4 | Edits name only what is in the frame; no quoted words, "finger", anatomy or clothing words (Video 05) | RC §8 | qa edit checks | Rule + check |
| P5 | Coloured set pieces and floor planes, calm-by-default colour, underlined captions and numbered headings (Video 08 build) | V24 §11 | qa-v24 | Rule + check |
| P6 | Name the skill version in the first reply; an attached `.skill` wins (Video 05) | SKILL.md; RC §0 | — | Rule |
| P7 | Report every feedback point as done / partly / not, checked against the build (Video 05) | SKILL.md revisions | — | Rule |

## Q. The Video 05 chat (28 Sep – 3 Oct) — Thomas's and Muhammad's lines

Already absorbed by v16–v19; listed so nothing from that chat is lost. "Superseded" names what replaced it.

| # | Who, when | The line | Status |
|---|---|---|---|
| Q1 | Muhammad, 28 Sep | "Don't go according to percentage, just check where we need what, and what will be best to show the visuals" | Rule (V19 §0.2) |
| Q2 | Muhammad, 28 Sep | "I want my visual story, story, and visuals display best like there should be no random scenes… each and everything must be organized" | Rule (V24 §15) |
| Q3 | Muhammad, 28 Sep | "make it more expand… add more scenes… but it doesnt drift too much or get random. All scenes or story do still feels connected." | Rule (V24 §15, pass J) |
| Q4 | Muhammad, 30 Sep | "I dont want too much random colours… a better organized theme… not too less but also not too much… dont have weired colour combination" | Rule (V24 §3 one colour, one meaning) |
| Q5 | Muhammad, 30 Sep | "make the visual metaphor strong and each metaphor must makes sense according to the visual… no extra props… no complex themes… every scene must makes sense" | Rule (V19 §4; V24 §2, §4) |
| Q6 | Thomas, 30 Sep | "Less color, but use it more intentionally… 70–80% neutral and clean, 20–30% targeted color accents… Neutral first. Color with purpose. Never color just to fill empty space." | Rule (V24 §2–§3); the shares superseded by V19 §0.2 and the white stage |
| Q7 | Thomas, 30 Sep | "if the smartphone is important in a scene, it can be a strong turquoise" | Superseded by E3 (purple for phones) |
| Q8 | Thomas, 30 Sep | "The darker blue/grey tones in the nighttime scenes work very well" | Rule (NIGHT) |
| Q9 | Thomas, 30 Sep | "much bolder with objects and visual ideas… unusual visual metaphors and surprising objects… Pressure → a huge, heavy backpack… Lack of trust → a large wall… Phone addiction → an oversized smartphone… Time pressure → a giant clock… Too many messages → a huge mountain of messages" | Rule (V24 §4; `props-symbols-metaphors-v19.md` §5) — the examples are seeds, used only where they amplify |
| Q10 | Thomas, 30 Sep | "The goal is not simply to illustrate what the voice-over says. We need to visually amplify the voice-over." | Rule (`props-symbols-metaphors-v19.md` §5.1) |
| Q11 | Thomas, 30 Sep | "approximately every 20–30 seconds, I want a fresh visual stimulus" | Superseded by E7 (a change about every 3–5 seconds) |
| Q12 | Thomas, 30 Sep | "it should never become chaotic. Sometimes fewer elements are actually stronger" | Rule (V19 §0.8; V24 §9) |
| Q13 | Thomas, 30 Sep | "let's increase the percentage of visual metaphors even more" | Superseded by Thomas, 5 Oct: "The rule is not: every scene needs a metaphor" (V19 §4) |
| Q14 | Thomas, 1 Oct | "Make the objects more interesting and less generic" | Rule (props §1 characterful detail) |
| Q15 | Thomas, 1 Oct | "Some scenes still feel too empty or plain. Add more character to the surroundings, but keep the clean and simple style." | Superseded by J1–K3 (the fewest black-line pieces); the "character" now comes from the one characterful piece |
| Q16 | Thomas, 1 Oct | "replace normal explanatory scenes with more creative visual ideas. The domino scene is a good example" | Rule (V19 §4; the dominoes stay a seed) |
| Q17 | Thomas, 1 Oct | "Let the characters interact more with the objects… Instead of simply standing next to them" | Rule + check (qa: props nobody uses) |
| Q18 | Thomas, 1 Oct | "Add more visual movement… avoid a PowerPoint feeling. More should happen inside the scene." | Rule + check (edits, sequences, reframes; qa-v24 long-holding stills) |
| Q19 | Thomas, 1 Oct | "Use more interesting perspectives and compositions" | Rule + check (composition variety; natural angles) |
| Q20 | Thomas, 1 Oct | "instead of showing something like 'NOT UPSET' on a paper, try to communicate the same idea visually" | Rule + check (qa-v24: no labels on objects; words only as short playful moments) |
| Q21 | Thomas, 1 Oct | "When the narration says something powerful, the visual should also feel more powerful and memorable." | Rule (V19 §2 "important emotional lines should visually feel important"; V24 §16 peaks) |
| Q22 | Thomas, 1 Oct | "Add small creative or humorous visual moments" | Rule (V19 §5; V24 §4) |
| Q23 | Thomas, 1 Oct | "Keep the characters exactly in this direction" | Rule (characters locked to the references) |
| Q24 | Thomas, 1 Oct | the static vs movement examples ("The child looks at the phone → the mother enters → takes the phone → the child reaches for it → the mother reacts") | Rule (sequences; sample S3) |
| Q25 | Thomas, 1 Oct | "Using 3–5 sequential image shots within one scene is a very good solution… Not every scene needs 3–5 images… especially for important or emotional moments… Simpler scenes can still remain simple… zoom and pan selectively, not exactly the same way on every image… Characters and objects should visibly change or interact between the sequential frames… avoid the feeling of a PowerPoint presentation… the viewer feels that the visual story is constantly progressing" | Rule (SKILL.md core rule 3–4; V24 §6) |

## R. The master prompt Muhammad wrote — each part and where it lives

The master prompt asked for a full skill-upgrade process. Its useful parts are built into the skill; its process parts
were adapted to this skill's real structure rather than run as written (it assumed a generic multi-client skill).

| Part | What it asks | Where it lives | Status |
|---|---|---|---|
| Preamble | review all history, prompts, feedback, decisions, accepted and rejected approaches, mistakes; say what is missing | this ledger; V24 §11; "What this ledger cannot cover" | Done |
| 1 | learn what was corrected, why, and how to prevent it; better decisions, not more instructions | V24 §9, §11, §16 | Rule |
| 2 | audit the skill first; checkpoint; preserve what works | the v19.1 baseline commit; V24 §10 | Done |
| 3 | per-message extraction, chronology, superseded vs refined, no silent skips | this ledger (A–R) | Done |
| 4 | simplicity ≠ dullness; vivid ≠ overload; sophisticated ≠ corporate; exaggeration ≠ chaos; more movement ≠ better | V24 §9 | Rule |
| 5 | hand-drawn identity, consistent strokes and proportions, no photo-real, 3D, vector polish or AI look | V24 §5; SINGLE_FRAME, FLAT_STYLE, GLOBAL_AVOID | Rule |
| 6 | expression procedure: emotion, intensity, coordinated features, posture, readable small; variety; strength matched | V19 §3; V24 §5; EXPRESSION_STRENGTH tiers | Rule + check |
| 7 | interaction: distance, orientation, eye contact, gestures, action and reaction | V19 §3; `ia`, `dist`, `look` | Rule + check |
| 8 | psychological colour, selective emphasis, colour QA questions | V24 §3; SKILL.md read-through | Rule + check |
| 9 | object necessity audit A–F; primary / secondary / background / removable; white-background principle | V24 §2 | Rule + check |
| 10 | exaggeration only with a purpose; metaphors understood at once | V24 §4 | Rule |
| 11 | emotional contrast recipes (stress, reassurance, sadness, humour) | V24 §8, §14 | Rule |
| 12 | still composition vs editing; editing-aware art; resolution; reuse before regenerating; 3–5 s rhythm as editing | V24 §6 | Rule + check |
| 13 | typography from the latest decisions; the text decision procedure; text quality | V24 §7 | Rule + check |
| 14 | a scene intelligence record per frame | the shot-plan fields (`ft idea alt ia dist look ctx ce ce2 cx ip pk pc`, `y`) + V24 §2 question | Rule + check |
| 15 | Video 08 notes as a regression suite | V24 §12, §16; `assets/v24-samples/video08-regression/` | Done |
| 16 | the independent decision questions | SKILL.md read-through | Rule |
| 17 | rule levels (universal, style, client, video) | standing rules (V24) vs test cases (V24 §12) vs production notes; single-client skill, never for the Innes channel | Adapted |
| 18 | pipeline: script → scene → art direction → prompt → image evaluation → targeted correction → editing handoff | SKILL.md quick start, "When renders come back", Copy and Edit pages | Rule |
| 19 | guard rails against contradictory rules (six failure examples) | V24 §9 | Rule |
| 20 | modular changes, no duplication | v24 files + banners on the v19 files | Done |
| 21 | twelve regression tests | `assets/v24-samples/video08-regression/TESTS.md` | Done (visual tests need renders) |
| 22 | traceability for every requirement | this ledger | Done |
| 23 | deliverables A–J | ledger (deliverables A, F and H are its sections A–R), V24 (B), SKILL.md + compiler README (C, E), the files (D), QA + read-through (G), TESTS.md (I), CHANGELOG (J) | Done |
| 24 | efficiency rules | followed | — |

## What this ledger cannot cover

- Anything decided only inside the Video 08 chat that is not in the build or in the messages above.
- Thomas's reference screenshots (1–5.png, 11.png, 12.png) — not seen.
- How the v24 and v25 prompts render — no v24 or v25 frame has been rendered yet.
