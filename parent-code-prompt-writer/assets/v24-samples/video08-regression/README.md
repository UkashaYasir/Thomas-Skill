# v24 regression sample — Thomas's Video 08 notes as test frames

Eleven test lines (not a Parent Code script) that recreate the moments Thomas corrected in Video 08, "Seven Types of
Parents" (6–9 Oct 2026), built the v24 way. The cast, places and props are copied from the Video 08 build, with the v22
colour fills removed. Every v24 frame key is used at least once.

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

Build and check:

```bash
cd ../../compiler-v24 && node assemble.cjs --data ../v24-samples/video08-regression
node ../../scripts/qa-all.cjs ../v24-samples/video08-regression/out/build.jsx
```

Every check passes. Negative tests (a numbered title, a label on an object, a glow with no focus, a reframe target that is
not in the frame, an off-white ground) each fail or warn, and Video 08's own frames compiled with v24 fail on their seven
numbered titles, the title card and the "PERFECT PARENT" plaque — see the CHANGELOG entry for v24.

None of these frames has been rendered yet: render S1, S4, S6, S7 and S8 first to confirm the white stage, the black-line
pieces, the bright focus and the hand-lettered word hold up in Flow.
