# Compiler v18.3 — the parts that build a video

The exact pipeline that built "Seven Things Your Child Can't Tell You" (Version 7, 232 frames). `node assemble.cjs [out.jsx]`
rebuilds `out/build.jsx` byte-for-byte from these files.

- `template.jsx` — the compiler (v18.3: part-named hero colour, one size per object, eyes-only crop, one-sided moments, hero face/figure choice, per-frame object text, wall-hung objects, sky/ground colour lines; v18.2: soft character-first palettes, `accentWall`, set pieces by need in `worldBlock`,
  pure-white face close-ups, `visualOrder`, `objectFocus`, hands from the bottom edge). Its data blocks are replaced by
  `assemble.cjs`.
- `assemble.cjs` — reads `dicts.cjs` + `segs/segNN.cjs` + `script.txt`, builds THE PICTURE / PLACEMENT / THE PICTURE IN SHORT
  from each frame's left · centre · right spec, assigns room masters, computes `b.pieces` (which set pieces each frame
  uses), fills mask-reveal cover colours, writes `REVISIONS`.
- `dicts.cjs` — the video's dictionaries: ROLE, SET (place bible with per-mood wall/floor/furniture), CHAPTER (calm, accent,
  emo), WORLD (rooms as head + parts + tail), PROP, OVERLAY, STORY, PLAN, MOTIFS, DIRECTOR_READ, KEY_LINES.
- `segs/segNN.cjs` — one file per chapter: `F(n, {…})` frames, `E(ref, on, change)` edits, `Q(id, title, base, images)`
  sequences. Short keys: sc scene, t tier (S/E/H), r roles, p props, h hero, fe feel, me meaning, sz shot, an angle, fa face,
  sl scale, w world, m mood, wh where, L/C/R placement, a action, pf performance, mv move, dv device, pop, rv reveal, mf
  metaphor, pk peak, ms master, pl plain, cr colourReason, kw keyword, eo editOnly, to touch, sti still, y why, fo focus
  ("light" / "door"), eyes (eyes-only crop), hr hero who ("Son"), os one-sided moment text, px ["KEY", "object text for this
  frame"], na (no anchor piece).
- `design4.cjs` + `lch.cjs` — the soft-palette recipe (place tint, tonal furniture, near-white floor, mood variants, chapter
  accents, tonal peak furniture). Change the hues per video; keep the lightness and chroma ranges.
- `seg_helpers.py` — `sub`, `setf`, `add_edit` for targeted revision passes over the segment files. `passlib.py` (v18.3) adds
  `suball`, `delf`, `esub`, `eset`, `edel` and `qsub` and reports every missing match; `fk.cjs 27,28 L,C,R,a,pf` prints a frame's
  source fields and its edit.

Start a new video by copying this folder, replacing `script.txt`, `dicts.cjs` and `segs/`, and running the five checks in
`scripts/` three times.
