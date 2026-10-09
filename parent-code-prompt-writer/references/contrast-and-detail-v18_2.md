# Contrast, detail and object focus — v18.2 (Thomas, Oct 2026), superseded by v19

> **Superseded by v19 — see `style-and-colour-v19.md`** (background, colour, outline places) and `v19-principles.md` §1
> and §4. The v18.2 answer to white characters on white — a soft tint on every room's wall with tonal furniture in the
> same hue — is exactly what Thomas rejected on 5 Oct 2026 ("When the wall, floor, furniture, and surrounding objects all
> have similar colors, the frame becomes flat and repetitive"). The tint table, the per-room hues, NEUTRAL beige, ACCENT
> with the room's wall and "WHITE only for close-ups and object frames" are retired. What still holds is kept below,
> rewritten to agree with v19.

## Thomas's Oct 3 note (history — the problem it names is still real)
> "The main issue for me is not the colour combination itself, but the contrast between the characters and the background.
> Because our characters are mostly white, they partly disappear against very light or white backgrounds… In the left
> version there is sometimes too much colour. The furniture, floor, walls and other elements get almost as much visual
> attention as the characters… Don't put too many objects and too much background detail into every scene… Sometimes the
> scene can even be completely white and extremely simple… The goal should always be: first I see the characters and their
> emotion, then the main action or object, and only after that the background." — Thomas

How v18.2 answered it (history): Version 2 had the same pale sage, powder blue and lavender at the same strength
everywhere ("monotonous"). Version 3 gave every room its own clear hue — warm walls rendered mustard, the honey floor
rendered strong orange and swallowed the tangerine jar lid, and heavy furniture took as much attention as the people. A
white paint-over was "too simple" and the white characters vanished. v18.2 then tinted every wall; Thomas's 5 Oct note
rejected that. **How v19 answers it:** the characters keep bold black outlines and are drawn on a very light neutral
ground (CLEAN), the set pieces are thinner, softer soft-grey outlines that never compete, nothing white-filled overlaps a
character's outline, and only one element carries strong colour (`style-and-colour-v19.md`).

## 1. Visual order (constant — still in force)
Characters and faces → the one story object → the background. Thomas, 5 Oct: "The viewer should always know immediately
where to look." The compiler writes one of three order lines: characters on the very light neutral ground with outline
places; a face alone on pure white; an object with no characters.

## 2. Background and colour — now in `style-and-colour-v19.md`
| Element | v19 rule |
|---|---|
| Ground behind the characters | CLEAN: a very light neutral ground (the compiler's `CLEAN_GROUND`); WHITE (pure white) for face-only, object-only, word frames and deliberate white breaks |
| Floor | one thin soft-grey ground line in wider shots, not a filled floor |
| Furniture and place pieces | thin soft-grey outlines with white fill — complete, closed line drawings, never coloured |
| Background lines | thinner and softer than the characters' outlines |
| Characters and story objects | bold black outline |
| Colour | one colour element per frame (`ce`), or none when the face carries the frame |
| Full colour | PEAK (an emotional peak, `pk: true`) and NIGHT only; never behind a face close-up |
| The past | MEMORY: a faded light grey, only the story object coloured (#DDE1E7 / #EEF0F3 / #B8BFCA) |

Still true: no gradients (they render as glows and vignettes); red only for danger; near an orange story object keep
every large area clean (an orange object dies on wood, honey, mustard or peach).

**Face-only frames on white.** Thomas, 5 Oct: "Sometimes a large face on a white background is much stronger than a
complete room." A face alone on pure white is a main tool for important emotional lines, not only a short break. The
setting says "only a plain, clean, pure white background — no room, no furniture, no wall or floor lines; nothing but the
characters (and the story objects named)", and the frame's own text names no room part. The close-up must still make
sense — the place was shown before, the gaze points at someone or something established, the head shape stays whole with
open space on the side the eyes look (`camera-and-closeups-v19.md`).

## 3. Set pieces by need — outline cues, not rooms
Thomas: "Reduce full room scenes… one door outline, one bed outline, one chair, one object is enough to communicate the
place."

| Place (seed examples) | Outline cue that can say the place | Other pieces, only when the frame uses them |
|---|---|---|
| Kitchen | a small round table | a chair for each person sitting, a doorway, a counter (a flat top on a plain block, no sink, taps, drawers or handles), a fridge (one block, one handle) |
| Living room | a sofa | window, shelf, doorway |
| Hall | the front door | hall table, stairs |
| Bedroom | a bed | wall shelf, door |
| Office | a desk | a second desk |
| Landing | a bedroom door | stair rail, open doorway |

These are seed examples; any new place is made the same way — pick the one piece a viewer recognises the place by.
- A piece appears only when the frame names it (`b.pieces`, computed by the assembler). There is no automatic anchor
  piece: the place is established by the frame that names its outline cue, and close shots show only what their own
  action or placement names — usually nothing.
- No room dress: pictures, posters, rugs, plants, drawings, hooks, mats, lamps, skirting, planks, tiles.
- Placement never fills a third with furniture — "the plain white ground" is a valid third. Placement never names a wall
  colour.
- Room masters, when used, are minimal outline drawings; the room reference keeps only the named pieces, "even if the
  attached image shows more" — an attached master otherwise copies all its furniture into every later frame.

## 4. The story object is second (still in force)
OBJECT FOCUS line in every frame with a story object: after the faces the eye goes straight to it — a little larger than
life (large and central in hands and object shots), plain white around it, fully visible, outlined with the same bold
black line as the characters, carrying the frame's one colour; other objects smaller, quieter and uncoloured.
- `fo: "light"` where smallness is the story (a moment drifting away, something shrinking to a dot).
- `fo: "door"` (or `mf: "door"`) where the door is the story object: the door gets the bold outline.
- Hidden from a character, still turned toward us ("behind his back, turned toward us, hidden from MOM").
- Spine objects are designed to read at a glance (the jar: bold outline, a big lid).

## 5. Hands, interaction, children (still in force, wording brought to v19)
- Hands-only frames: forearms rise from the bottom edge, or the bottom corners for two people, as short lines. Two arms
  from opposite side edges render as long cables across the frame.
- Distance is planned (`acting-and-interaction-v19.md`): apart for conflict, close for repair, touch where it pays off.
- A small child alone in a medium shot needs a size cue (the bed outline at his shoulder height, an object big in his
  small arms).

## 6. Checks
The v19 checks live in `scripts/` (agent E's rebuild; see `assets/compiler-v19/README.md`): WHITE frames name no room
part; CLEAN frames carry no tinted wall or furniture wording; full colour only with `pk` or NIGHT; no room dress; no
texture in settings; one-person hands never enter from both side edges; object focus light where the object is small on
purpose; hidden objects turned toward us; placement names no wall colour; every named character is cast; chairs only for
people sitting.
