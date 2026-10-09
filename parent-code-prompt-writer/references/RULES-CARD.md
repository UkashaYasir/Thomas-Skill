# RULES CARD — v19 (the whole system on one card)

**Principles (v19-principles.md §0):** emotion before decoration; plan before production; better, not more — the visuals
never feel like they repeat; Less: background, decoration, full-screen colour, random props, generic symbols — More:
emotion, faces, gestures, relatable situations, contrast, close-ups, meaningful colour, strong visual ideas, humour,
memorable moments; the style stays fully illustrated (real objects out).

Read with `v19-principles.md`, which wins on any difference. Each section names the file that owns the detail. No rule
here is a number: every creative choice is judged by the moment. Every list is seed examples plus a method — when a line
needs something new, make it with the method in the owning file.

## 1. Input and output
- Input: Muhammad's script split into lines (and chapters), optionally the voice-over timing and Thomas's editor briefing.
  Lines and timing are final: never merge, split, reword or re-time them.
- Output, in one reply: the shot plan inside the build (every plan field on every frame), the compiled build, the Copy
  page (the one page Muhammad generates from), the Edit page, all checks passing, at least three QA rounds. No approval
  stop, no batches. (SKILL.md)

## 2. Characters and new cast
- Only two reference images exist: MOM (black hair centre-parted to the jaw, a round bun on top) and SON (messy spiky
  black hair). Round white heads, big white eye circles with black pupils, short thick eyebrows, a drawn mouth that changes
  shape, thin black line bodies, white mitten hands, white oval feet. Hair solid black. The teen's head always lower than
  the adult's. Proportions come from the images. (`characters.md`)
- No clothing; small accessories only, locked in the ROLE. No teeth.
- Every other character is copied from MOM or SON, changing only the hair (a beard or moustache counts as hair), the size and age, and small accessories where they tell people apart or cue the role — described in
  the prompt. The cast grows with the story: design every person the story needs. Never bald, never a featureless round
  head; each role has its own hair outline. Check new characters with a lineup render. (`cast-design-v19.md`)

