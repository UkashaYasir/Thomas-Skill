// Lab / LCh helpers (the same maths as the compiler's hexToLab / labToHex) — used by design4.cjs to generate soft palettes.
const _lin = v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4), _srgb = v => v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
const _f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116, _fi = t => { const t3 = t * t * t; return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787; };
function hexToLab(h) { const [r, g, b] = [1, 3, 5].map(i => _lin(parseInt(h.slice(i, i + 2), 16) / 255)); const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047, Y = r * 0.2126 + g * 0.7152 + b * 0.0722, Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883; const fx = _f(X), fy = _f(Y), fz = _f(Z); return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)]; }
function labToHex([L, a, b]) { const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200; const X = 0.95047 * _fi(fx), Y = _fi(fy), Z = 1.08883 * _fi(fz); const rl = X * 3.2406 - Y * 1.5372 - Z * 0.4986, gl = -X * 0.9689 + Y * 1.8758 + Z * 0.0415, bl = X * 0.0557 - Y * 0.2040 + Z * 1.0570; return "#" + [rl, gl, bl].map(v => Math.round(Math.max(0, Math.min(1, _srgb(Math.max(0, v)))) * 255).toString(16).padStart(2, "0")).join("").toUpperCase(); }
const hex = (L, C, h) => labToHex([L, C * Math.cos(h * Math.PI / 180), C * Math.sin(h * Math.PI / 180)]);
const lch = x => { const [L, a, b] = hexToLab(x); let H = Math.atan2(b, a) * 180 / Math.PI; if (H < 0) H += 360; return [L, Math.hypot(a, b), H]; };
module.exports = { hex, lch, M: { hexToLab, labToHex } };
