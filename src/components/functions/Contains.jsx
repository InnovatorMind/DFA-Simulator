// Contains.jsx
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

const Contains = ({ pattern = "" }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  /* ------------------------------------------------------------ *
   * Compute prefix function for the pattern (KMP algorithm)
   * ------------------------------------------------------------ */
  const computePrefix = (pat) => {
    const prefix = new Array(pat.length).fill(0);
    let k = 0;
    for (let i = 1; i < pat.length; i++) {
      while (k > 0 && pat[k] !== pat[i]) k = prefix[k - 1];
      if (pat[k] === pat[i]) k++;
      prefix[i] = k;
    }
    return prefix;
  };

  /* ------------------------------------------------------------ *
   * Determine next state for a given state and character
   * ------------------------------------------------------------ */
  const getNextState = (state, char, pat, prefix) => {
    if (state < pat.length && char === pat[state]) return state + 1;
    while (state > 0) {
      state = prefix[state - 1];
      if (char === pat[state]) return state + 1;
    }
    return 0;
  };

  /* ------------------------------------------------------------ *
   * Generate DFA for "Contains" Matching
   * ------------------------------------------------------------ */
  const generateDFA = (pat) => {
    if (!pat) return { nodes: [], edges: [] };

    const isBinary = /^[01]+$/.test(pat);
    const isAlpha = /^[ab]+$/.test(pat);
    if (!isBinary && !isAlpha) return { nodes: [], edges: [] };

    const alphabet = isBinary ? ["0", "1"] : ["a", "b"];
    const nodes = [];
    const edges = [];
    const m = pat.length;

    // Create states
    for (let i = 0; i <= m; i++) {
      nodes.push({ id: i, label: `q${i}`, color: i === m ? "lightgreen" : "lightblue" });
    }

    // Process substring transitions
    const prefix = computePrefix(pat);
    alphabet.forEach((char) => {
      for (let i = 0; i <= m; i++) {
        const nextState = i === m ? m : getNextState(i, char, pat, prefix);
        edges.push({ from: i, to: nextState, label: char });
      }
    });

    return { nodes, edges };
  };

  /* ------------------------------------------------------------ *
   * (Re)draw Graph When Pattern Changes
   * ------------------------------------------------------------ */
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
    return () => networkRef.current.destroy();
  },);

  /* ------------------------------------------------------------ *
   * Render
   * ------------------------------------------------------------ */
  return (
    <>
      <div ref={containerRef} 
        className="h-[99%] w-[98%] border border-gray-300 rounded mt-4"
       />
    </>
  );
};

export default Contains;