## 3. Background and colour
- Default **CLEAN**: a very light neutral ground (`CLEAN_GROUND`, default #F7F6F3 until Thomas picks from the test strip).
  **WHITE**: pure white for face-only, object-only and word frames and deliberate white breaks.
- Places are **outline cues**: thin soft-grey outlines with white fill, complete closed line drawings — only the pieces
  the frame names; a thin ground line on wider shots. Never coloured rooms, tinted walls or coloured furniture.
- **One colour element** per frame (`ce`): the important object or part of it — or none, when the face carries the frame.
  "If the phone is important, let the phone stand out. If the face is important, keep almost everything else neutral."
- Full colour only for **PEAK** (an emotional-peak scene, `pk`) and **NIGHT**, and rarely; never a full-colour field
  behind a face close-up. **MEMORY** is the faded past. Red only for danger or a warning.
- Characters are seen first: white characters with bold black outlines; set pieces thinner and softer, never competing.
- Prompts phrase colour positively ("The background is…", "The only coloured element in the whole image is…").
  (`style-and-colour-v19.md`)

## 4. Camera and close-ups
- "Bring the camera closer": wide, medium-wide, medium, close-up, extreme close-up, face + hands, reaction shot, hands,
  object, word frame. "Sometimes a large face on a white background is much stronger than a complete room." Important
  emotional lines feel important.
- **Close-ups make sense**: a reason (the emotional peak, a reaction, a detail the line names); the place shown before;
  the gaze matching who or what was established (`look`); the cause visible or clearly placed (`ctx`); open space on the
  side the eyes look; the head shape whole (eyes-only is the one planned exception, with its cause shown); no random crops.
- The same character in back-to-back frames changes size or angle clearly. Inside a scene people keep their screen sides;
  variety of sides comes between scenes. No composition comes back unchanged.
- Natural camera positions only; exaggerated angles render badly. (`camera-and-closeups-v19.md`)

## 5. Faces, bodies and interaction
- Every performance names the seven features the shot can show: **eyes, eyebrows, mouth, head position, hand gesture, posture, eye direction** — one
  clear emotion described by what the face and body do, with a verb, never a static state. "They should clearly react." In WIDE and MEDWIDE the body carries the feeling and each
  small face keeps one bold shape; eyes-only frames use the eyes, eyebrows and eye direction.
- Every frame with more than one person shows an **action and a visible reaction** (`ia`) and a **planned distance**
  (`dist`): apart for conflict, close for repair, touch where it pays off. Eye contact or its avoidance is named.
- Love, trust, attention and safety are shown through **behaviour**: sitting quietly next to the teen, looking away but
  still listening, a hand reaching out, stopping before reacting, hesitating before the truth, noticing discomfort,
  kneeling to the child's level, sitting together without needing a heart symbol. (`acting-and-interaction-v19.md`)

## 6. Story content, props and metaphors
- **Real everyday situations** parents and teens recognise at once — the "I'm fine" that isn't, too many questions, the
  eye roll, the parent who walks past, notices and comes back, help that makes it worse, the awkward silence after an
  argument — and any other moment the line calls for. (`everyday-situations-v19.md`)
- **Mature props**; "we are not creating a kids channel". No hearts, stars, trophies, emoji icons, question marks or
  picture bubbles standing in for a feeling. Every prop passes the maturity test.
- **Metaphor only where it adds meaning** the words don't already carry; real moments carry the everyday lines.
- **Recurring objects** have a reason, evolve, mean something different later and return with a new picture — never
  only because they look good.
- "One strong object, one strong face, one strong gesture." The viewer always knows where to look.
  (`props-symbols-metaphors-v19.md`)

## 7. Humour, words, contrast, interrupts
- Humour that is not childish: an exaggerated parent reaction, the teen's "seriously?" look, an awkward pause, a parent
  overthinking, words that contradict actions, a short funny reaction before returning to the serious topic. Setup, a
  held beat, then the reaction.
- On-screen words: a few strong idea words or short phrases (TRUST, SAFE, LISTEN, SHAME, MISREAD, NOT REJECTION…) only at
  strong moments, never chapter numbers or sentences; added by Muhammad in Premiere in one style (`kw`).
- Contrast inside and across frames (`cx`) — Thomas's pairs as seeds: empty background vs strong object; neutral scene vs
  one bright colour; wide shot vs extreme close-up; serious moment vs humorous reaction; still moment vs movement; small
  prop vs large face; silence vs strong visual beat.
- Pattern interrupts related to their line (`ip`) — his seeds: suddenly white background; extreme close-up; one-word text;
  unexpected object; funny reaction; strong pose; short metaphor; sudden silence visually; large facial reaction. Vary
  them across the film so no type becomes a habit; pace follows emotion — more switches through calm explanation, held
  frames at the peaks (tier `Q` for a held, still beat). (`humour-text-contrast-v19.md`)

## 8. Animation inside a scene (CORE RULE)
- A change inside a scene is a detailed **image-edit prompt** on that frame's image (who changes, from what to what, one
  change at a time, what stays exactly the same), never a new prompt; never more than two edits from a generated base.
- An object appearing is a **mask reveal**: alone on the ground, a table top, a shelf or a screen, apart from hands and
  bodies, uncovered on its word.
- Important moments can be a **short sequence of stills** in one scene; simple moments stay simple.
- Edit wording: no quoted words, no "finger", no anatomy, clothing or lighting words; never name what is not in the frame.

## 9. The shot-plan fields (every frame; `shot-plan-v19.md`)
| Key | Meaning |
|---|---|
| `ln` | the line type (hook, chapter-turn, child-voice, scene-setting, dialogue, statement, humour-aside, peak… open list) |
| `ft` | what the viewer should feel |
| `idea` / `alt` | the chosen idea / the other ideas explored (explore every direction, keep the strongest) |
| `ia` / `dist` | who does what → who reacts how / touching, close, apart or far (two or more people) |
| `look` / `ctx` | where the eyes go and on which side / why the close shot makes sense (close shots with a face) |
| `ce` | the one colour element, or "none" |
| `cx` | the contrast this frame makes (or "affinity — " and why) |
| `ip` | the interrupt type, when the frame is one |
| `pk` | true on a planned emotional peak (required for PEAK) |
| `kw` | an idea word for Premiere, only at a strong moment |

## 10. Build, checks and delivery
- Build with `assets/compiler-v19/` (`node assemble.cjs`), check with `scripts/qa-all.cjs` until every check passes, then
  read every prompt against v19-principles at least three times. Checks pass or fail by rules; distributions are
  information only.
- Make the Copy page and Edit page (`scripts/copy-page.cjs`, `scripts/edit-page.cjs`), publish both, deliver the build.
- After each video, add what worked to the v19 libraries.
- Every skill update: bump the version in SKILL.md, add a CHANGELOG.md entry, name the package
  `parent-code-prompt-writer-vN.skill`, list the additions in the reply.
