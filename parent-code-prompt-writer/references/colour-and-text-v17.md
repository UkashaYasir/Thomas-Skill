# Colour and on-screen text — Thomas's notes after Video 05 (Oct 2026), brought up to v19

> **v19:** the background and colour parts of this file are superseded by `style-and-colour-v19.md`; the on-screen words
> are now governed by `humour-text-contrast-v19.md`. Both follow `v19-principles.md` §1 and §5. The table below keeps
> Thomas's six Video 05 notes (they still stand) and states how v19 applies each one.

Thomas accepted Video 05 and asked to keep the direction, with six additions. Each is judged by the moment, never a
quota.

| His note (Video 05) | How v19 applies it |
| --- | --- |
| 1. Less colour in some scenes | One colour element per frame (`ce`), or none when the face carries the frame; everything else uncoloured (`b.plain` is the default for every non-hero object). Full colour only on emotional peaks (PEAK, `pk: true`) and night (NIGHT). |
| 2. Parts completely white + one simple background colour | Superseded by the 5 Oct direction: "white or very light neutral backgrounds as the default". The ground is very light neutral (CLEAN) or pure white (WHITE); places are thin soft-grey outlines with white fill. No soft wall colour behind the characters. |
| 3. No brown on brown | Still a constant: the colour element differs from everything around it in hue and brightness. In v19 contrast also means "empty background vs strong object; neutral scene vs one bright color; wide shot vs extreme close-up; serious moment vs humorous reaction; still moment vs movement; small prop vs large face; silence vs strong visual beat" (`humour-text-contrast-v19.md`). |
| 4. More white in general | Now the default for every scene, including everyday story scenes and a room's first frame: the place is shown by its outline cue on the light ground. |
| 5. Vary scene to scene | Variety now comes from camera distance, faces, composition, contrast and pattern interrupts, not from background hue (`camera-and-closeups-v19.md`, `humour-text-contrast-v19.md`). No composition comes back unchanged. |
| 6. Occasional keywords | Thomas, 5 Oct: "a few strong on-screen words or short phrases… only at strong moments, not constantly." See *Keywords* below. |

## Background moods available (v19)
CLEAN (the default: very light neutral ground, outline places, one colour element) · WHITE (pure white: face-only,
object-only, word frames, white breaks) · PEAK (a full-colour field in the chapter's emotional colour, only on an
emotional-peak frame with `pk: true`) · NIGHT (navy; the old DARK) · MEMORY (faded light grey; the old ICY). The old calm
moods (BRIGHT, WARM, EVENING, COOL, DUSK, NEUTRAL, ACCENT) are aliases of CLEAN; the old TENSE/SUNNY and chapter emotional
palettes are PEAK variants. Exact values: `assets/compiler-v24/`.

History, not a target: Video 05 measured white 10%, accent 0%, soft rooms 58%, full colour 32%; Seven Things measured pure
white 6% and tinted rooms 44%. Thomas's 5 Oct note is the answer to both.

## Keywords (on-screen words)
- Field `keyword: { word, on }` on the frame. The word is an **idea word** taken from the line's idea — Thomas's examples:
  TRUST, SAFE, LISTEN, TESTING, SHAME, CONTROL, MISREAD, ATTENTION, OVERWHELMED, HONESTY, NOT REJECTION. A word or a
  short phrase, never a full sentence.
- Chosen "only at strong moments, not constantly" — including emotional moments when the word names what the moment
  means (SHAME, OVERWHELMED, NOT REJECTION are on his list). No count.
- Chapter numbers are not keywords ("NUMBER ONE" is a label, not an idea). Thomas's old complaint still stands: "The
  large 7 stays alone for six seconds."
- It lands on the spoken word, is added by Muhammad in Premiere and is never baked into the image (prompts keep their
  no-text lock). A word moment can get its own WORD frame (pure white, nothing drawn, or one small named object).
- One consistent channel style, governed by `humour-text-contrast-v19.md` (that file wins). From it: the word sits in the
  frame's empty space next to the face or object it names, never over a face; it is black, or the colour of the frame's
  colour element; it appears with a clean cut or a soft scale-in — a bouncing pop reads as kids' content; it stays at
  least until the end of the spoken phrase. The typeface used so far: one bold rounded sans-serif in capitals.
