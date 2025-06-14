// EndsWith.jsx
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

const EndsWith = ({ pattern = "" }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  /* ---------------------------------------------------------- *
   * DFA generator – accepts either a/b or 0/1 patterns
   * ---------------------------------------------------------- */
  const generateDFA = (pat) => {
    if (!pat) return { nodes: [], edges: [] };

    const alphabet = /^[01]+$/.test(pat) ? ["0", "1"] : ["a", "b"];
    const nodes = [];
    const edges = [];

    // ---------- states ----------
    for (let i = 0; i <= pat.length; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === pat.length ? "lightgreen" : "lightblue",
      });
    }

    /* ---------- transitions ----------
     *
     * Classic “Knuth–Morris–Pratt” style construction:
     * from every prefix state i, try every symbol,
     * then fall back to the longest suffix of (prefix+symbol)
     * that is also a prefix of the pattern.
     */
    for (let i = 0; i <= pat.length; i++) {
      alphabet.forEach((ch) => {
        const next = pat.slice(0, i) + ch;

        // length of the longest proper suffix of `next`
        // that matches a prefix of `pat`
        let k = Math.min(next.length, pat.length);
        while (k > 0 && next.slice(-k) !== pat.slice(0, k)) k--;

        edges.push({ from: i, to: k, label: ch });
      });
    }

    return { nodes, edges };
  };

  /* ---------------------------------------------------------- *
   * Draw / redraw when pattern changes
   * ---------------------------------------------------------- */
  useEffect(() => {
    if (networkRef.current) networkRef.current.destroy();
    if (!pattern) return;

    const { nodes, edges } = generateDFA(pattern);
    const data = { nodes, edges };
    const options = {
      edges: { arrows: "to", smooth: { type: "curvedCW", roundness: 0.2 } },
      physics: false,
    };

    networkRef.current = new Network(containerRef.current, data, options);

    return () => networkRef.current && networkRef.current.destroy();
  }, [pattern]);

  /* ---------------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className="h-[99%] w-[98%] border border-gray-300 rounded mt-4"
    />
  );
};

export default EndsWith;
