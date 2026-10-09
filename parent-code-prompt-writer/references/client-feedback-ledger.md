# Client feedback ledger — every point, and where it lives in the skill

Every instruction Thomas gave from the 5 Oct summary to the Video 08 approval (9 Oct 2026), and Muhammad's own decisions,
each traced to the rule that applies it and the check that guards it. Read it before a new video to see the whole standard
in one place, and after a feedback round to add the new points (one row per point, the date, the exact words).

Status: **Rule + check** — in the rules and enforced by a script · **Rule** — in the rules, judged in the read-through ·
**Superseded** — replaced by a later point (named) · **Production** — Photoshop or Premiere work, outside the prompts ·
**Test case** — a single-scene fix kept in `assets/v24-samples/video08-regression/`.
Files: V24 = `references/v24-standard.md`, V19 = `references/v19-principles.md`, RC = `references/RULES-CARD.md`.
Checks: `qa-v24`, `qa-v19`, `qa` (scripts/…cjs).

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
| C1 | "think psychologically when using colours… create life, action, emotion and light. They should not just be decoration." | V24 §3 colour table; `COLOUR_LOGIC` | Copy page colour reason | Rule + check |
| C2 | Yellow attention/energy/surprise · red danger/stress/conflict · green energetic/positive/unexpected · blue calm/trustworthy/digital · dark violet for a smartphone | V24 §3 (blue for digital refined by T3: purple for phones) | qa-v24 phones purple | Rule + check |
| C3 | "not everything should be colourful. The clean white background is very good and should stay." | V24 §2; `CLEAN_GROUND` #FFFFFF | qa-v24 white ground | Rule + check |
| C4 | "because the background is simple, selected colours can become much more powerful" | V24 §3 bright focus | qa-v24 at most two coloured objects | Rule + check |
| C5 | the helicopter "large exaggerated yellow or bright green… behind the character for a few seconds… does not always have to look completely realistic" | V24 §4 exaggerated cutaways; sample S2 | — | Rule |
| C6 | "the fire could easily be twice as big… Important objects should sometimes dominate the scene for a moment." | V24 §4; `SCALE.DOMINANT` | qa-v24 oversized needs an object | Rule + check |
| C7 | "the short words and visual text moments we discussed are still missing. Please include them strategically" | V24 §7; director's read 11 | qa-v24 words | Rule + check |
| C8 | "push the colours, objects, exaggeration and text moments further so the visuals feel even more alive and memorable" | V24 §3, §4, §7 | — | Rule |

## D. Thomas, 7 Oct (T2)

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| D1 | "colors are not simply used more, but… intentionally and psychologically" | V24 §3 | Copy page colour reason | Rule + check |
| D2 | "Important objects, actions, or surprising moments can deliberately be brighter" | V24 §3 bright focus; `mk` for actions; §14 aha | — | Rule |
| D3 | "text moments: fewer, but exactly at the right moments" | V24 §7 | qa-v24 words land on their word | Rule + check |

## E. Thomas, 8 Oct 13:07 (T3) — eight general points

