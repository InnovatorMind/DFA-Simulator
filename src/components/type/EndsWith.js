export function EndsWith() {
    // console.log(target); // baseEdges, target = "abab"
    
  function animateEndsWith(str) {
    const edges = [];
    const pattern = str;
    const alphabet = /^[01]+$/.test(pattern) ? ["0", "1"] : ["a", "b"];

    for (let i = 0; i <= pattern.length; i++) {
      alphabet.forEach((ch) => {
        const next = pattern.slice(0, i) + ch;

        let k = Math.min(next.length, pattern.length);
        while (k > 0 && next.slice(-k) !== pattern.slice(0, k)) k--;

        // ✅ only add if NOT the "main linear edge"
        if (!(i < pattern.length && ch === pattern[i])) {
          edges.push({
            from: i,
            to: k,
            label: ch,
          });
        }
      });
    }

    return { edges };
  }

  return animateEndsWith;
}
