// Theorem 1 of arXiv 2609.11132 (exact mixing vs radial map at the witness z_q). Mirrors reference.py.
(function (root) {
  "use strict";
  const center = (z) => {
    const m = z.reduce((a, b) => a + b, 0) / z.length;
    return z.map((v) => v - m);
  };
  const softmax = (z) => {
    const m = Math.max(...z),
      e = z.map((v) => Math.exp(v - m)),
      s = e.reduce((a, b) => a + b, 0);
    return e.map((v) => v / s);
  };
  const LK = (q, K) => Math.log(((K - 1) * (1 - q)) / q);
  const alpha = (q, K) => 1 - (K * q) / (K - 1);
  const Phi = (z, q, K) => center(softmax(z).map((p) => Math.log((1 - q) * p + (q / (K - 1)) * (1 - p))));
  function Rq(z, q, K) {
    const cz = center(z),
      r = Math.SQRT2 * Math.hypot(...cz);
    if (r === 0) return cz;
    const L = LK(q, K),
      s = (L * Math.tanh((alpha(q, K) * r) / L)) / r;
    return cz.map((v) => s * v);
  }
  function witness(q, K) {
    const z = new Array(K).fill(0),
      L = LK(q, K);
    z[0] = L / 4;
    z[1] = -L / 4;
    return z;
  }
  const KL = (p, r) => p.reduce((a, pi, i) => a + pi * (Math.log(pi) - Math.log(r[i])), 0);
  const CSTAR = 0.5 - Math.tanh(0.5);
  function point(k, K) {
    const q = 2 ** -k,
      z = witness(q, K),
      L = LK(q, K),
      e = Phi(z, q, K),
      a = Rq(z, q, K);
    const d = e.map((v, i) => v - a[i]);
    const pe = softmax(e),
      pa = softmax(a);
    return {
      q,
      L,
      D: Math.max(...d) - Math.min(...d),
      lower: (CSTAR / 2) * L,
      ratio01: (e[0] - e[1] - (a[0] - a[1])) / L,
      KL: KL(pe, pa),
      pe,
      pa,
      e,
      a,
    };
  }
  const api = { point, CSTAR, LK };
  if (typeof module !== "undefined") module.exports = api;
  else root.DemoMath = api;
})(this);
