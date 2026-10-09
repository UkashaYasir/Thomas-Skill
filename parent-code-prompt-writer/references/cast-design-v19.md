# Cast design — any character a story needs (v19)

Read with `v19-principles.md` §3 and §6, and `characters.md` (the MOM and SON references). Where older files describe
new characters differently (for example a "bald with a beard" hairstyle), this file wins.

**This is an open library.** The cast bank in §6 is seeds the story extends, plus a method (§2) for designing any
character a script needs. Rename, re-age and adjust the seeds; invent new characters with the method; after every
video, add the characters that rendered well.

---

## 0. Why this file exists

- Muhammad: interaction must grow, and the cast must grow with it. Parenting stories involve grandparents, siblings,
  teachers, coaches, friends and other parents, not only MOM and SON.
- Thomas wants every character told apart at a glance: "through size, body proportions, and, where appropriate, also
  through small visual details such as a beard, mustache, glasses, or other clear identifying features. That way, it is
  immediately understandable who is who." And: "Children and teenagers should never simply look like smaller copies of
  the adult."
- Production fact: only two reference images exist, MOM and SON. Every other character is drawn by copying one of them
  and changing only the hair outline, the size and age proportions, and small accessories where needed — all described in the
  prompt.
- **The lesson from "Seven Things".** The BOSS was written as "no hair at all — a completely bald round white head". It
  looked awkward. On this channel the head is a plain white circle, so without hair it becomes a featureless ball: it
  reads as unfinished, as a baby or an egg, it loses its silhouette, and it breaks the look of a cast whose strongest
  identity marker is the hair. Hence the first rule below.

---

## 1. The rules

1. **Copy one reference.** Every new character has `from: "Mom"` or `from: "Son"`. Never invent a new construction.
   Choose by build: teenagers and children of any gender copy SON (the teen build); adult women copy MOM. Adult men
   have so far copied SON with an adult height (DAD, KEVIN and BOSS in "Seven Things"). If a lineup shows a man reading
   as a big-headed teenager, copy MOM's adult build instead with his own hair — the lineup decides.
2. **Change only these:** the hair outline; the size and age proportions; small accessories only where they are needed (or none). The
   face, eyes, eyebrows, mouth, ears, line weight, mitten hands and oval feet stay exactly as in the reference.
3. **Never bald, hairless or a featureless round head.** Every character has a solid black hair shape that clearly breaks
   the circle of the head — older men, toddlers and buzz cuts included. A beard or moustache never replaces hair on top.
   Never white hair (white hair on a white head reads as bald).
4. **Every character has a distinct hair outline.** No two characters in one video share a hair shape, so their
   silhouettes differ when small, in profile and from behind. Name the outline with one distinctive word (bun, spikes,
   ponytail, bowl cut…). Use that word in `text`, `change` and the EDIT_WHO line, and never use another character's
   outline word in a description — describe what the hair *is*, positively ("smooth rounded top"), not what it is not.
   *Exception:* the same person at another age keeps their own hair on purpose — that is how the viewer knows it is
   them (SON at seven is LITTLE BOY). The two appear in one frame only as a memory.
5. **No clothing.** The body is the bare thin black line. The only thing worn is the one accessory, small, locked in the
   ROLE and worn in every frame. Never garment words in descriptions or actions.
6. **Age by proportions and size, never by a bigger head.** A younger child is a smaller figure with shorter arms and
   legs, so the head is a larger share of the height while staying smaller than an adult's head. The head is never
   drawn bigger than the reference head — never a bobble head. Teenagers keep SON's build; adults MOM's. Older adults
   keep adult proportions and show age through the hair shape, a slight forward curve of the standing body line and an
   accessory such as reading glasses — never wrinkles or lines on the face.
7. **Faces stay clean.** The same eyes, eyebrows and mouth as the reference; no wrinkles, freckles, blush, make-up,
   eyelashes or nose; no teeth.
8. **Hair is solid black; accessories are dark and quiet.** An accessory takes a dark, nearly neutral tone (slate,
   graphite, dark navy) so it reads as identity and never competes with the frame's bright colour focus. Never red (red
   is a focus colour for conflict and danger). Older-age option, to test in the lineup: hair in solid soft grey with the black outline.
