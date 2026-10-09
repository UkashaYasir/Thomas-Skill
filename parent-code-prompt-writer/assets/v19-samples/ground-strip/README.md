# CLEAN ground test strip

Thomas asked for "white or very light neutral backgrounds as the default". The compiler's CLEAN ground is one constant,
`CLEAN_GROUND` (default #F7F6F3). This strip lets Thomas choose it from real renders.

`out/ground-strip.html` holds the same seven frames of the Seven Things v19 sample compiled on four grounds — #F7F6F3 (very
light warm neutral, the default), #FFFFFF (pure white), #F4F2EE (light warm stone), #F2F4F5 (light cool grey). Only the
ground changes. The frames: a two-person medium-wide with outline cues (S1), a wide hall (S22), a close-up after its wide
(S23), face and hands with a colour element (S9), hands only (S28), a wide with a colour element (S30), a medium two-shot
with the jar (S43).

Render each set in Flow with the MOM and SON references attached and compare side by side:
- are the white characters seen first?
- do the soft-grey outline pieces read without competing?
- do white faces and mitten hands stay clear of the ground?
- does the one colour element stand out?

Thomas picks the ground; then set it once in `assets/compiler-v24/template.jsx` (`const CLEAN_GROUND`), or per video with
`PROJECT.cleanGround` in `dicts.cjs`.

Rebuild the page: `node make-strip.cjs` (it finds `../../compiler-v24`; set `COMPILER=` to point elsewhere).
