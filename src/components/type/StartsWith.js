// animateDeadEdges.js
import { addLog } from '../logger.js';

export function startsWith(edges) {
  let deadEdgeIndex = 0;

  function animateDeadEdges(str) {
    if (deadEdgeIndex < str.length) {
      const from = deadEdgeIndex;
      const char = str[deadEdgeIndex];
      const altChar = char === "a" ? "b" : "a";

      edges.add({
        from,
        to: "dead",
        label: altChar,
        dashes: true,
        color: { color: "#9E9E9E" },
        arrows: "to"
      });

      deadEdgeIndex++;
      addLog(`Added dead edge for '${altChar}' from q${from} to qX`);
      setTimeout(() => animateDeadEdges(str), 1000);
    }
  }

  return animateDeadEdges;
}
