export function Contains() {
  function animateContains(str) {
    const edges = [];
    const pattern = str;
    const m = pattern.length;
    const alphabet = /^[01]+$/.test(pattern) ? ["0", "1"] : ["a", "b"];

    // KMP LPS for fallbacks
    function computeLPS(pat) {
      const lps = Array(pat.length).fill(0);
      let len = 0, i = 1;
      while (i < pat.length) {
        if (pat[i] === pat[len]) {
          lps[i++] = ++len;
        } else if (len) {
          len = lps[len - 1];
        } else {
          lps[i++] = 0;
        }
      }
      return lps;
    }

    const lps = computeLPS(pattern);

    for (let state = 0; state <= m; state++) {
      for (const ch of alphabet) {
        // You already added the linear "match" edges: (i, pattern[i]) -> i+1
        if (state < m && ch === pattern[state]) continue;

        let to;

        if (state === m) {
          // ✅ Accepting state is absorbing
          to = m;
        } else if (state === 0) {
          // From state 0, anything that isn't the first char stays at 0
          to = 0; // (we're here only when ch !== pattern[0])
        } else {
          // Fallback using LPS
          let f = lps[state - 1];
          while (f > 0 && pattern[f] !== ch) f = lps[f - 1];
          if (pattern[f] === ch) f++;
          to = f;
        }

        edges.push({ from: state, to, label: ch });
      }
    }

    return { edges };
  }
  return animateContains;
}
