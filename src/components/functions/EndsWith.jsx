// EndsWith.jsx
import { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

const EndsWith = ({ pattern = "" }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  /* ------------------------------------------------------------ *
   * DFA Generator for "Ends With"
   * ------------------------------------------------------------ */
  const generateDFA = (pat) => {
    if (!pat) return { nodes: [], edges: [] };

    const isBinary = /^[01]+$/.test(pat);
    const isAlpha = /^[ab]+$/.test(pat);
    if (!isBinary && !isAlpha) return { nodes: [], edges: [] };

    const alphabet = isBinary ? ["0", "1"] : ["a", "b"];
    const nodes = [];
    const edges = [];

    // Create DFA states
    for (let i = 0; i <= pat.length; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === pat.length ? "lightgreen" : "lightblue",
      });
    }

    // Transition logic for "ends with"
    for (let i = 0; i <= pat.length; i++) {
      const currentPrefix = pat.slice(0, i);
      alphabet.forEach((char) => {
        const nextPrefix = currentPrefix + char;

        let k = Math.min(nextPrefix.length, pat.length);
        while (k > 0 && nextPrefix.slice(-k) !== pat.slice(-k)) {
          k--;
        }

        edges.push({ from: i, to: k, label: char });
      });
    }

    return { nodes, edges };
  };

  /* ------------------------------------------------------------ *
   * (Re)Draw the Graph Whenever Pattern Changes
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

export default EndsWith;