| # | Thomas | Where | Check | Status |
|---|---|---|---|---|
| E1 | "Keep the current hand-drawn stick-figure style. Avoid overly polished or AI-generated-looking visuals." | V24 §5; SINGLE_FRAME "never glossy, never vector-perfect or AI-polished" | — | Rule |
| E2 | "facial expressions, larger heads, expressive eyebrows, active hands, exaggerated reactions, and natural character interactions" | V24 §5 ("larger heads" = sudden close-ups, Muhammad 9 Oct) | qa-v24 attention punch; qa-v19 seven features | Rule + check |
| E3 | Yellow surprise/energy/discoveries · red conflict/frustration/danger · blue trust/safety/calmness · purple smartphones/digital distractions · green positive development/selected objects | V24 §3; `COLOUR_LOGIC` | qa-v24 phones purple | Rule + check |
| E4 | "We do not want everything colorful. Use bright colors strategically to create contrast, attract attention, and strengthen emotions." | V24 §3 | qa-v24 at most two coloured objects | Rule + check |
| E5 | "Objects can also become two or three times larger when it improves the storytelling." | V24 §4; `SCALE.DOMINANT` | — | Rule |
| E6 | "Use dramatic close-ups, exaggerated reactions, expressive eyes, active hands, and stronger emotional contrasts. Humor and exaggeration are essential parts of our channel identity." | V24 §4–§5, §14 | qa-v24 peaks have a close-up | Rule + check |
| E7 | "Aim for a meaningful visual change approximately every 3–5 seconds… every movement should support the story. Avoid unnecessary animation." | V24 §6 | qa-v24 long-holding stills | Rule + check |
| E8 | "different camera angles, zooms, reactions, object movements, and surprising visual elements" | V24 §6, §14; edits; `zm` | qa-v24 reframes | Rule + check |
| E9 | "clean, bold, highly readable text that works immediately, even on mobile devices" · "sophisticated does not necessarily mean more effective" | V24 §7; `HAND_LETTER` | qa-v24 presentation fonts | Rule + check |
| E10 | "distinguish between professional section headings and short, emotional keywords" | — | — | Superseded by I1–I4 and N4 (no section headings) |
| E11 | "Use text to strengthen important psychological moments, not simply decorate the scene." | V24 §7 | qa-v24 words | Rule + check |
| E12 | "stronger contrasts between frustration, sadness, humor, surprise, and positive emotional moments… immediately feel what the characters are experiencing" | V24 §8, §14 | — | Rule |
| E13 | "consistent character proportions, line thickness, facial features, colors, and object styling" | V24 §5; RECURRING_CONSISTENCY | qa, qa-consistency object locks | Rule + check |
| E14 | "approximately 8:57 is absolutely fine… up to 9:00 minutes" | RC §1 | — | Rule |
| E15 | "Every scene should create emotion, provide value, build curiosity, or entertain." | V24 §8; plan `ft` | qa-v19 `ft` | Rule + check |
| E16 | "establish a consistent visual standard that we can apply from the beginning of every future production" | SKILL.md; this ledger | — | Rule |

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

## G. Muhammad, 8 Oct 19:30 — the standard he promised Thomas

| # | Muhammad | Status |
|---|---|---|
| G1 | "White, minimal backgrounds, with bright colour used only where it matters" + the colour map | Rule + check (C3, C4, E3) |
| G2 | "Key objects up to 2–3× larger when it helps the story." | Rule (E5) |
| G3 | "Stronger expressions and more emotional close-ups." | Rule + check (E2, E6) |
| G4 | "A meaningful visual change every 3–5 seconds." | Rule + check (E7) |
| G5 | "Clean, bold text planned at the script stage: professional section headings, plus short emotional keywords" | Words planned in the director's read (row 11): Rule. Section headings: Superseded by I1–I4 |
| G6 | "Consistent characters, colours and objects from start to finish." | Rule + check (E13) |

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

## O. Muhammad's decisions

| # | Muhammad | Where | Check | Status |
|---|---|---|---|---|
| O1 | 9 Oct: "Larger head means camera close or like the closeup to get a sudden visual change to grab the audience attention" | V24 §5, §13 | qa-v24 attention punch | Rule + check |
| O2 | 9 Oct: "need text in image prompts not seperate images" | V24 §7, §13; `kw`/`tx` lettered in; WORD frames lettered | qa-v24 words left for Premiere | Rule + check |
| O3 | 28 Sep (Video 05): "there should be no random scenes… each and everything must be organized" · "doesn't drift too much or get random. All scenes or story do still feel connected" | V24 §15; pass J; director's read row 0 | — | Rule |
| O4 | 28 Sep (Video 05): "Don't go according to percentage, just check where we need what" | V19 §0.2 | — | Rule |
| O5 | 5 Oct (v19): Thomas's words applied across the whole script, no overdoing, no undoing; plan before production; one pass | V19 §0; SKILL.md | — | Rule |

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

## What this ledger cannot cover

- Anything decided only inside the Video 08 chat that is not in the build or in the messages above.
- Thomas's reference screenshots (1–5.png, 11.png, 12.png) — not seen.
- How the v24 prompts render — no v24 frame has been rendered yet.
