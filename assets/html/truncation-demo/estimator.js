/* Math core for the J.2 truncation widget.
 * Mirrored bit-for-bit by reference.py (Python test suite) - keep in sync.
 * Method: Pinsky & Wen, "Estimation of Distribution Parameters by Mean
 * Absolute Deviations of a Truncated Distribution Using Quantile Functions",
 * Statistical Papers 67:31 (2026). Cauchy case:
 *   x0_hat    = sample median
 *   gamma_hat = pi/(2 ln 2) * MAD about the median over points in [Q1, Q3]
 */
"use strict";

const GAMMA_CONST = Math.PI / (2 * Math.log(2));

function mulberry32(seed) {
  let state = seed >>> 0;
  return function () {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1) >>> 0;
    t = (t ^ ((t + Math.imul(t ^ (t >>> 7), t | 61)) >>> 0)) >>> 0;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cauchySample(n, x0, gamma, seedOrRng) {
  const rng = typeof seedOrRng === "function" ? seedOrRng : mulberry32(seedOrRng);
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[i] = x0 + gamma * Math.tan(Math.PI * (rng() - 0.5));
  return out;
}

function quantile(sortedXs, p) {
  const idx = p * (sortedXs.length - 1);
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  if (lo === hi) return sortedXs[lo];
  return sortedXs[lo] + (idx - lo) * (sortedXs[hi] - sortedXs[lo]);
}

function estimate(xs) {
  const s = xs.slice().sort((a, b) => a - b);
  const x0Hat = quantile(s, 0.5);
  const q1 = quantile(s, 0.25), q3 = quantile(s, 0.75);
  let sum = 0, k = 0;
  for (const x of s) if (x >= q1 && x <= q3) { sum += Math.abs(x - x0Hat); k++; }
  return { x0: x0Hat, gamma: GAMMA_CONST * (sum / k) };
}

function cauchyPdf(x, x0, gamma) {
  const z = (x - x0) / gamma;
  return 1 / (Math.PI * gamma * (1 + z * z));
}

/* Self-test: expected values computed by reference.py (pytest, 6/6 green).
 * Returns list of {name, pass, detail}. */
function runSelfTest() {
  const EXPECT = {
    first3: [1.763006121984, 1.368884587037, 3.100621111543],
    x0Hat: 1.5061650961218864,
    gammaHat: 0.7857576121763218,
  };
  const results = [];
  const check = (name, pass, detail) => results.push({ name, pass, detail });

  const draws = cauchySample(3, 1.5, 0.8, 42);
  check("RNG stream matches Python reference",
    draws.every((v, i) => Math.abs(v - EXPECT.first3[i]) < 1e-9),
    draws.map(v => v.toFixed(9)).join(", "));

  const q = quantile([1, 2, 3, 4], 0.25);
  check("quantile interpolation", Math.abs(q - 1.75) < 1e-12, "Q(0.25)=" + q);

  const est = estimate(cauchySample(20000, 1.5, 0.8, 42));
  check("estimate matches Python vectors to 1e-6",
    Math.abs(est.x0 - EXPECT.x0Hat) < 1e-6 && Math.abs(est.gamma - EXPECT.gammaHat) < 1e-6,
    `x0=${est.x0.toFixed(10)} gamma=${est.gamma.toFixed(10)}`);

  check("consistency: recovers (1.5, 0.8) on 20k draws",
    Math.abs(est.x0 - 1.5) < 0.05 && Math.abs(est.gamma - 0.8) < 0.05,
    `|dx0|=${Math.abs(est.x0 - 1.5).toFixed(4)} |dg|=${Math.abs(est.gamma - 0.8).toFixed(4)}`);

  return results;
}