9. **Check every new character in a lineup render** with MOM and SON before the video's frames are generated (§4).
10. **One design per character.** Once locked, the ROLE text does not change inside the video. A character who returns
    in later videos gets an approved image from Muhammad, added to `assets/characters/`.

---

## 2. Method: design any new character

1. **Who are they in the story?** Their relationship to MOM or SON, their age, their role, and what the viewer must read
   in half a second ("SON's grandmother", "the coach who shouts").
2. **Choose `from` and `age`.** `age` is one of `adult`, `teen`, `child` (the compiler's three ages). Finer ages —
   toddler, preteen, young adult, grandparent — are described in `change` and `text` through size and posture.
3. **Choose the hair outline.** Check §5 for outlines already used in this video. The new one must be:
   - distinct at thumbnail size, in profile and from behind;
   - solid black, with a clear outline that breaks the head circle;
   - clear of the eyes and eyebrows (they must stay readable for every expression);
   - right for the role and age (a neat flat-top for a formal boss, pigtails for a young girl).
4. **Choose the size** relative to MOM and SON: taller than MOM, the same, a little shorter, chin at her shoulder, head
   top halfway up her height.
5. **Choose small accessories only where they are needed, or none.** Use one when two characters could be confused or the role needs a cue:
   glasses, a tie, a bow tie, a thin scarf at the neck, a cap, a beanie, a headband, a hair clip, a whistle or a lanyard
   on a cord, a stethoscope round the neck. Never a garment; never anything with words or logos.
6. **Write the ROLE entry and the EDIT_WHO line** (§3), with the hair outline word.
7. **Render the lineup** (§4), check, adjust the text, lock.
8. **Write them like MOM and SON** in every frame: name in capitals, a full performance line
   (`acting-and-interaction-v19.md`).

---

## 3. ROLE entry template (matches `dicts.cjs`)

```js
"Name": {
  short: "<what changes, as it reads after 'changing only …'>",   // e.g. "her hair, her glasses and her height"
  age: "adult",                                                   // "adult" | "teen" | "child"
  ref: false,
  from: "Mom",                                                    // "Mom" | "Son"
  wear: [{ item: "<accessory>", hex: "#XXXXXX" }],                // [] when there is no accessory
  hair: "<the hair outline word>",                                // e.g. "flat-top", "high ponytail" — unique in the cast (checked)
  sameAs: "<role name>",                                          // only for the same person at another age (e.g. LITTLE BOY sameAs "Son")
  heightText: "<optional size sentence>",                         // only when the default size for the age group is wrong (a toddler, a very tall uncle)
  change: "<hair first, with its outline word, instead of the reference's hair> — <the accessory with its hex> — <size and age, relative to MOM or SON>",
  text: "NAME (<who they are> — drawn from the attached <MOM|SON> reference, changing only <short>): <hair in detail, solid black, with its outline word>; <the accessory with its hex>; <size and build relative to MOM>. No clothing — a bare thin black line body with no fill."
},
```
And one line in `EDIT_WHO`:
```js
Name: "NAME is the <man | woman | teenage boy | teenage girl | small boy | small girl> with <hair outline> <and accessory>",
```

How the compiler uses each field (v3 `template.jsx`, carried into v19):
- `refLock` writes: "NAME has no reference image, so NAME is drawn by copying the attached FROM reference exactly and
  changing only {short} (described below)". So `short` must read naturally after "changing only".
- `roleText` adds `text` to every frame the character is in. Hair first, then accessory, then size, then the no-clothing
  line.
- The height block uses `age` (adult, teen, child).
- `wear` lists the accessory and its colour on the Constants page.
- `EDIT_WHO` identifies each person in image-edit prompts.
- The v19 cast check fails any ROLE text containing "bald", "no hair", "hairless" or "completely round", and any two
  roles that share a hair outline word.

**Worked example — the "Seven Things" BOSS, fixed:**
```js
"Boss": { short: "his hair, his tie and his height", age: "adult", ref: false, from: "Son",
  wear: [{ item: "tie", hex: "#3C4A6B" }],
  change: "his hair — short solid black hair cut into a neat flat-top, square and level on top with short straight sides, instead of SON's hair — one narrow dark navy (#3C4A6B) tie hanging from the neck line with no collar or shirt — and an adult height a little taller than MOM",
  text: "BOSS (MOM's boss — drawn from the attached SON reference, changing only his hair, his tie and his height): short solid black hair cut into a neat flat-top, square and level on top with short straight sides; one narrow dark navy (#3C4A6B) tie hanging straight down from the neck line with no collar or shirt; a full-grown adult a little taller than MOM, standing straight. No clothing — a bare thin black line body with no fill." },
// EDIT_WHO — Boss: "BOSS is the man with a neat square black flat-top and a narrow navy tie"
```

---

## 4. The lineup render — check new characters before production

Generate one lineup in Flow with the MOM and SON references attached, before any frame of the video.

**Lineup prompt (fill in the ROLE texts):**
> A character lineup for a mature, understated animated explainer for parents and teenagers. Flat 2D, clean ink
> outlines, no shading. The background is plain pure white (#FFFFFF) with one thin black ground line. Standing in
> one row, front view, a little apart, feet on the ground line, from left to right: MOM, exactly as the attached MOM
> reference; SON, exactly as the attached SON reference; then [NAME — ROLE text] … for each new character, each drawn
> by copying the named reference exactly and changing only what their description says. Everyone has the same round
> white head construction, big white round eyes with large black pupils, short thick eyebrows, a small closed calm
> smile, a thin black line body, white mitten hands with no cuffs and small white oval feet, in the same line
> thickness. Heights exactly as described relative to MOM. Each stands in a relaxed, natural pose with the arms a little
> away from the body. Nothing else in the image: no clothing, no labels, no text, no shadows.

Then, for characters seen from the side or behind, the same row in profile and from behind; and one strong expression
per new character (surprised, hurt) to check the face holds.

**Checklist:**
- **Hair** — solid black (or the tested grey); a clear outline breaking the head circle; nobody bald; no two outlines
  alike. *Silhouette test:* imagine every figure filled solid black — can you still tell who is who? *Thumbnail test:*
  shrink the lineup — are they still distinct?
- **Head and face** — the same construction as the copied reference; no bobble heads; no added features.
- **Age and height** — child, teen, adult and older adult read at once; the heights match the text.
- **Body** — thin unfilled line; mittens with no cuff; feet drawn; no clothing; the accessory present, small, dark.
- **Never** teeth, eyelashes, a nose, wrinkles.
- **Scale** — the character still reads small in a WIDE frame and holds a CLOSE.
If anything drifts, fix the ROLE text (never the reference), re-render, then lock.

---

## 5. Hair outline bank — open

One word per outline. MOM's and SON's are reserved. Add new outlines as stories need them.

| Outline word | Description | Seed in §6 |
|---|---|---|
| bun | centre parting framing the face, one round bun on top | MOM (reserved) |
| spikes | messy jagged pointed clumps, pointed tips over the forehead | SON (reserved) |
| side parting | short flat hair, clean side parting, smooth rounded top | DAD |
| wave | combed into one smooth wave up and back from the forehead | KEVIN |
| ponytail | pulled back smooth into one long high ponytail | SARAH |
| curls | a short rounded cap of tight curls close to the head | GRANDMA |
| brushed-back | short hair brushed straight back from the forehead in neat ridges | GRANDPA |
| long straight | long straight hair past the shoulders, one side tucked behind the ear | OLDER SISTER |
| bowl cut | a round smooth bowl with a blunt straight edge above the eyebrows | YOUNGER BROTHER |
| pigtails | two short pigtails tied high at each side | LITTLE SISTER |
| tuft | a soft short cap rising into one small tuft at the front | TODDLER |
| pixie | very short, close at the back and sides, longer pointing forward at the front | AUNT |
| beard | short neat hair with a rounded top, joined to a full short beard | UNCLE |
| high-top | a tall rounded springy block on top, very short sides | COUSIN |
| flipped ends | shoulder-length, smooth on top, flipping outward at the ends | TEACHER |
| quiff | close sides, the front pushed up into one high smooth quiff | HEAD TEACHER |
| afro | a full rounded springy shape framing the whole head | COUNSELLOR |
| curtains | two floppy curtains of hair opening in the middle, down to the eyebrows | CLASSMATE |
| braid | one long thick braid hanging forward over one shoulder | BEST FRIEND |
| bob | chin-length, straight blunt ends | FRIEND |
| cap | a dark baseball cap, short hair showing at the sides and back | COACH |
| buzz cut | very short, drawn as a solid black cap with a clean straight hairline | TEAM-MATE |
| flat-top | square and level on top, short straight sides | BOSS |
| undercut | long on top falling to one side, the sides cut very short | NEIGHBOUR |
| locs | jaw-length locs in thick rope-like strands | FRIEND'S MUM |
| half-up | the top half drawn back and tied, the rest falling to the shoulders | DOCTOR |

Watch-outs: a fringe that hides the eyebrows kills the expressions; a top knot or high bun is too close to MOM; a short
spiky crop is too close to SON; a buzz cut can read as bald — check it in the lineup and swap if it does.

---

## 6. Seed cast bank — ready ROLE-style entries

Seeds the story extends. Each entry is written to the template and uses its own hair outline word. DAD, KEVIN, SARAH
and LITTLE BOY rendered well in "Seven Things" (adapted here to positive hair wording); every other seed still needs
its lineup check. Ages in brackets are for the writer, not the generator.

### Family
```js
"Dad": { short: "his hair, his glasses and his height", age: "adult", ref: false, from: "Son", wear: [{ item: "glasses", hex: "#3F4A5C" }],
  change: "his hair — short flat solid black hair cut neatly with a clean side parting and a smooth rounded top, instead of SON's hair — one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, pupils always visible — and an adult height a little taller than MOM",
  text: "DAD (adult — drawn from the attached SON reference, changing only his hair, his glasses and his height): short flat solid black hair, neatly cut with a clean side parting and a smooth rounded top; one pair of small rectangular glasses with thin dark slate (#3F4A5C) frames around the big white eye circles, the pupils always visible inside them; a full-grown adult a little taller than MOM, with long arms and legs. No clothing — a bare thin black line body with no fill." },

"Grandma": { short: "her hair, her glasses and her height", age: "adult", ref: false, from: "Mom", wear: [{ item: "round glasses", hex: "#3F444C" }],
  change: "her hair — a short rounded cap of tight solid black curls close to the head, instead of MOM's hair — one pair of small round glasses with thin graphite (#3F444C) frames around the big white eye circles, pupils always visible — and a height a little shorter than MOM, her standing line curving slightly forward",
  text: "GRANDMA (MOM's mother — drawn from the attached MOM reference, changing only her hair, her glasses and her height): a short rounded cap of tight solid black curls close to the head; one pair of small round glasses with thin graphite (#3F444C) frames around the big white eye circles, the pupils always visible inside them; a full-grown older woman a little shorter than MOM, her standing line curving slightly forward when she stands. No clothing — a bare thin black line body with no fill." },
  // older-age option, test in the lineup: "solid soft grey (#A3A8AE) curls with a black outline" in place of "solid black curls"

"Grandpa": { short: "his hair, his moustache and his height", age: "adult", ref: false, from: "Son", wear: [],
  change: "his hair — short solid black hair brushed straight back from the forehead in neat ridges, lying smooth against the head, instead of SON's hair — one thick solid black moustache above the mouth — and an adult height about the same as MOM's, his standing line curving slightly forward",
  text: "GRANDPA (MOM's father — drawn from the attached SON reference, changing only his hair, his moustache and his height): short solid black hair brushed straight back from the forehead in neat ridges, lying smooth against the head; one thick solid black moustache above the mouth; a full-grown older man about MOM's height, his standing line curving slightly forward when he stands. No clothing — a bare thin black line body with no fill." },
  // older-age option, test in the lineup: hair and moustache in solid soft grey (#A3A8AE) with a black outline

"Older Sister": { short: "her hair and her height", age: "teen", ref: false, from: "Son", wear: [],
  change: "her hair — long straight solid black hair falling smooth past the shoulders, one side tucked behind the ear, instead of SON's hair — and a height a little taller than SON but still clearly shorter than MOM",
  text: "OLDER SISTER (SON's older sister, about seventeen — drawn from the attached SON reference, changing only her hair and her height): long straight solid black hair falling smooth past the shoulders, one side tucked behind the ear; a lean teenager a little taller than SON and still clearly shorter than MOM. No clothing — a bare thin black line body with no fill." },

"Younger Brother": { short: "his hair and his size", age: "child", ref: false, from: "Son", wear: [],
  change: "his hair — a round smooth solid black bowl cut with a blunt straight edge across the forehead just above the eyebrows, instead of SON's hair — and his size: a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs",
  text: "YOUNGER BROTHER (SON's little brother, about eight — drawn from the attached SON reference, changing only his hair and his size): a round smooth solid black bowl cut with a blunt straight edge across the forehead just above the eyebrows; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No clothing — a bare thin black line body with no fill." },

"Little Sister": { short: "her hair and her size", age: "child", ref: false, from: "Son", wear: [],
  change: "her hair — two short solid black pigtails tied high at each side of the head, with a short straight edge of hair across the forehead above the eyebrows, instead of SON's hair — and her size: a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs",
  text: "LITTLE SISTER (SON's little sister, about six — drawn from the attached SON reference, changing only her hair and her size): two short solid black pigtails tied high at each side of the head, with a short straight edge of hair across the forehead above the eyebrows; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No clothing — a bare thin black line body with no fill." },

"Toddler": { short: "his hair and his size", age: "child", ref: false, from: "Son", wear: [],
  change: "his hair — a soft short cap of solid black hair rising into one small tuft at the front, instead of SON's hair — and his size: a toddler, clearly smaller than a young child, with very short arms and legs",
  text: "TODDLER (the youngest, about two — drawn from the attached SON reference, changing only his hair and his size): a soft short cap of solid black hair covering the top of the head and rising into one small tuft at the front; a toddler clearly smaller than a young child, with very short arms and legs, the head never enlarged beyond the reference. No clothing — a bare thin black line body with no fill." },
  // test in the lineup: if the toddler reads as a bobble head or as bald, adjust the size wording first

"Aunt": { short: "her hair", age: "adult", ref: false, from: "Mom", wear: [],
  change: "her hair — a very short solid black pixie cut, close at the back and sides and longer at the front, pointing forward over the top of the forehead and stopping above the eyebrows, instead of MOM's hair",
  text: "AUNT (MOM's sister — drawn from the attached MOM reference, changing only her hair): a very short solid black pixie cut, close at the back and sides and longer at the front, pointing forward over the top of the forehead and stopping above the eyebrows; the same height as MOM. No clothing — a bare thin black line body with no fill." },

"Uncle": { short: "his hair, his beard and his height", age: "adult", ref: false, from: "Son", wear: [],
  change: "his hair — short neat solid black hair with a rounded top, joined at the ears to a full short solid black beard along the jaw and chin, instead of SON's hair — and an adult height a little taller than MOM",
  text: "UNCLE (DAD's brother — drawn from the attached SON reference, changing only his hair, his beard and his height): short neat solid black hair with a rounded top, joined at the ears to a full short solid black beard along the jaw and chin, the mouth clearly visible inside it; a full-grown adult a little taller than MOM. No clothing — a bare thin black line body with no fill." },

"Cousin": { short: "his hair and his height", age: "teen", ref: false, from: "Son", wear: [],
  change: "his hair — a tall rounded springy block of solid black hair on top with very short sides (a high-top), instead of SON's hair — and a height about the same as SON",
  text: "COUSIN (SON's cousin, about fifteen — drawn from the attached SON reference, changing only his hair and his height): a tall rounded springy block of solid black hair on top with very short sides, a high-top; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },

"Kevin": { short: "his hair, a bow tie and his height", age: "adult", ref: false, from: "Son", wear: [{ item: "bow tie", hex: "#3E7A70" }],
  change: "his hair — glossy solid black hair combed into one smooth wave up and back from the forehead, instead of SON's hair — one small neat bow tie in muted teal-green (#3E7A70) at the neck line with no collar or shirt — and an adult height a little taller than MOM, standing very straight",
  text: "KEVIN (the perfect cousin, a young adult — drawn from the attached SON reference, changing only his hair, a bow tie and his height): solid black hair combed into one smooth wave up and back from the forehead; one small neat bow tie in muted teal-green (#3E7A70) sitting at the neck line with no collar or shirt; a little taller than MOM, standing very straight with his chin up. No clothing — a bare thin black line body with no fill." },

"Little Boy": { short: "his size", age: "child", ref: false, from: "Son", wear: [],
  change: "his size only — SON at seven years old, with exactly the same messy spiky black hair and the same face, and a young child's body whose head top reaches only about halfway up MOM's standing height, with short arms and legs",
  text: "LITTLE BOY (SON at seven years old — drawn from the attached SON reference, changing only his size): exactly SON's solid black messy spiky hair with the pointed tips over the forehead and above the ears, and the same round face; a young child whose head top reaches only about halfway up MOM's standing height, with short arms and legs. No clothing — a bare thin black line body with no fill." },
  // the same person at another age: shares SON's hair on purpose (rule 4 exception)
```
A baby is shown held, as a small bundle in a plain blanket (an object, not clothing) with a small round head and a soft
short cap of hair; it needs no ROLE unless it acts.

### School
```js
"Teacher": { short: "her hair and her lanyard", age: "adult", ref: false, from: "Mom", wear: [{ item: "lanyard", hex: "#3F444C" }],
  change: "her hair — solid black shoulder-length hair, smooth on top and flipping outward at the ends, instead of MOM's hair — and one thin graphite (#3F444C) lanyard cord round the neck holding one small blank white card",
  text: "TEACHER (SON's teacher — drawn from the attached MOM reference, changing only her hair and her lanyard): solid black shoulder-length hair, smooth on top and flipping outward at the ends; one thin graphite (#3F444C) lanyard cord round the neck holding one small blank white card with nothing on it; the same height as MOM. No clothing — a bare thin black line body with no fill." },

"Head Teacher": { short: "his hair, a bow tie and his height", age: "adult", ref: false, from: "Son", wear: [{ item: "bow tie", hex: "#3A3F4A" }],
  change: "his hair — short solid black hair close at the sides with the front pushed up into one high smooth quiff, instead of SON's hair — one small dark graphite (#3A3F4A) bow tie at the neck line with no collar or shirt — and an adult height a little taller than MOM",
  text: "HEAD TEACHER (the head of SON's school — drawn from the attached SON reference, changing only his hair, a bow tie and his height): short solid black hair close at the sides with the front pushed up into one high smooth quiff; one small dark graphite (#3A3F4A) bow tie at the neck line with no collar or shirt; a full-grown adult a little taller than MOM. No clothing — a bare thin black line body with no fill." },

"Counsellor": { short: "her hair and her scarf", age: "adult", ref: false, from: "Mom", wear: [{ item: "scarf", hex: "#3F4A5C" }],
  change: "her hair — a full rounded springy solid black afro framing the whole head, instead of MOM's hair — and one thin dark slate (#3F4A5C) scarf knotted loosely at the neck line",
  text: "COUNSELLOR (the school counsellor — drawn from the attached MOM reference, changing only her hair and her scarf): a full rounded springy solid black afro framing the whole head; one thin dark slate (#3F4A5C) scarf knotted loosely at the neck line; the same height as MOM. No clothing — a bare thin black line body with no fill." },

"Classmate": { short: "his hair", age: "teen", ref: false, from: "Son", wear: [],
  change: "his hair — two floppy curtains of solid black hair opening in the middle and falling to just above the eyebrows on each side, instead of SON's hair",
  text: "CLASSMATE (a boy in SON's class — drawn from the attached SON reference, changing only his hair): two floppy curtains of solid black hair opening in the middle and falling to just above the eyebrows on each side; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },

"Best Friend": { short: "her hair", age: "teen", ref: false, from: "Son", wear: [],
  change: "her hair — solid black hair pulled smooth into one long thick braid hanging forward over one shoulder, instead of SON's hair",
  text: "BEST FRIEND (SON's best friend — drawn from the attached SON reference, changing only her hair): solid black hair pulled smooth into one long thick braid hanging forward over one shoulder; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },

"Friend": { short: "her hair and her hair clip", age: "teen", ref: false, from: "Son", wear: [{ item: "hair clip", hex: "#3F444C" }],
  change: "her hair — a chin-length solid black bob with straight blunt ends, instead of SON's hair — with one side held back by one small graphite (#3F444C) hair clip",
  text: "FRIEND (a girl in SON's friend group — drawn from the attached SON reference, changing only her hair and her hair clip): a chin-length solid black bob with straight blunt ends, one side held back by one small graphite (#3F444C) hair clip; a lean teenager a little shorter than SON. No clothing — a bare thin black line body with no fill." },
```

### Sport
```js
"Coach": { short: "his hair, his cap and his height", age: "adult", ref: false, from: "Son", wear: [{ item: "baseball cap", hex: "#3F4A5C" }],
  change: "one plain dark slate (#3F4A5C) baseball cap with a short curved peak facing forward, its peak sitting above the eyebrows so the eyes and brows stay fully visible, with short solid black hair showing below it at the sides and back, instead of SON's hair — and an adult height a little taller than MOM",
  text: "COACH (SON's football coach — drawn from the attached SON reference, changing only his hair, his cap and his height): one plain dark slate (#3F4A5C) baseball cap with a short curved peak facing forward, the peak above the eyebrows so the eyes and brows stay fully visible, short solid black hair showing below it at the sides and back; a full-grown adult a little taller than MOM. No clothing — a bare thin black line body with no fill." },

"Team-mate": { short: "his hair", age: "teen", ref: false, from: "Son", wear: [],
  change: "his hair — a very short solid black buzz cut drawn as a solid black cap over the top of the head with a clean straight hairline across the forehead, instead of SON's hair",
  text: "TEAM-MATE (a boy on SON's team — drawn from the attached SON reference, changing only his hair): a very short solid black buzz cut drawn as a solid black cap over the whole top of the head with a clean straight hairline across the forehead; a lean teenager a little taller than SON. No clothing — a bare thin black line body with no fill." },
  // test in the lineup: if the buzz cut reads as bald, give him another outline
```

### Work
```js
"Boss": { /* see the worked example in §3 */ },

"Sarah": { short: "her hair", age: "adult", ref: false, from: "Mom", wear: [],
  change: "her hair — solid black hair pulled back smooth into one long, high, perfectly straight ponytail hanging behind her head to shoulder height, instead of MOM's hair",
  text: "SARAH (MOM's colleague — drawn from the attached MOM reference, changing only her hair): solid black hair pulled back smooth into one long high straight ponytail hanging behind her head down to shoulder height, with no loose strands; the same height as MOM. No clothing — a bare thin black line body with no fill." },
```

### Neighbours and other parents
```js
"Neighbour": { short: "his hair and his height", age: "adult", ref: false, from: "Son", wear: [],
  change: "his hair — an undercut: solid black hair long on top and falling to one side, the sides cut very short, instead of SON's hair — and an adult height a little taller than MOM",
  text: "NEIGHBOUR (the man next door — drawn from the attached SON reference, changing only his hair and his height): an undercut — solid black hair long on top and falling to one side, the sides cut very short; a full-grown adult a little taller than MOM. No clothing — a bare thin black line body with no fill." },

"Friend's Mum": { short: "her hair", age: "adult", ref: false, from: "Mom", wear: [],
  change: "her hair — jaw-length solid black locs hanging in thick rope-like strands all round the head, instead of MOM's hair",
  text: "FRIEND'S MUM (the mother of SON's friend — drawn from the attached MOM reference, changing only her hair): jaw-length solid black locs hanging in thick rope-like strands all round the head, the face clear; the same height as MOM. No clothing — a bare thin black line body with no fill." },
```

### Professionals
```js
"Doctor": { short: "her hair and her stethoscope", age: "adult", ref: false, from: "Mom", wear: [{ item: "stethoscope", hex: "#3F444C" }],
  change: "her hair — the top half of her solid black hair drawn back and tied at the back of the head, the rest falling straight to the shoulders (half-up), instead of MOM's hair — and one graphite (#3F444C) stethoscope hanging round the neck line",
  text: "DOCTOR (the family doctor — drawn from the attached MOM reference, changing only her hair and her stethoscope): the top half of her solid black hair drawn back and tied at the back of the head, the rest falling straight to the shoulders, half-up; one graphite (#3F444C) stethoscope hanging round the neck line; the same height as MOM. No clothing — a bare thin black line body with no fill." },
```

### EDIT_WHO lines for the seeds
```js
Dad: "DAD is the man with flat side-parted black hair and small rectangular glasses",
Grandma: "GRANDMA is the older woman with short tight black curls and small round glasses",
Grandpa: "GRANDPA is the older man with black hair brushed straight back and a thick moustache",
"Older Sister": "OLDER SISTER is the teenage girl with long straight black hair tucked behind one ear",
"Younger Brother": "YOUNGER BROTHER is the small boy with a round black bowl cut",
"Little Sister": "LITTLE SISTER is the small girl with two short black pigtails",
Toddler: "TODDLER is the very small child with one small black tuft of hair",
Aunt: "AUNT is the woman with a very short black pixie cut",
Uncle: "UNCLE is the man with a full short black beard",
Cousin: "COUSIN is the teenage boy with a tall black high-top",
Kevin: "KEVIN is the young man with one smooth wave of black hair and a small bow tie",
"Little Boy": "LITTLE BOY is the small seven-year-old boy with the same messy spiky black hair as SON",
Teacher: "TEACHER is the woman with shoulder-length black hair flipped out at the ends and a lanyard",
"Head Teacher": "HEAD TEACHER is the man with a high black quiff and a small dark bow tie",
Counsellor: "COUNSELLOR is the woman with a full round black afro and a thin scarf at the neck",
Classmate: "CLASSMATE is the teenage boy with two floppy curtains of black hair",
"Best Friend": "BEST FRIEND is the teenage girl with one long black braid over her shoulder",
Friend: "FRIEND is the teenage girl with a black chin-length bob and a small hair clip",
Coach: "COACH is the man in a dark baseball cap",
"Team-mate": "TEAM-MATE is the teenage boy with a very short black buzz cut",
Boss: "BOSS is the man with a neat square black flat-top and a narrow navy tie",
Sarah: "SARAH is the woman with one long high black ponytail",
Neighbour: "NEIGHBOUR is the man with a black undercut falling to one side",
"Friend's Mum": "FRIEND'S MUM is the woman with jaw-length black locs",
Doctor: "DOCTOR is the woman with half-up black hair and a stethoscope",
```

---

### Added from the v19 samples (5 Oct 2026 — check in the lineup render)
```js
"Lily": { short: "her hair", age: "teen", ref: false, from: "Son", hair: "braid", wear: [],
  change: "her hair — solid black hair pulled smooth into one long thick braid hanging forward over one shoulder, instead of SON's hair",
  text: "LILY (a teenage girl — drawn from the attached SON reference, changing only her hair): solid black hair pulled smooth into one long thick braid hanging forward over one shoulder; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },
// an adult seen at another age: the same person keeps their hair outline and is linked with sameAs
"Young Mom": { short: "her hair", age: "teen", ref: false, from: "Son", sameAs: "Mom", hair: "bun", wear: [],
  change: "her hair — exactly MOM's solid black hair, parted softly at the centre and framing the face, with one round bun on top, instead of SON's hair — the same person as MOM at sixteen, with a teenager's lean build",
  text: "YOUNG MOM (MOM at sixteen, seen only in a memory — drawn from the attached SON reference, changing only her hair): exactly MOM's solid black hair parted softly at the centre and framing the round face, with one round bun on top marked with two or three thin curved lines; a lean teenager about SON's height. No clothing — a bare thin black line body with no fill." },
// EDIT_WHO — Lily: "LILY is the teenage girl with one long black braid over her shoulder"; "Young Mom": "YOUNG MOM is the teenage girl with MOM's black bun"
```
The lineup for "Seven Things" (with the redesigned BOSS) is in `assets/v19-samples/seven-things-cast-lineup/`.

---

## 7. Avoid
- A bald, hairless or perfectly round head; white hair; a beard instead of hair on top.
- Two characters with the same hair shape in one video (except the same person at another age).
- Any garment, or a garment word in an action (hood, sleeve, pocket, shoes, jacket).
- A bigger head to make someone younger; wrinkles to make someone older.
- A fringe, cap peak or glasses that hide the eyebrows or pupils.
- A bright or red accessory, or an accessory with words or a logo.
- A new character going into production without a lineup check.
