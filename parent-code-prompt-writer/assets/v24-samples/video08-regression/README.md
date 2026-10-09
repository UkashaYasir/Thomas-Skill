# v24/v25 regression sample — Thomas's Video 08 notes and the colour ladder as test frames

Fifteen test lines and two inserts (not a Parent Code script). Chapter 01 (S1–S11) recreates the moments Thomas corrected in Video 08,
"Seven Types of Parents" (6–9 Oct 2026), built the v24 way; chapter 02 (S12–S15) is Muhammad's v25 colour ladder — white
by default, the stage in the emotion's colour at the intense line, the close-up on white, back to white. The cast, places
and props are copied from the Video 08 build, with the v22 colour fills removed. Every v24 and v25 frame key is used at
least once.

| Frame | Thomas's note | What the frame shows | v24 keys |
|---|---|---|---|
| S1 | campfire: "much larger… stronger orange and yellow"; "the ground does not also need to be colored" | MOM on a rock beside a fire two to three times normal size; white ground, one rock in black line | `sl` DOMINANT, `gl` rays, `zm` |
| S2 | "a large exaggerated yellow or bright green helicopter behind the character for a few seconds" | a giant yellow helicopter behind hovering MOM; SON's deadpan stare | `sl` OVERWHELMING, cutaway |
| S3 | phone: "a strong purple color"; "a short dramatic close-up" | MOM takes the purple phone, SON lunges; a reframe punches to his face | `zm`, edit |
| S4 | study: "It is enough if the books are colorful… Keep only the window" | SON behind bright books; table, chair and one window in black line; no fridge | bright `ce` |
| S5 | night: "Make the smartphone glow more noticeable" | the phone the only light, its glow drawn as rays | NIGHT, `gl` |
| S6 | "The oversized F… brighter red" | the test alone on white, a huge bright red F | `ol`, `sl`, TONE |
| S7 | "Push the father's facial expression further"; ENOUGH! as a word | DAD slams the table, red jagged marks; ENOUGH! hand-lettered in red | `mk`, `tx` |
| S8 | bike: "too much green" | only the bike green; the path a line; no tree, no grass colour | bright `ce`, `zm` |
| S9 | absent parent: "The gray atmosphere fits"; "the calendar… missing time" | MIA at the window; grey on purpose; days crossed off | `mu`, `cm`, `zm` |
| S10 | "subtle warm color accents" on the hug | the hug with a flat warm light shape | `li` warm |
| S11 | "WHICH DIAL?… readable on mobile… short" | the dials on white with the question big above them | `tx` big, `gl` halo |
| S12 | v25 ladder, rung 3 — the fight | DAD and SON shouting across the table; the whole stage vivid red; the red test drawn white so it reads; the red marks turn black on red | `pc` RED, `pk`, `mk` beside a focus, the white-focus rule, `zm` |
| S13 | back to white — "larger heads" = the sudden close-up | SON's face alone on pure white, the shout gone | `ip` snap-to-white, WHITE close-up after a colour stage |
| S14 + S14b | rung 2 — warmth after the fight; an insert inside the line | MOM sits down beside SON with a warm light shape; the insert S14b cuts in on "waits": the two mitten hands | `li` warm, `I()` insert |
| S15 + S15b | rung 3 — the aha | SON jolts upright; the stage bright lemon yellow; OH! and the marks in black on the light field; the insert S15b cuts to his face on pure white on "clicks" | `pc` YELLOW, `tx` on a light field, `mk` black on its own hue, a WHITE close-up insert |

Build and check:

```bash
cd ../../compiler-v24 && node assemble.cjs --data ../v24-samples/video08-regression
node ../../scripts/qa-all.cjs ../v24-samples/video08-regression/out/build.jsx
```

Every check passes, the contradiction scan included. Negative tests (a numbered title, a label on an object, a glow with no focus, a reframe target that is
not in the frame, an off-white ground) each fail or warn, and Video 08's own frames compiled with v24 fail on their seven
numbered titles, the title card and the "PERFECT PARENT" plaque — see the CHANGELOG entry for v24.

None of these frames has been rendered yet: render S1, S4, S6, S7, S8, S12 and S15 first to confirm the white stage, the
black-line pieces, the bright focus, the hand-lettered word and the colour stages (flat field, white figures, nothing
vanishing into it) hold up in Flow.
