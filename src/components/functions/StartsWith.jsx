// StartsWithPage.jsx
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

const StartsWith = ({ pattern = "" }) => {
  /* ------------------------------------------------------------ *
   * Refs
   * ------------------------------------------------------------ */
  const containerRef = useRef(null);     // <div> that hosts Vis-Network
  const networkRef   = useRef(null);     // keeps the current Network instance

  /* ------------------------------------------------------------ *
   * DFA generator
   * ------------------------------------------------------------ */
  const generateDFA = (pat) => {
    const nodes = [];
    const edges = [];

    // Decide alphabet based on whether pattern contains a/b or 0/1
    const alphabet = /[ab]/.test(pat) ? ["a", "b"] : ["0", "1"];

    // ---------- states ----------
    for (let i = 0; i <= pat.length; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === pat.length ? "lightgreen" : "lightblue",
      });
    }

    // ---------- transitions for the prefix ----------
    for (let i = 0; i < pat.length; i++) {
      edges.push({ from: i, to: i + 1, label: pat[i] });
    }

    // ---------- self-loop on final state ----------
    edges.push({
      from: pat.length,
      to:   pat.length,
      label: alphabet.join(","),
    });

    // ---------- trap state ----------
    nodes.push({ id: "X", label: "qX", color: "lightcoral" });
    for (let i = 0; i < pat.length; i++) {
      alphabet.forEach((c) => {
        if (c !== pat[i]) edges.push({ from: i, to: "X", label: c });
      });
    }
    edges.push({ from: "X", to: "X", label: alphabet.join(",") });

    return { nodes, edges };
  };

  /* ------------------------------------------------------------ *
   * (Re)draw graph whenever pattern changes
   * ------------------------------------------------------------ */
  useEffect(() => {
    // Destroy the existing graph before drawing a new one
    if (networkRef.current) networkRef.current.destroy();

    if (!pattern) return; // nothing to render yet

    const { nodes, edges } = generateDFA(pattern);
    const data    = { nodes, edges };
    const options = {
      edges:    { arrows: "to", smooth: { type: "curvedCW", roundness: 0.2 } },
      physics:  false,
    };

    networkRef.current = new Network(containerRef.current, data, options);

    // Clean-up on unmount
    return () => {
      if (networkRef.current) networkRef.current.destroy();
    };
  }, [pattern]);

  /* ------------------------------------------------------------ *
   * Render
   * ------------------------------------------------------------ */
  return (
    <>
      <div
        ref={containerRef}
        className="h-[99%] w-[98%] border border-gray-300 rounded mt-4"
      />
    </>
  );
};

export default StartsWith;
