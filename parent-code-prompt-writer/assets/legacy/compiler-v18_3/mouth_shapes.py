# Version 9 — stronger expressions: every mouth gets a clear, readable shape (the renders showed tiny neutral mouths)
import os, re, glob
ROOT = os.environ.get("ROOT", "/home/claude/v3")
RULES = [
 (r"mouth a small round circle", "mouth a big round open circle"),
 (r"mouth a small open oval", "mouth a wide open oval"),
 (r"mouth a small open (\w+) oval", r"mouth a wide open \1 oval"),
 (r"mouth a small (trembling |hurt |honest |)downturned line", r"mouth a deep \1downturned curve"),
 (r"mouth a small (sad honest|sad|sorry|rueful|tired|sulky|longing|guilty) line", r"mouth a deep \1 downturned curve"),
 (r"mouth a small (worried|uncertain|unsure|hesitant|wary|pleading|open worried) line", r"mouth a big \1 wavy line"),
 (r"mouth a small (wavy guilty|frantic wavy|wavy|trembling) line", r"mouth a big \1 line"),
 (r"mouth a small (closed flat|flat) line", "mouth a hard flat line"),
 (r"mouth a small closed line", "mouth a firmly closed line"),
 (r"mouth a small tight (line|smile)", r"mouth a tight pressed \1"),
 (r"mouth a small pursed line", "mouth a tight pursed line"),
 (r"mouth a small (stunned|surprised|awed) line", r"mouth a round open \1 circle"),
 (r"mouth a small hopeful line", "mouth a hopeful half-smile"),
 (r"mouth a small ((?:\w+ ){0,2})smile", r"mouth a clear \1smile"),
 (r"mouth a small ((?:\w+ ){0,2})curve", r"mouth a clear \1curve"),
 (r"mouth a small ", "mouth a "),
 (r"mouth a (\w+) small ", r"mouth a \1 "),
 (r"(eyebrows [a-z ]*?)slightly ", r"\1"),
]
n = 0
for f in sorted(glob.glob(ROOT + "/segs/seg0*.cjs")):
    s = open(f).read(); t = s
    for a, b in RULES:
        t, k = re.subn(a, b, t); n += k
    open(f, "w").write(t)
print("pass14_emotion: %d mouth/eyebrow phrases strengthened" % n)
# a few shared beats where one face looked at an object instead of the other person
exec(open(ROOT + "/passlib.py").read())
sub(32, "pupils on THE TOOLBOX", "pupils on SON")
sub(106, "lecturing arch, pupils on the mark,", "lecturing arch, pupils on SON,")
sub(206, "pupils on the gold star", "pupils on SON")
save("pass14_gaze")
