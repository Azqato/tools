/* Password generator. Pure client-side, no DOM access.

   Randomness comes from crypto.getRandomValues, never Math.random.
   Math.random is not a cryptographic source: its output is predictable from
   enough samples, which for a password generator is the whole ballgame. */
(function () {
  var SETS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.?/"
  };

  // Characters a human cannot reliably tell apart when reading a password off
  // a screen or a printed page.
  var AMBIGUOUS = /[Il1O0o]/g;

  function poolFor(opts) {
    var pool = "";
    if (opts.lower) pool += SETS.lower;
    if (opts.upper) pool += SETS.upper;
    if (opts.digits) pool += SETS.digits;
    if (opts.symbols) pool += SETS.symbols;
    if (opts.noAmbiguous) pool = pool.replace(AMBIGUOUS, "");
    return pool;
  }

  /* Uniform index in [0, max) via rejection sampling.

     The obvious `value % max` is biased whenever max does not divide 256: the
     low indices come up slightly more often. For a password that bias is a
     real reduction in strength, so values landing in the final partial bucket
     are discarded and redrawn instead. */
  function randomIndex(max) {
    var limit = Math.floor(256 / max) * max;
    var buf = new Uint8Array(1);
    for (;;) {
      crypto.getRandomValues(buf);
      if (buf[0] < limit) return buf[0] % max;
    }
  }

  function generate(opts) {
    opts = opts || {};
    var length = Math.max(4, Math.min(128, opts.length || 20));
    var pool = poolFor(opts);
    if (!pool) return { ok: false, error: "Pick at least one kind of character." };

    var out = "";
    for (var i = 0; i < length; i++) out += pool.charAt(randomIndex(pool.length));

    return { ok: true, password: out, poolSize: pool.length, length: length };
  }

  /* Bits of entropy for a password drawn uniformly from `poolSize` characters.
     This measures the generator, not the string: it is the right number for a
     password this tool produced, and the wrong number for one a human chose. */
  function entropy(length, poolSize) {
    if (!length || !poolSize) return 0;
    return Math.round(length * (Math.log(poolSize) / Math.log(2)));
  }

  // Thresholds follow the usual reading of NIST-era guidance: below 60 bits is
  // weak against an offline attack on a fast hash, 128 is comfortably beyond
  // brute force for the foreseeable future.
  function strength(bits) {
    if (bits < 45) return { label: "Weak", level: 0 };
    if (bits < 60) return { label: "Fair", level: 1 };
    if (bits < 80) return { label: "Strong", level: 2 };
    if (bits < 128) return { label: "Very strong", level: 3 };
    return { label: "Overkill", level: 4 };
  }

  window.passwordGenerator = {
    SETS: SETS,
    generate: generate,
    entropy: entropy,
    strength: strength,
    poolFor: poolFor
  };
})();
