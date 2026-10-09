# R1 — Thomas's instruction history vs the parent-code-prompt-writer skill (v18.5)

Audit date: 5 Oct 2026. Sources: `research/SOURCES.md` (A–G), the skill at `scratchpad/skill/parent-code-prompt-writer/`
(SKILL.md v18.5, CHANGELOG.md, references/*, scripts/qa*.cjs). Latest direction = SOURCES A–E (Oct 5 2026); it wins
where it conflicts. Paths below are relative to the skill folder. "Proposal" marks anything that is my suggestion, not
the client's instruction.

**Headline findings.** (1) The skill's background default — a tinted wall per room with tonal furniture in the same hue,
plus beige NEUTRAL — is the exact pattern Thomas rejected on Oct 5; the skill even forbids "white-first backgrounds" and
"outline-only shapes" outright (SKILL.md L649–651, L659). (2) The room-heavy camera comes from written rules: "every
emotional story beat stays in its real room" (build director read), "never a floating head", XCLOSE capped at 5–10%,
30+ locations, "a real room with a new camera beats a plain field". (3) The QA suite passed Seven Things green: its
white-space checks count beige and tinted-wall frames as "white" (reported 18% + 22%, while pure white was 6%), and
several hard FAILs would now punish a white-default film (BRIGHT run > 5, single-mood run > 10, five FIELD frames in a
row, white close-ups naming a door). (4) Love/trust/listening exist in the skill only as symbols; there is no behaviour
library, everyday-situation library, composition tracker, maturity test or outline-room definition. (5) The one real
client-side conflict — full-colour scenes kept for peaks/night (approved summary) vs "Less: full-screen color" (long
note) — is recorded, not resolved.

---

## 1. Timeline of Thomas's instructions and their status now

Legend: **IN FORCE** · **SUPERSEDED** (by what) · **CONFLICTS** (with the Oct 5 direction, how) · **PARTLY** (part in
force, part not). Quotes are Thomas's words where SOURCES or the skill quote him; items marked *(skill paraphrase)* are
recorded in the skill only as paraphrase, not verbatim.

### 1.1 Early (before Video 1)
| Instruction | Status |
|---|---|
| Scenes "simple but colourful, not black-and-white backgrounds" (SOURCES F; memory: "previously: scenes simple but colourful") | **SUPERSEDED** by Video 4 "Neutral first" and now by Oct 5 "white or very light neutral backgrounds as the default". |

### 1.2 After Video 1 — the ten standards (client-standards.md §"The ten standards"; *skill paraphrase* except where quoted)
| # | Instruction | Status |
|---|---|---|
| 1 | First 1–3 seconds create immediate attention | **IN FORCE** |
| 2 | Emotions always visible through face, eyes, hands, body language | **IN FORCE**, pushed harder by Oct 5 A4 ("The characters should not just 'stand in the scene.' They should clearly react.") |
| 3 | Intentional close-ups on important emotional lines | **IN FORCE**, pushed harder by A5 ("Important emotional lines should visually feel important.") |
| 4 | Metaphors instantly understandable | **IN FORCE** ("stronger visual metaphors", D) |
| 5 | Strong red only for danger/warning | **IN FORCE** (not touched by Oct 5) |
| 6 | Teen and adult instantly distinguishable "through height, facial features, body proportions, clothing and other visual characteristics" | **IN FORCE** |
| 7 | "The reduced style is the base, but important objects can and should be highlighted with colour" | **IN FORCE** — this is almost exactly the Oct 5 rule |
| 8 | No overly happy/perfect endings | **IN FORCE** |
| 9 | No artificially long holds to pad runtime | **IN FORCE** |
| 10 | Every scene has a purpose | **IN FORCE**; restated in D: "better and more varied images with a clear purpose" |
| — | Video 1 sample: "normal explanation scenes can be simpler and cleaner; emotional key moments should get the stronger close-ups… keep it simple where simple is enough, and add detail where the emotion really matters." | **IN FORCE**; matches A14 "Emotion must come before decoration" |
| — | Complaint: "Too many scenes stay at a similar medium or wide distance" (client-standards targets table) | **IN FORCE** and repeated almost word for word on Oct 5 (A6: "avoid staying too long in the same medium/wide framing"). Recurring complaint — the skill's earlier fixes did not hold (G: 47% of Seven Things frames medium/wide inside a room). |
| — | Complaint: "Avoid becoming an infographic channel" | **IN FORCE**; consistent with A2/A16 "Less: … generic symbols" |
| — | Complaint: "The large 7 stays alone for six seconds" | **IN FORCE**; relevant to G's 7 chapter-number words ("NUMBER ONE"…), see §2 |
| — | Complaint: "Almost the same image appears again" — fix in his words: change "the camera distance, the hand movement, the facial expression or the overall composition" | **IN FORCE**; escalated in D: "the viewer should still never feel like the visuals are repeating or that the same composition keeps coming back" |
| — | "The people and their emotional interaction must remain the main focus" | **IN FORCE**; D "more real interaction between characters" |
| — | "The hug says love, not influence" (image must say exactly what the line says) | **IN FORCE** |
| — | "Show the process — he stopped trying to be heard" (cause and effect) | **IN FORCE** |

### 1.3 After Video 2 (client-standards §"Seven more"; *skill paraphrase*)
| Instruction | Status |
|---|---|
| Recurring objects keep their design ("The guitar changes between scenes. Strings disappear.") | **IN FORCE** |
| "Sometimes they have hands and sometimes they partially do not." | **IN FORCE** |
| Important objects can suddenly become very large and dominate | **IN FORCE** ("small prop vs large face", "unexpected object" in A10/A15) |
| "Faces can occupy 60–80%" | **IN FORCE**, strengthened (A5 "a large face on a white background") |
| Isolate the hands as a shot type | **IN FORCE** (A5 "face + hands", "hands") |
| Amplify the idea "without forcing a metaphor into every segment"; "The rule is not: every scene needs a metaphor." | **IN FORCE** — and in tension with the skill's 45–60% metaphor target (see §2) |
| "Some scenes almost completely one colour — a lot of brown, an entire green environment." | **IN FORCE** and repeated Oct 5 (A1: "completely built around one color tone, especially blue, beige, or green") |
| "Similar rooms, similar furniture, similar perspectives" | **PARTLY**: the want (visual change) is IN FORCE; the skill's fix (25–30+ locations, rooms drawn in full) **CONFLICTS** with A13 "Reduce full room scenes… one door outline, one bed outline, one chair, one object is enough". The fix should move from *more rooms* to *more camera/composition variety*. |
| "Don't always show the complete character sitting at a table." | **IN FORCE** |

### 1.4 Video 3 brief, sample and review (client-standards §"Nine more" and §"Video 3 sample…"; *skill paraphrase* unless quoted)
| Instruction | Status |
|---|---|
| Colours much more selective; never a whole scene in one dominant colour | **IN FORCE** (A1) |
| Stronger symbolism from the script: obstacle, crossroads, race, balancing act, maze, dominoes | **PARTLY**: metaphor IN FORCE ("stronger visual metaphors", D); **CONFLICTS** where it becomes simple/standard symbols — A2 "Some symbols still feel too simple or childish", A16 "Less: … generic symbols" |
| Visual progression start → problem → reaction → result | **IN FORCE** |
| Fewer basic "character + object + background" illustrations | **IN FORCE** |
| Regular new visual information (close-ups, wide shots, perspective, movement, reactions, new locations) | **IN FORCE** except "new locations" as the main lever (see 1.3) |
| Less unnecessary information inside each frame | **IN FORCE**, escalated (A12 "Fewer objects, stronger meaning") |
| Object animations: objects "appear, move, pop in, slide into frame, grow for a moment or interact with the character"; "a warning symbol pops up, an arrow or psychological symbol appears" | **PARTLY**: story-object pop-ins IN FORCE; generic warning/arrow/psychological symbol pop-ins **CONFLICT** with A2/A16 (less generic symbols; mature visuals) |
| "Pan and zoom on static images is a little too limited." | **IN FORCE** |
| Colour plan before scenes; "furniture not all one tone"; colour feeling changes with the story (warm, cool, bright, dark); a visual peak every few scenes | **PARTLY**: planning before production IN FORCE (D: define beats/camera/reactions/contrast "before production starts"); peaks IN FORCE as "full coloured scenes … for emotional peaks and night scenes" (C); per-room warm/cool background moods **CONFLICT** with white default (A1) |
| Complaint: "Too much beige, pale green, grey and soft pastel… the eye doesn't know where to look." | **IN FORCE** — the same hues (beige, green, blue) are named again on Oct 5. Third time this complaint has appeared (Video 2 brown/green, Video 3 beige/pale green, Oct 5 blue/beige/green). |
| Praised: the orange scene at 2:20 and the dark storm scene "because each had its own mood" | **IN FORCE** only as the exception for emotional peaks/night (C) |
| Variety within one home: change "angle, location, framing, distance, background colour and focus" | **PARTLY**: angle/framing/distance/focus IN FORCE; "background colour" variety **CONFLICTS** with white-default backgrounds |
| His five self-review questions (first 30 s strong? colours have contrast? objects stand out? variety? alive?) | **IN FORCE** |
| Keep characters and facial expressions in their current direction | **IN FORCE** (style kept; intensity pushed, A4) |

### 1.5 Video 4 "Give Me Your Phone" — first review (minimum standard)
| Instruction | Status |
|---|---|
| "Please keep this quality and visual direction as our new minimum standard and push it another step further." | **IN FORCE** as a floor; its full-room colour look is superseded by A1/A13 |
| First 30 s "about 10–15% more dynamic" — "the most important part for retention" | **IN FORCE** |
| "When a parent or teenager is shocked, angry, hurt or thoughtful, we should really feel that emotion." (stronger XCLOSE) | **IN FORCE**, escalated (A5) |
| Object animations tied to important VO words | **IN FORCE** |
| Less static middle scenes | **IN FORCE** (A15 pattern interrupts) |
| Continue metaphors — "one of the strongest improvements" | **IN FORCE** (quality, D) |

### 1.6 Video 4 full review (Sept 2026)
| Instruction | Status |
|---|---|
| "Neutral first. Color with purpose. Never color just to fill empty space." | **IN FORCE** — but "neutral" now means **white or very light neutral** (A1), not the tinted/beige rooms the skill built from it |
| "70–80% neutral and clean, 20–30% targeted color accents" (example: strong turquoise phone in neutral room) | **PARTLY**: the per-frame meaning (most of the frame clean, colour on the key object) is IN FORCE. The skill's second reading — "full-colour backgrounds on 20–30% of frames" — was the skill's extrapolation; Oct 5 sets no number. C keeps "full coloured scenes … for emotional peaks and night scenes"; A16 lists "full-screen color" under "Less". See the open conflict in §5. |
| "dark blue/grey night scenes work well" | **IN FORCE** (C: full coloured scenes stay for night scenes) |
| "We need to visually amplify the voice-over"; examples: heavy backpack, wall between parent and teen, giant phone pulling him in, giant clock, mountain of messages | **IN FORCE** as metaphor principle; each must now also pass the A2 maturity test (not "too simple or childish") |
| A fresh visual stimulus roughly every 20–30 s, "never chaotic — fewer elements can be stronger" | **IN FORCE** (A15, A12) |

### 1.7 Renumbered Video 1 approved; gentle-parenting video ("Video 2")
| Instruction | Status |
|---|---|
| Keep character style and "controlled colour" | **IN FORCE** |
| "Raise the share of visual metaphors even more"; be bold with objects, scale, perspectives, humour, unexpected ideas; "visualise the message in a surprising way instead of showing exactly what the voice-over says" | **PARTLY**: surprise/boldness IN FORCE; "raise the share" is now **in tension** with A12 "Fewer objects, stronger meaning" and A3 (love/trust/attention through behaviour, not symbols). D asks for "stronger visual metaphors", not more. |
| Emotional moments as 3–5 sequential stills in one scene, not every scene; zoom/pan selective | **IN FORCE** |
| Natural camera positions; exaggerated angles render badly (Muhammad/Thomas) | **IN FORCE** |

### 1.8 "Video 5 rounds" (recorded in SKILL.md and CHANGELOG v16 as Thomas's rules; not quoted verbatim in SOURCES)
| Instruction | Status |
|---|---|
| Objects designed with one characterful countable detail | **IN FORCE**, but must now meet D "better and more mature props" |
| "Rooms have character… two or three calm details in the house tones (a window with a plant, a rug, a lamp, picture frames, magnets)"; a glimpse of the room in close-ups | **SUPERSEDED** by v18.2 (one anchor piece) and now in direct **CONFLICT** with A12/A13/A5 |
| Characters act on objects | **IN FORCE**, but A3 shifts love/trust/attention to behaviour between people, not object handling |
| Most frames carry an edit (87%) | **SUPERSEDED** by v18 (motion only where the story moves) |
| "No explanatory text… No quoted words anywhere in a scene" | **PARTLY SUPERSEDED**: in-image text ban still sensible; on-screen words now wanted (A9, D "intentional text moments") |

### 1.9 Video 05 accepted — Oct 2 2026 notes (colour-and-text-v17.md; *skill paraphrase*)
| Note | Status |
|---|---|
| 1 Less colour in some scenes | **IN FORCE**, escalated |
| 2 "Parts completely white + one simple background colour" (ACCENT) | **PARTLY**: white IN FORCE; the "one soft wall colour" implementation is what produced the "one color tone" rooms Thomas criticised (A1) — see §2 |
| 3 No brown on brown (contrast) | **IN FORCE** (A10 widens contrast beyond colour) |
| 4 More white in general | **IN FORCE**, now the **default** (A1) — the skill's "not as a default for every scene" **CONFLICTS** |
| 5 Vary scene to scene | **IN FORCE**, but via camera distance/composition (A6, D), not background hue |
| 6 Occasional keywords | **IN FORCE**, escalated: "More strong on-screen words… only at strong moments, not constantly" (A9); "intentional text moments" (D) |

### 1.10 Oct 3 2026 — contrast note during "Seven Things" (contrast-and-detail-v18_2.md; SOURCES F)
| Instruction | Status |
|---|---|
| "first I see the characters and their emotion, then the main action or object, and only after that the background" | **IN FORCE** (A12: "The viewer should always know immediately where to look") |
| "Because our characters are mostly white, they partly disappear against very light or white backgrounds" → subtle soft colour (very light grey, beige, blue) directly behind characters | **PARTLY / CONFLICTS**: the visibility problem is real and not answered by Oct 5; but the skill's implementation (a tinted wall per room + tonal furniture in the same hue) is exactly what A1 criticises ("wall, floor, furniture, and surrounding objects all have similar colors"). How to keep white characters readable on a white default is an open question (§5). |
| "Don't put too many objects and too much background detail into every scene"; furniture restrained, thin lines | **IN FORCE**, escalated (A12/A13 outlines, fewer objects) |
| "Sometimes the scene can even be completely white and extremely simple"; sometimes a pure-white face close-up | **IN FORCE**, escalated to default (A1, A5 "a large face on a white background") — the skill's "WHITE is for two things only" **CONFLICTS** |
| Strong colour only on important objects | **IN FORCE** |

### 1.11 Oct 5 2026 — latest (SOURCES A–E): all **IN FORCE**
- Backgrounds: "white or very light neutral backgrounds as the default; only the important object or emotional element should carry strong color; background environments can often be shown only with simple outlines; do not fully color every object just because it exists in the scene." (A1) — approved summary: "Places are shown with a few simple outlines (a door, a bed, a chair), not full rooms." (C)
- **Unresolved wording conflict (record, do not resolve):** approved summary C: "**Full coloured scenes stay for emotional peaks and night scenes.**" vs long note A16: "Less: background, decoration, **full-screen color**, random props, generic symbols." Muhammad's own earlier note (E) is consistent with C: "use coloured scenes on emotional beats, specific scenes". Thomas approved C ("exactly. Your summary captures the direction very well.") after writing A. Both stand; see §5.
- Maturity: "We are not creating a kids channel"; "the smartphone with the large heart feels too basic"; show emotion through "eye contact, hesitation, body language, distance between people, hands, reactions, silence, facial expressions, real interactions." (A2)
- Love/trust through behaviour: sitting next to the teen, teen looking away but listening, hand reaching out, parent stopping before reacting, child hesitating, noticing discomfort, kneeling to the child's level, "two people sitting together without needing a heart symbol." (A3)
- Stronger faces (A4); camera closer — "a large face on a white background is much stronger than a complete room" (A5); camera-distance variation — wide, medium, close-up, extreme close-up, object close-up, reaction shot (A6).
- Everyday situations list (A7); subtle non-childish humour list (A8).
- On-screen words: TRUST, SAFE, LISTEN, TESTING, SHAME, CONTROL, MISREAD, ATTENTION, OVERWHELMED, HONESTY, NOT REJECTION — "only at strong moments, not constantly." (A9)
- Contrast as a family of contrasts (empty vs strong object, neutral vs one bright colour, wide vs XCLOSE, serious vs humour, still vs movement, small prop vs large face, silence vs beat). (A10)
- Recurring objects: "have a reason; evolve with the story; mean something different later; support the emotional progression. It should not return only because it looks good." (A11)
- "one strong object, one strong face, one strong gesture" rather than "bed, chair, lamp, table, shelf, wall, decoration, several small props". (A12)
- "Reduce full room scenes… one door outline, one bed outline, one chair, one object is enough… The story should stay focused on the characters." (A13)
- "What is the viewer supposed to feel here? Only after that should we decide: background, prop, color, camera angle, movement." (A14)
- Pattern interrupts list (A15); "Less, but stronger." (A16)
- Real objects: "for now, let's leave real objects out" (D) — **closes** A17's open question.
- Final priorities (D): stronger facial expressions; more real interaction; more camera proximity; more close-ups; stronger gestures/body language; relatable everyday situations; "better and more mature props"; more humor; stronger visual metaphors; more contrast; "intentional text moments"; "less repetition in framing and composition". Plus: "define the emotional beats, camera angles, reactions, and visual contrasts very clearly before production starts. I do not simply want 'more images.'"
- Muhammad (E): next video implements all; "make the video a standard not something going random".

### 1.12 Older quotes still sitting in the skill that point the other way (for context, not instructions now)
- Video 3 review, quoted in `references/colour-direction.md` L31–34: *"several scenes in the middle with white or very pale
  backgrounds — this is where we lose visual energy."* and Video 4 brief (L36–39): *"Not flat, pale or tired… The dominant
  colour feeling should change naturally throughout the story."* — **SUPERSEDED** as defaults by Oct 5 A1, but they are the
  extreme Thomas corrected last time (all-pale middle). The risk of over-swinging into pale sameness is real (§5 Q3).
- Video 4 brief: *"Not every second needs to be extremely colourful. I specifically do not want that."* — **IN FORCE**.
- Thomas, Video 1 (colour-direction.md L25): "predominantly white backgrounds, black/white, colour only with purpose" —
  effectively **back IN FORCE** via A1.

---

## 2. Conflicts in the current skill (v18.5) with the Oct 5 direction

Line numbers are from the files as audited today. "Why" ties each item to SOURCES A–E. Grouped by theme; the first group
matters most.

### 2.1 Tinted rooms are the default background (A1: "white or very light neutral backgrounds as the default")
**Measured effect (SOURCES G):** pure white 6%, beige backdrop 11%, one soft wall 22%, tinted room with coloured furniture
44%, full colour 17%; tinted wall hues sage 46, beige 27, blue/sky 31, blush 21 — exactly the "blue, beige, or green"
Thomas named.

| # | File · location | Quoted text | Why it conflicts |
|---|---|---|---|
| 1 | `SKILL.md` L76–80 (v18.2 §2) and `references/contrast-and-detail-v18_2.md` L25–28 (table) | "The wall or field directly behind the characters is a subtle, flat soft tint (very light grey, beige, sage, blush, soft blue, lilac-grey…; Lab lightness about 84–92, chroma about 5–10)… Furniture is quiet and tonal: the wall's own tint one step deeper" (table: "same hue, L ≈ wall − 11") | Wall + furniture in one hue is literally A1's complaint: "When the wall, floor, furniture, and surrounding objects all have similar colors, the frame becomes flat and repetitive." |
| 2 | `SKILL.md` L82–84; contrast-and-detail L30; `data-fields-and-build.md` L36–37 | "One soft hue per room (each room a different hue). The calm moods move only the lightness and temperature of that tint (warm…, evening…, cool…, dusk…)"; `SET[place].moods` = { BRIGHT, WARM, EVENING, COOL, DUSK } | A per-room hue system is a full-colour room system, just pale. A1/C: "Strong colour goes only on the important object or the emotional moment." |
| 3 | `SKILL.md` L85–88; contrast-and-detail L33, L40–44; data-fields L40 | "WHITE (pure white) is for two things only: face close-ups… and object-only frames. Never a medium or wide shot with figures, or a hands frame, on pure white. If the idea needs the furniture… use the soft room instead." | Directly contradicts white as the **default** and A13 "one door outline, one bed outline, one chair" (i.e. furniture on white). |
| 4 | `SKILL.md` L89; contrast-and-detail L31; compiler `assets/compiler-v18_3/template.jsx` L133 | "NEUTRAL is now a soft beige backdrop, not white" (#ECE6DC, furniture "quiet beige-grey" #CBC3B6); the compiler tags NEUTRAL `kind: "white"` | Beige is one of the three hues Thomas named. Tagging it "white" makes every white-share metric count beige as white (see 2.6 #5). |
| 5 | `SKILL.md` L89–91 | "ACCENT is one subtle soft colour behind the characters with everything else white; inside a scene it keeps the room's own wall (nearest calm frame of the same room, up to three frames away…); idea frames take the chapter's accent tint." | Keeping the room's tinted wall turns ACCENT back into the room colour (22% of frames). Partly supportive — see §3. |
| 6 | `references/colour-direction.md` — whole file, esp. L6–8, L55–57, L62–68, L75–89, L113–120, L125–126, L132, L134, L151–157, L163–172 | "most frames on NEUTRAL (clean light warm grey walls, soft stone floor, slate furniture) or BRIGHT; full-colour backgrounds on about 20–30%"; "Background — a few large, simple, flat colour areas in the frame's mood palette… Wall, floor and furniture are three *different* tones"; colour script "the confrontation goes orange, the lowest point goes dark, a memory goes warm, the ending settles into dusk"; six mood palettes (WARM apricot wall, TENSE light-orange wall…); "'Simple' never means grey, washed-out or white by default"; "BRIGHT … never more than five frames in a row"; failure-table fix for all-white frames: "BRIGHT for at most five frames, then change mood"; "a full film should use at least four moods"; Step-6 self-check "Are wall, floor and furniture three different tones?… Does the frame look pale…? Give it its mood." | Pre-v18.2 file still read in Step 6 (SKILL.md L588) and listed as "the colour system". Almost every rule in it opposes A1/A13/C. |
| 7 | `references/constants.md` L255–269 (Setting decision checklist) | "1. A story line with a situation → a location WORLD (INDOOR/OUTDOOR) with its signature set pieces, coloured by the frame's mood. **Most frames.**" … "**White is not the default.** BRIGHT exists for calm explanation beats and never runs more than five frames." | Verbatim opposite of A1. |
| 8 | `constants.md` L133–140 (MOOD defaults), L200–202, L212–213 | six coloured mood palettes as defaults; "furniture a different temperature or value from the wall… QA fails a palette whose furniture matches its wall"; "so the same kitchen can be warm at breakfast and cold after the argument" | Colours rooms by default; A1 "do not fully color every object just because it exists in the scene". |
| 9 | `constants.md` L63 `COLOUR_HIERARCHY`; L71 `GLOBAL_AVOID` | "walls, floors, furniture and sky quiet and desaturated"; AVOID "a grey, black-and-white or washed-out frame" | Pushes the generator to colour the setting; "black-and-white frame" is close to what A1/A13 now ask for (white + black outlines + one coloured object). (The template's newer text differs — see 2.9.) |
| 10 | `references/RULES-CARD.md` §4 L42–46 (the file read first every video) | "most frames sit on the NEUTRAL (clean light warm grey) or BRIGHT mood… Full-colour backgrounds are the purposeful exception, about **20–30% of frames**"; "Furniture keeps one colour per set in every mood (house lock)." | Stale pre-v18.2 text in the highest-priority card; coloured furniture "per set" conflicts with outline/uncoloured furniture. |
| 11 | `references/director-rules.md` §29 L190–193; §50.5 L342; §19 L119–120; §39 L236; Appendix L381 | "that space is filled with the frame's **mood colour**, not left as tired pale white — an open orange field around a tense face is energy; a grey-beige void is not."; "Simple does **not** mean pale: settings carry the frame's mood colour."; "Rhythm also comes from colour: some sections calm, some tense, some dark, some bright"; "Layer 4 … a couple of flat colour areas"; "mood background calmer" | §29 is the exact opposite of A5 "a large face on a white background is much stronger than a complete room". |
| 12 | `references/director-framework.md` §3 L31, L37; §8 L74–76; `colour-and-text-v17.md` L9, L11 | Everyday story → "the room's own soft colours"; Memory → "one tint (frosty blue)"; White/ACCENT "Not for a scene that needs a real place or atmosphere (a room's first frame, night, the storm)"; More white — "Not when: … as a default for every scene" | The framework that "governs every step" says white is not a default; A1 says it is. Everyday parenting moments (A7) would all land in tinted rooms. |
| 13 | `SKILL.md` L200–207 (Innes vs Thomas table) and **L649–651 (What NOT to do)** | Table: Innes = "White backgrounds by default, colour the exception"; Thomas = "white or one soft colour on 35–50% of frames, soft rooms for places". NOT-to-do: "Don't pull anything from Innes's taste into this channel: **no white-first backgrounds**, no restrained or subtle expressions, **no pale pastel scenes, no minimal-staging rule**" | Thomas's Oct 5 direction now *is* white-first with minimal staging. This rule actively forbids it. (Expressions stay strong — that half still holds.) |
| 14 | `SKILL.md` L259–263, L276–277, L423, L474–476, L511–519, L587–592, L671–672 | "Across the film most frames sit on NEUTRAL or BRIGHT; full-colour backgrounds are the purposeful 20–30%"; Step 1 "a clean NEUTRAL room"; Step 3 Locations "walls and floors take the frame's mood, furniture keeps one fixed colour per set"; Step 6 "furniture distinct from wall and floor"; "don't leave a scene pale and even. One saturated hero, a calmer mood background" | All assume a coloured room as the frame's base. |
| 15 | `references/visual-library.md` §3 L95–96, §4 L101–102 | "at least two colour moods across the film (the kitchen at EVENING, at DARK, in the warm Tuesday light)" | Colour variety per room, not white default. |
| 16 | Build data copied for new videos: `assets/compiler-v18_3/dicts.cjs` L255 (director read "colour") | "every room is a subtle soft tint behind the characters (sage kitchen, blush living room, beige hall, blue bedroom, lilac-grey landing, grey-aqua office)" | The worked example the next video starts from encodes the rejected palette. |

### 2.2 Rules that keep the camera in medium/wide room shots (A5, A6, A13)
**Measured effect (G):** MEDIUM 74 + MEDWIDE 44 + WIDE 13; 110 frames (47%) medium/wide inside a room; 14 runs of 3–6
medium/wide frames; XCLOSE 8 (3%); HUGE 17 (7%).

| # | File · location | Quoted text | Why it conflicts |
|---|---|---|---|
| 1 | Build director read `assets/compiler-v18_3/dicts.cjs` L257 ("risks") | "Too much white → **every scene's first frame and every emotional story beat stays in its real room**." | The single biggest driver of 47% room frames. A5: "Important emotional lines should visually feel important"; "a large face on a white background is much stronger than a complete room". |
| 2 | `SKILL.md` L404; `motion-and-energy.md` §3 L79–82; `staging-and-props.md` §4 L33–35; `emotion-and-performance.md` L81–85; `RULES-CARD.md` L26–27; `characters.md` L65–66; `visual-library.md` L27–29, L63, L151 | "every close-up has context in frame (the object, the other character's hand, the place) — **never a floating head**"; "A huge face alone on a plain background is a floating head — avoid it."; "Never open a scene on a floating face." | A5 asks for "face-only moments" and "a large face on a white background". The anti-floating-head rule came from Muhammad's review of the Video 4 hook ("weird close-ups", three in twelve frames) — see §5 Q4. |
| 3 | `SKILL.md` L404; `emotion-and-performance.md` L84; `staging-and-props.md` L31–36; `motion-and-energy.md` L77–78 | XCLOSE "5–10%… roughly one per 20 seconds at most, never two huge faces within three frames" | Caps the very thing A5/D ask to increase ("more camera proximity; more close-ups"). |
| 4 | `motion-and-energy.md` §2 L63–65; `aha-humour-popins.md` L71; `SKILL.md` L415 | "At most 2 plain-colour backgrounds… **A real room with a new camera beats a plain field.**" (first 30 s) | Opposite of A15 "suddenly white background" and A5. |
| 5 | `SKILL.md` L207, L411–412, L415; `RULES-CARD.md` L96; `constants.md` L218–219; `motion-and-energy.md` §5 L103–106 | "Many locations (25+)"; "Scene variety: 30+ locations"; "no location more than 4 frames in a row; in the middle half, every 7 frames use 3+ locations"; "first 30 frames hold 10+ distinct scenes"; "A long conversation moves: the table, then the hands…, then the doorway" | Variety is bought with more rooms (more full-room establishing frames). A13: "We do not need to fully illustrate every location"; A6/D want variety from camera distance and composition. |
| 6 | `references/visual-library.md` §3 L87–96; §2 L27–32; §6 L150–151 | "Room library — five views of every recurring room: Establishing — wide, the room and its story details; Reverse…; Low…; High…; Through"; CONTEXT "The first frame of every scene shows the place…"; CUTAWAY_MAP "a dollhouse cross-section of the house" | Plans rooms as the unit of variety; wide establishing frames per scene. (Low/High views also contradict the natural-camera rule.) |
| 7 | `references/system-v17.md` §3 L25 | Scene cards: "**Story (real place)** / Idea (white or metaphor world)" | Hard-wires everyday story = room, white = ideas only. A7's everyday situations would all be room frames. |
| 8 | `references/director-framework.md` §3 L31, L34; §9 L86–88 | Everyday story → "medium and close"; Explanation/idea → "medium or wide, nothing extra"; "Rooms: one fixed layout and a master frame" | Explanation lines default to medium/wide; A6: "avoid staying too long in the same medium/wide framing". |
| 9 | `data-fields-and-build.md` L47 | "Add close views (e.g. LIVING_CLOSE_L / _R, KITCHEN_CLOSE, KID_CLOSE) for close shots so the background still says where we are." | Close-ups carry the room behind the head; A5 wants face-only on white. |
| 10 | `contrast-and-detail-v18_2.md` §3 L47–54 | anchor piece "(always in wider shots)" | Fine for orientation; but with A13 the anchor should become an outline on white, not a tinted room (see §3). |
| 11 | `SKILL.md` L525 | tiers "SIMPLE, EMOTIONAL, HOOK — roughly 20 / 55 / 25" | Not a conflict in itself; noted because SIMPLE explanation frames default to medium/wide (row 8). |

### 2.3 Outline-only environments are forbidden (A1, A13, C)
| # | File · location | Quoted text | Why it conflicts |
|---|---|---|---|
| 1 | `SKILL.md` L659–660 | "Don't leave a scene unfinished — in the drawing (half-drawn, implied or **outline-only shapes**)" | A13/C: "Places are shown with a few simple outlines (a door, a bed, a chair), not full rooms." |
| 2 | `constants.md` L286–288 | "Finished, never implied. Don't write 'suggested', 'implied', 'partial', '**outline of**' or 'sketched' into beat text" | Same; and `qa.cjs` L261–262 warns on "outline of". |
| 3 | `constants.md` L65 `DETAIL_CAP`; `director-rules.md` §8 L64–65, §44.9 L292–293; `constants.md` L232 | "Furniture is simple and complete with legs to the floor"; "minimal means few objects, never blank or half-drawn ones" | Compatible only if "outline" is defined as a complete closed line drawing with white fill (proposal in §4). As written, the generator is told every piece is a filled, coloured, complete object. |
| 4 | No file defines an "outline-only" set piece | (grep for "outline-only", "simple outlines", "line drawing" finds only the ban above) | See §4 gap G6. |

### 2.4 Symbols where Thomas now wants behaviour (A2, A3, A16 "Less: … generic symbols")
**Measured effect (G):** heart phone 1, heart 2, speech bubble with heart 1, story bubble with dinosaur 4, smile mask 3,
gold star 2, podium 1, report card 1, gold pillow 1, star frames 4, trophy 3, stop paddle 1, empty speech bubble 1.

| # | File · location | Quoted text | Why it conflicts |
|---|---|---|---|
| 1 | `references/metaphor-bank.md` L49 (love, warmth), L55 (trust), L59 (listening), L58 (closeness, repair) | love → "a shared umbrella in rain · two hands holding one thread · a campfire both sit at"; trust → "a rope bridge between two cliffs · a glass floor… · a key handed over"; listening → "an old ear trumpet as big as a person…" | A3: "If we want to show love, trust, attention, or emotional safety, I would prefer situations like: a parent quietly sitting next to a teenager…" — these are exactly the ideas he wants shown through behaviour, and the bank offers only symbols for them. |
| 2 | `metaphor-bank.md` L43, L100; `aha-humour-popins.md` L112–113 | "a cracked heart-shaped vase"; "a seesaw between a rulebook and a heart"; pop example "a heart cracking on 'hurt'" | Heart imagery is the one example Thomas named as childish (A2). |
| 3 | `references/video05-worked-example.md` L3–4 | "**Spine:** the heart (warmth) and the gate (structure)… the gate (floats away on balloons…)" | The worked example models a heart as the spine symbol. |
| 4 | `metaphor-bank.md` L48, L98, L108, L115 (candidates — Thomas did not name these; judgment needed) | "standing on a small podium"; "a trophy that must be polished"; "trying on masks in a mirror"; "a dim bulb over the head" | Same family as the G props he saw (podium, trophy, smile mask, star). `director-framework.md` §6 L62 itself lists "stock icons (lightbulb, scales, ticks)" as weak. Review against A2's maturity test rather than delete blindly. |
| 5 | `aha-humour-popins.md` §7 L81–83, L108–109; `constants.md` L157–160, L243–246; `motion-and-energy.md` §4 L94–95; `SKILL.md` L429 | Old Thomas quote "a warning symbol can pop up… an arrow or psychological symbol can appear"; OVERLAY = "a warning triangle, a question mark, an arrow, a single bold word"; "Generic overlays (?, !, ticks, numbers, words) stay under half" | Allows up to half of all pop-ins to be generic symbols; A16 "Less: … generic symbols". |
| 6 | `director-rules.md` §53 L352–356 | "If a symbol works, reuse it consistently — the same warning light, the same red pen — so it becomes a signal" | A11: every recurring object should "mean something different later… It should not return only because it looks good." Same-meaning reuse is the opposite. |
| 7 | `SKILL.md` L264–271, L426; `RULES-CARD.md` §5 L52–57; `motion-and-energy.md` L115; `qa.cjs` L302, L486–487, L571–572 | "Metaphors are the video's main visual engine: about half the frames (45–60%…)", "two or more in every segment of 8+" | **Tension, not a clean conflict:** the 45–60% came from Thomas's renumbered-Video-1 note ("raise the share of visual metaphors even more"). Oct 5 asks for "stronger visual metaphors" but also "fewer objects", "less generic symbols", and behaviour for love/trust. A quota of half the frames pushes symbol frames. See §5 Q5. |
| 8 | `qa.cjs` L479–488 (**hard FAIL**) | fresh stimulus = "a metaphor frame (fn CONCEPT) or a transformation edit — a big ordinary object alone does not count"; FAILs any ~25-second stretch without one | A15 lists Thomas's own pattern interrupts: "suddenly white background; extreme close-up; one-word text; unexpected object; funny reaction; strong pose; short metaphor; sudden silence visually; large facial reaction". The check counts only two of them, so it forces metaphor/symbol frames into every 25 s. |

### 2.5 On-screen words (A9: idea words "only at strong moments, not constantly")
| # | File · location | Quoted text | Why it conflicts |
|---|---|---|---|
| 1 | Build director read `assets/compiler-v18_3/dicts.cjs` L256 | "keywords: NUMBER ONE … NUMBER SEVEN on the chapter cards (S19, S44, S74, S104, S130, S155, S190)…" | 7 of 11 words were chapter numbers (G). None of Thomas's examples (TRUST, SAFE, LISTEN, TESTING, SHAME, CONTROL, MISREAD, ATTENTION, OVERWHELMED, HONESTY, NOT REJECTION) is a number; his old complaint "The large 7 stays alone for six seconds" also argues against number cards. |
| 2 | `director-framework.md` §3 table (Keyword column) and §8 L81–82; `colour-and-text-v17.md` L13 | Keyword "no" for anger peak, hurt, tenderness, night, everyday story; "never on an emotional peak where the face says it" | A9 says "at strong moments"; his list includes emotional words (SHAME, OVERWHELMED, NOT REJECTION). Whether a word may sit on an emotional beat is open (§5 Q6). |
| 3 | `aha-humour-popins.md` L74–76; `motion-and-energy.md` §4 L94–95 | "a number card flashes for under a second"; generic overlays reserved for "a list number, a warning, one bold word" | Treats numbers as the default text moment. |
| 4 | `SKILL.md` L301–303 (v16 rule 6) not marked superseded | "**No explanatory text.** Show it instead of writing it" | Superseded by v17 keywords and now A9/D "intentional text moments"; still reads as a standing rule. |
| 5 | Two different keyword styles (a hard constant per director-framework "text style") | `constants.md` L113 `TYPOGRAPHY` "bold hand-drawn black capital letters with slightly uneven rounded strokes"; `aha-humour-popins.md` L127 same; vs `colour-and-text-v17.md` L24–26 "one bold rounded sans-serif in capitals, near-black (#161616) with a thick white outline" | Internal contradiction; A9 wants "selected key words" in one consistent channel look. |

### 2.6 QA checks that enforce the old rules or mis-measure the new ones
Verified by running the suite on `/home/claude/v3/out/build.jsx` (Seven Things v9): **all scripts pass**; the colour
problem Thomas raised showed up only as one ignored flag ("colour-background frames 59%").

| # | Script · line | Check | Why it conflicts |
|---|---|---|---|
| 1 | `qa.cjs` L402–412 (**FAIL**) | longest single-mood run ≤ 8 (fail > 10) — only NEUTRAL and BRIGHT exempt; **BRIGHT run > 5 fails** ("the pale-middle failure from Video 3") | A white-default film (WHITE/ACCENT runs) will fail this. |
| 2 | `qa.cjs` L446 + L530–531 (**FAIL**) | `place()` treats every FIELD world as one place "PLAIN"; fails "a location held more than 4 frames in a row" | White frames are built as `world: "FIELD", mood: "WHITE"` (template), so 5 white frames in a row fail as "one location". |
| 3 | `qa.cjs` L193–194 (**FAIL**) | opening 30 frames need "10+ scenes… 2+ moods" | Drives many rooms and colour moods in the hook. |
| 4 | `qa.cjs` L178–179, L413–416, L405–408, L473–475 (flags) | plain-field frames 5–20%; a colour moment in every 40-s band; ≥ 4 moods; colour backgrounds 20–30%; first 30 s "plain backgrounds 2 max — they all look alike" | Caps white frames at 20% and asks for colour movement — opposite of A1. |
| 5 | `qa-colour-v17.cjs` L11, L16; `qa-sequences-colour.cjs` L20, L24 | tier: `["WHITE","NEUTRAL"] → "white"`, ACCENT counted as white space; "white space ≥ 35%: ok" | On Seven Things it reported "white 40 (18%), one soft colour + white 50 (22%)" and passed — while the painted measurement in the same suite says **pure white 14 (6%)**. `qa-sequences-colour` reported "white idea frames 90". The white metric is measuring beige and tinted walls. |
| 6 | `qa-colour-v17.cjs` L19–21 (warn) | "long stretches on one kind of background — vary scene to scene" (7+ frames) | Warns on a run of white frames. |
| 7 | `qa.cjs` L543–547 (warn); L459 (flag) | "floating heads — a huge face alone on a plain background reads as a weird close-up"; "two huge faces within three frames"; XCLOSE "target 5–10%: fewer but stronger" | Pushes against A5 face-only/white close-ups. |
| 8 | `qa.cjs` L174–177, L541 (flags); L569–570 (warn) | "target 30+ locations"; "two heaviest locations under 40%"; "3+ locations in 7 frames"; "rotate the room's five views" | Variety by room count (A13 conflict). |
| 9 | `qa.cjs` L550 (flag); `SKILL.md` L406; `staging-and-props.md` §1 L9–10 | "a story object placed deliberately in 60%+ of character frames" | A12 "one strong object, one strong face, one strong gesture"; A3 love/trust shown with no object at all. |
| 10 | `qa.cjs` L151, L156 (flags) | 10%+ DOMINANT/OVERWHELMING frames and "1 scale change" per segment | Pushes giant objects into every segment regardless of A12. |
| 11 | `qa.cjs` L479–488 (**FAIL**) | fresh stimulus = metaphor or transformation edit only | See 2.4 #8. |
| 12 | `qa.cjs` L302, L486–487, L571–572 (flags/warns) | concept frames 45–60%; 2+ per segment of 8+; "segments of 8+ frames with no visual metaphor" | See 2.4 #7. |
| 13 | `qa-consistency.cjs` L9–11 (**FAIL**) | "pure-white face close-ups name no room part" (table, chair, door, bed, wall…) | Blocks A13's "one door outline / one bed outline" in a white frame with a face. |
| 14 | `qa.cjs` L261–262 (warn) | warns on "outline of" | See 2.3. |
| 15 | `qa.cjs` L397–398 (warn) | "white face/figure hero on a BRIGHT near-white background — use NEUTRAL (light warm grey)" | Steers white-face frames to beige. |
| 16 | `qa.cjs` L399–400 (FAIL) | "mood palettes where furniture matches the wall tone" | Requires furniture to differ from the wall in colour; outline furniture on white has no fill colour. It passed on the current moods, but a new white/outline palette must be checked against it (proposal: run it once on a white-palette test build). |

### 2.7 Stale text in the files read first (they contradict newer sections of the same skill)
- `RULES-CARD.md` §5 L68–69 still says: "**Rooms have character:** two or three calm details per setting in the house tones;
  close-ups add one short glimpse of the room behind the head." — marked superseded only in SKILL.md L287–289, not in the
  card that SKILL.md says to read first (L228–229, L335).
- `RULES-CARD.md` §6 L73 "most frames (Video 5: 87%)… no frame without an edit, reveal or pop"; §7 L96 "30+ locations".
- `SKILL.md` QUICK START L231–234 ranks "THOMAS'S RULES (neutral first; metaphor as the main visual engine…)" second in
  priority — this is the Video 4/5 reading, now outdated on both counts.

### 2.8 Internal inconsistencies found on the way (not about Oct 5, but they will bite the next build)
- Hands-only frames: `constants.md` L53 `HANDS_ONLY_CONSTRUCTION` "entering from the left and right frame edges",
  `characters.md` L69–70 and `motion-and-energy.md` L139–142 "short forearms from the sides" vs v18.2/18.3 "from the
  bottom edge" (SKILL.md L119–120; `qa-consistency.cjs` L27 fails side entries).
- Mouth: `constants.md` L47 `REFERENCE_LOCK` and `RULES-CARD.md` L22 "small mouth line" vs v18.5 "Every mouth is a
  shape, never 'a small … line'" (SKILL.md L17).
- HUGE face: `constants.md` L104 "placed off-centre" (CHANGELOG v18.3 says replaced) vs `motion-and-energy.md` L82
  "Centre the face" and `qa.cjs` L593–594.
- `constants.md` says its constants are verbatim copies of the template (L5–8), but `COLOUR_HIERARCHY`, `DETAIL_CAP` and
  `GLOBAL_AVOID` differ from `assets/compiler-v18_3/template.jsx` L47, L49, L55.
- Memory colour: `director-framework.md` L37 "frosty blue" vs v18.2 "faded grey memory" (SKILL.md L94).
- Touch: `emotion-and-performance.md` L117 "Touch is rare and meaningful" vs v18.2/18.5 "a touch… wherever the action
  allows" (SKILL.md L24–25, L121–122).

---

## 3. Rules that already support the Oct 5 direction — keep, and strengthen

"Strengthen" notes are **proposals**.

### 3.1 Focus, fewer elements, white
| Rule (file · line) | Quote | Supports | Strengthen (proposal) |
|---|---|---|---|
| Visual order constant — `SKILL.md` L72–74; `contrast-and-detail-v18_2.md` L18–20; compiler `COLOUR_HIERARCHY` (template.jsx L47) | "Every frame reads in this order: the characters and their faces → the one story object → the background." | A12 "The viewer should always know immediately where to look"; Oct 3 note | Keep as constant; change the background clause from "a soft colour behind the characters" to white/very light neutral by default. |
| Fewer things, stronger things — `director-rules.md` §8 L59–65; §37; §25 | "If removing an object makes the idea clearer, remove it… intensity comes from scale, camera, expression and one strong colour, never from cramming." | A12, A16 "Less, but stronger" | Promote to the top of SKILL.md with Thomas's wording "one strong object, one strong face, one strong gesture". |
| Set pieces by need — `SKILL.md` L98–109; contrast-and-detail §3 | "Each room is its soft wall, its floor and ONE anchor piece… Every other piece… appears only in frames whose own action… uses it"; "No room dress at all"; "'the plain wall' is a valid third." | A12, A13 | Make the anchor an **outline on white** (see G6), drop it in close shots by default (`na`), and replace "soft wall" with "white". |
| ACCENT as compiled — `assets/compiler-v18_3/template.jsx` L134 | "the floor and the furniture are white with thin soft grey outlines; strong colour only on the one or two important objects" | A1, A13 — this is already nearly the new look | Base the new default background on this mood with the wall also white or very light neutral (value to be agreed — §5 Q2). |
| Thin background lines — `SKILL.md` L81–82 | "Background lines are thinner and softer than the characters' outlines; characters and story objects keep the bold black outline." | A1 outlines; Oct 3 "lines that don't compete with character outlines" | Keep; it is the key to outline-only rooms that do not compete with white characters. |
| `b.plain` uncoloured objects — `colour-and-text-v17.md` L8; `data-fields-and-build.md` L29 | "PROP keys drawn uncoloured (black outline, white fill)" | A1 "do not fully color every object just because it exists in the scene" | Make uncoloured the default for every non-hero object; colour becomes the opt-in. |
| OBJECT FOCUS — `SKILL.md` L111–117 | "only plain wall or plain background behind it… outlined with the same bold black line as the characters; other objects smaller and quieter" | A1 example "If the phone is important, let the phone stand out" | Say "plain white" instead of "plain wall". |
| Pure-white face close-ups — `SKILL.md` L85–87; contrast-and-detail L40–44 | "a 2–3 second visual break, nothing behind the face, no room words in the frame's text" | A5 "a large face on a white background is much stronger than a complete room" | Lift from "visual break" to a main tool; keep the useful part (no room words in a face-only frame). |
| Meaning colours — `SKILL.md` L92–94 | "Meaning colours stay for meaning: night navy, the storm, one peak colour per chapter" | C "Full coloured scenes stay for emotional peaks and night scenes"; Video 4 "dark blue/grey night scenes work well" | Keep, pending §5 Q1 on how often. |
| Contrast constant — `director-framework.md` §8 L77–78 | "the hero always differs from its background in hue and brightness; never the same colour family" | A10 (colour part only) | Extend to A10's whole list (empty vs object, wide vs XCLOSE, serious vs humour, still vs movement, small prop vs large face, silence vs beat). |
| No real/photo material — `director-rules.md` §54 L358–360 | "No mixing of realistic illustration, 3D, watercolour, comic shading, painterly work or photo cut-outs" | D "for now, let's leave real objects out" | Add D's decision as the reason. |

### 3.2 Emotion, faces, interaction
| Rule (file · line) | Quote | Supports | Strengthen (proposal) |
|---|---|---|---|
| v18.5 expression rules — `SKILL.md` L17–25; compiler `GLOBAL_AVOID` (template.jsx L55) | "Every mouth is a shape, never 'a small … line'"; "EXPRESSION STRENGTH… FULL on hook and emotional beats — steep eyebrows, pupils pressed to the target, a bold mouth, the head tilted and the body leaning, recoiling or slumping"; AVOID "blank, neutral or half-hearted faces and stiff upright bodies" | A4 "They should clearly react"; D "stronger facial expressions… stronger gestures and body language" | Cover A4's full list explicitly: eyes, eyebrows, mouth movement, **head position, hand gestures, posture, eye direction**. Fix the stale "small mouth line" in REFERENCE_LOCK (2.8). |
| Build order — `emotion-and-performance.md` L11–22; `director-rules.md` §17 | "Feel → Face → Eyes → Body → Hands → Distance → Camera → Object → Colour" | A14 "What is the viewer supposed to feel here? Only after that should we decide: background, prop, color, camera angle, movement." | Already Thomas's order; make it the first line of every frame's `why`. |
| Four questions + `b.why` — `director-framework.md` §2 | "Purpose… Feeling… Focus… Change" | A14, D "a clear purpose" | Reorder to put Feeling first, as A14 does. |
| Expression table — `emotion-and-performance.md` L43–62 | rows for Ignored, Rebellious/dismissive ("rolled to the top of the eye circles"), Defensive, Embarrassed, Guarded/uncertain, Calm/calming parent ("low, relaxed, at his level") | A2 hesitation, A7 eye roll, A3 kneeling to the child's level | Add rows Thomas named that are missing: hesitating before telling the truth, looking away but still listening, pretending not to care, starting to speak then changing mind, noticing discomfort, parent stopping before reacting. |
| Eyes — `emotion-and-performance.md` L67–71 | "Visible eye contact. Looking away when someone emotionally withdraws… The eyes should never feel static." | A2 "eye contact", A3 "a teen looking away but still listening" | Keep; tie to the behaviour library (G1). |
| Distance — `emotion-and-performance.md` L162–167 | "Conflict opens the space; connection closes it." | A2 "distance between people"; A3 "sitting next to", "two people sitting together" | Keep as the main way to show closeness instead of symbols. |
| Interaction vocabulary — `emotion-and-performance.md` L111–116 | "sitting down beside; leaning in or leaning away… a hand hovering, not quite touching" | A3 "a hand reaching out", "a parent quietly sitting next to a teenager" | Grow into the behaviour library (G1). |
| One-sided beats `os` — `SKILL.md` L57–58; `qa-lessons-v18_3.md` §9 | "when the point is that nobody reacts" | A7 "teen wants attention but pretends not to care", "parent misunderstands silence" | Keep. |
| Reactions as edits — `motion-and-energy.md` L198 | "reactions on the key word (a head snapping up, an eye-roll, a smile breaking)" | A4, A8 "short funny reaction" | Keep. |
| Sequences 3–5 images — `motion-and-energy.md` L206–211 | "an important or emotional moment is told as 3–5 images in one scene" | A7 "parent walks past the room, notices something is wrong, and comes back"; "child starts to say something but changes their mind" | Use the A7 list as sequence templates. |
| Stillness on purpose — `director-framework.md` §4 L44–47 | "an emotional hold (stillness gives weight)… mark it b.still" | A10 "still moment vs movement", A15 "sudden silence visually" | Name "silence" as a planned beat in the director's read. |

### 3.3 Story, recurrence, humour, text, variety
| Rule (file · line) | Quote | Supports | Strengthen (proposal) |
|---|---|---|---|
| Motifs with an arc — `SKILL.md` L500–502 (MOTIFS "with the states they move through"); `metaphor-bank.md` §1 step 6 L22–23; `qa.cjs` L371–375 | "the same metaphor comes back later changed (the wall comes down, the vault opens…) — that is what makes it a story, not decoration" | A11 "evolve with the story; mean something different later… not only because it looks good" | Require each return to state its **new meaning** (not only a new state) and its emotional step. |
| Recycled-shot rule — `director-rules.md` §15 L93–97; `qa.cjs` L184–189; `qa-render-risk.cjs` L24–26 | "change the camera distance, the hand action, the expression or the whole composition" | D "never feel like… the same composition keeps coming back" | Widen to the whole film (see G3). Evidence it is needed: on Seven Things the suite warned 19 times "same room from the same angle and size within six frames" and "screen sides lopsided: parent left 13 / right 95". |
| Humour as recognition — `aha-humour-popins.md` §4 L45–57 | "The funny that works for parenting is **recognition**… the teen answering 'fine' with a face that says the opposite"; "never on the child's pain" | A8 "not childish humor… small relatable moments"; A7 "I'm fine" | Add Thomas's list (exaggerated parent reaction, "seriously?" look, awkward pause, parent overthinking, say/do contradiction, short funny reaction then back to serious). The "one light beat every 60–90 seconds" cadence (L55) is the skill's number, not his. |
| Aha techniques — `aha-humour-popins.md` §3 L31–43 | "Contradiction, then resolution"; "Visible reaction" | A8 "visual contradiction between what someone says and what they actually do" | Keep. |
| Keyword mechanism — `colour-and-text-v17.md` L22–26; `b.keyword`; `qa-colour-v17.cjs` L29–42 | "Selected words only, clean, readable, one consistent style… added by Muhammad in Premiere, never baked into the image" | A9 "Not too much… only at strong moments, not constantly" | Keep the mechanism; change what is chosen (idea words, not chapter numbers) — G8. |
| Director's read — `references/director-read-template.md`; `director-framework.md` §1 | emotional curve, 8–12 signature images, move or hold, face / idea / place, colour rhythm, keywords, risks | D "define the emotional beats, camera angles, reactions, and visual contrasts very clearly before production starts" | Extend into the pre-production plan (G4). |
| Shot vocabulary — `constants.md` L79–87 `SHOT`; eyes-only crop (SKILL.md L55–56) | XCLOSE, CLOSE, MEDIUM, MEDWIDE, WIDE, HANDS, OBJECT | A6 "wide shot, medium shot, close-up, extreme close-up, object close-up, reaction shot" | Add "reaction shot" as a planned type (it exists only as the OTS_REACTION device). |
| Objects designed — `SKILL.md` L282–284; `constants.md` PROP L221–241 | "Objects are designed, never generic… one characterful, countable detail" | D "better and more mature props" (consistency half) | Add a maturity test (G5). |

---

## 4. Gaps — what the Oct 5 direction asks for that the skill does not cover

Each gap names the client source; everything under "Proposal" is mine.

**G1 · Behaviour library for love, trust, attention, emotional safety (A3, A2).** The skill has symbols for these ideas
(metaphor-bank L49, L55, L59) and a short interaction vocabulary (emotion-and-performance L111–116), but nothing that maps
the idea to a staged behaviour. Thomas's own list: "a parent quietly sitting next to a teenager; a teen looking away but
still listening; a hand reaching out; a parent stopping before reacting; a child hesitating before telling the truth;
someone noticing the other person is uncomfortable; a parent kneeling down to the child's level; two people sitting together
without needing a heart symbol." *Proposal:* a `behaviour-library.md` (idea → behaviour → shot distance → both
performances → the edit that moves it), and a rule that love/trust/attention/safety lines are staged as behaviour first;
a metaphor only if it passes the maturity test (G5).

**G2 · Everyday-situation library (A7).** Only four recognition examples exist, inside the humour section
(aha-humour-popins L47–49). Thomas listed ten: "teen says 'I'm fine' but clearly is not; parent asks too many questions;
teenager rolls their eyes; child hides something; parent walks past the room, notices something is wrong, and comes back;
teen wants attention but pretends not to care; parent misunderstands silence as disrespect; child starts to say something
but changes their mind; parent tries to help but accidentally makes the situation worse; awkward silence after an
argument." *Proposal:* a library of these as 1–5-image mini-sequences (setup → beat → reaction), each tagged with the
psychology ideas it can carry, so explanation lines can be staged as real moments instead of rooms or symbols.

**G3 · Composition-repetition control across the whole film (D, A6).** D: "the viewer should still never feel like the
visuals are repeating or that the same composition keeps coming back." Existing checks are local: three identical shot
sizes in a row (`qa.cjs` L139 — MEDIUM, MEDWIDE and WIDE count as different, so a medium/wide run passes), exact recycled
shots within 15 frames (L184–189), same room/angle/size within 6 frames (L569, warn only). Nothing tracks distance class,
subject position or background type across the film. Evidence: G's 14 runs of 3–6 medium/wide frames, and the suite's own
"screen sides lopsided: parent left 13 / right 95" warning on Seven Things. *Proposal:* a per-frame composition tag
(distance class close/medium/wide, subject position L/C/R, figure count, background white/outline/colour) and checks for
runs of medium/wide and for over-used composition tags — thresholds to be set by Muhammad, not presented as Thomas's.

**G4 · A pre-production plan of emotional beats, camera, reactions and contrasts (D).** D: "define the emotional beats,
camera angles, reactions, and visual contrasts very clearly before production starts." The director's read
(`director-read-template.md`) covers curve, signature images, move/hold, face/idea/place, colour rhythm, keywords, risks.
Missing: a camera-distance strip per chapter; the planned reaction for each beat (who reacts, how); a contrast map (where
each A10 contrast lands); a pattern-interrupt map (A15); the text moments (A9); the humour beats (A8); the everyday
situations chosen (A7). *Proposal:* extend the template with these rows; whether Thomas sees it is §5 Q7.

**G5 · Prop maturity rules (D "better and more mature props"; A2 "Some symbols still feel too simple or childish… the
smartphone with the large heart feels too basic").** Object rules cover consistency and design detail, not maturity. Some
of the skill's own design examples may read cute ("the phone's ray lines… the keys' pompom", SKILL.md L283–284).
*Proposal:* a maturity test per PROP (is it a real household object a parent would recognise, or a kids' icon — hearts,
stars, trophies, podiums, smile masks, cartoon creatures?), applied before a prop enters the build. Only the heart phone is
Thomas's explicit example; the rest of G's symbol list should be reviewed, not assumed rejected (§5 Q4).

**G6 · Outline-only environments (A1, A13, C).** No definition exists; the skill forbids "outline-only shapes" (2.3).
Missing: what an outline set piece is, which pieces stand for each place ("one door outline, one bed outline, one chair, one
object"), when the place is dropped altogether, how room masters work for outline rooms, the compiler mood/world for it,
and QA that allows it. *Proposal:* define an outline piece as a complete, closed line drawing with white fill, drawn in the
thinner, softer background line (SKILL.md L81–82) — this keeps "finished, never half-drawn" true while meeting A13.

**G7 · Keeping white characters readable on a white default (Oct 3 note vs A1).** The skill's only answer is the tinted
wall behind the characters, which is what A1 now criticises. Nothing covers how a white character separates from white
(outline weight, a ground line, a very light neutral field directly behind the figure, the coloured object as anchor).
Needs test renders and a decision (§5 Q2).

**G8 · Intentional text policy (A9, D).** The keyword mechanism exists; selection criteria do not fit A9. Missing: words
chosen from the idea of the line (Thomas's examples are concepts and misreadings: TRUST, SAFE, LISTEN, TESTING, SHAME,
CONTROL, MISREAD, ATTENTION, OVERWHELMED, HONESTY, NOT REJECTION), not chapter numbers; one-word text as a pattern
interrupt (A15); "only at strong moments, not constantly" (no number given by Thomas). §5 Q5.

**G9 · Pattern-interrupt plan (A15).** Thomas's nine types (sudden white background, extreme close-up, one-word text,
unexpected object, funny reaction, strong pose, short metaphor, sudden visual silence, large facial reaction) are not a
field or a plan anywhere; the QA stimulus check counts only metaphors and transformation edits (2.4 #8). *Proposal:* a
`interrupt` field with these nine types and a check that counts all of them.

**G10 · Contrast as a planning unit (A10).** The skill treats contrast as colour only (hero vs background). A10's pairs —
"empty background vs strong object; neutral scene vs one bright color; wide shot vs extreme close-up; serious moment vs
humorous reaction; still moment vs movement; small prop vs large face; silence vs strong visual beat" — have no field, plan
or check.

**G11 · Shot types Thomas named that have no slot (A5, A6).** "reaction shot" and "face + hands" are not shot types
(`HANDS` crops the head out; reaction exists only as the OTS_REACTION device). "Object close-up" exists (`OBJECT`).

**G12 · Meaning log for recurring objects (A11).** MOTIFS stores states, not "what it means now" and "which emotional step
it supports"; the motif QA (`qa.cjs` L371–375) checks spread (early, late, 3+ segments), which rewards returning for
coverage — the reason Thomas warns against ("only because it looks good").

**G13 · Mature-humour test (A8 "not childish humor… human and relatable").** The skill bans slapstick and humour at
the child's pain (aha-humour-popins L38, L52) but has no positive model of Thomas's list (G2 overlaps).

**G14 · Asset gap for stronger teen faces (A4).** `characters.md` L83–84: "The first SON expression sheet drew teeth in
the angry face and was held back; when a version with a plain black open mouth is approved, add it as
`son-expressions.png`." No SON expression sheet exists, while A4 asks for stronger faces. *Proposal:* Muhammad generates
and approves one.

---

## 5. Open questions only Thomas or Muhammad can answer

1. **Full-colour scenes (Thomas).** The approved summary keeps "Full coloured scenes … for emotional peaks and night
   scenes"; the long note lists "full-screen color" under "Less". Seven Things had 17% full-colour fields (night navy 16,
   bold berry 7, storm violet 5, bright aqua 4, faded grey 4, others). Which beats count as emotional peaks, does "full coloured"
   mean a full-screen colour field or a coloured room, and roughly how often per video is right?
2. **What "very light neutral" means, and how white characters stay readable (Thomas, with Muhammad's test renders).**
   Pure white only, or a near-white neutral directly behind the characters (his Oct 3 note asked for "subtle soft colour
   (very light grey, beige, blue) directly behind characters")? He has twice criticised pale sameness before (Video 3:
   "white or very pale backgrounds — this is where we lose visual energy"). *Proposal:* show him a 10–15-frame test strip
   in two or three background options before the next full build.
3. **Face-only on white vs the "floating head" rule (Muhammad).** The skill bans "a huge face alone on a plain
   background" because Muhammad called three such frames in twelve "weird" after the Video 4 hook. Thomas now asks for
   "face-only moments" and "a large face on a white background". Was the objection about frequency, coloured fields, or
   render quality — and how many face-only frames in a row are acceptable?
4. **Metaphor share and which symbols are childish (Thomas).** Does "raise the share of visual metaphors even more"
   (→ the skill's 45–60%) still stand, or does Oct 5 mean fewer, stronger ones? Beyond the heart phone, which of Seven
   Things' symbol props (smile mask, trophy, podium, gold star, star frames, dinosaur story bubble) felt too childish?
5. **Text moments (Thomas).** Can words like SHAME, OVERWHELMED or NOT REJECTION sit on emotional peaks (the skill
   currently forbids keywords there)? Are chapter-number cards ("NUMBER ONE…") still wanted on list-style scripts, or
   should they go?
6. **How much "place" an outline room shows (Muhammad, maybe Thomas).** Floor line or no floor line; black thin outlines
   or soft grey; does the anchor outline appear in close-ups; what a wide shot looks like on white.
7. **Who sees the pre-production plan (Muhammad / Thomas).** D asks for beats, camera, reactions and contrasts defined
   "before production starts". The skill has no approval stop by Muhammad's choice. Is the plan for Muhammad only, or
   does Thomas want to see it per video?
8. **Keyword style (Muhammad).** The skill holds two keyword styles (hand-drawn black capitals vs bold rounded sans-serif
   with a white outline, 2.5 #5). Which is the channel's?

