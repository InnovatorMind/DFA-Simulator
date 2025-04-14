// EndsWithPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import PatternInput from "./PatternInput"; // Adjust the import path as needed

const EndsWithPage = () => {
  const containerRef = useRef(null);
  const [inputString, setInputString] = useState("");

  const generateDFA = (pattern) => {
    if (!pattern) return { nodes: [], edges: [] };
  
    // Detect if input is binary or alphabetic
    const isBinary = /^[01]+$/.test(pattern);
    const isAlpha = /^[ab]+$/.test(pattern);
  
    if (!isBinary && !isAlpha) {
      return { nodes: [], edges: [] }; // Invalid input, return empty DFA
    }
  
    const alphabet = isBinary ? ["0", "1"] : ["a", "b"];
    const nodes = [];
    const edges = [];
  
    // Create DFA states
    for (let i = 0; i <= pattern.length; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === pattern.length ? "lightgreen" : "lightblue",
      });
    }
  
    // Transition logic for "ends with"
    for (let i = 0; i <= pattern.length; i++) {
      const currentPrefix = pattern.slice(0, i);
      alphabet.forEach((char) => {
        const nextPrefix = currentPrefix + char;
  
        let k = Math.min(nextPrefix.length, pattern.length);
        while (k > 0 && nextPrefix.slice(-k) !== pattern.slice(0, k)) {
          k--;
        }
  
        const toState = k;
        edges.push({ from: i, to: toState, label: char });
      });
    }
  
    return { nodes, edges };
  };
  

  useEffect(() => {
    const { nodes, edges } = generateDFA(inputString);
    const data = { nodes, edges };
    const options = {
      edges: {
        arrows: "to",
        smooth: { type: "curvedCW", roundness: 0.2 },
      },
      physics: false,
    };

    const network = new Network(containerRef.current, data, options);

    return () => {
      network.destroy();
    };
  }, [inputString]);

  return (
    <>
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-center mb-6">
          DFA Visualizer: Ends With
        </h1>
        <PatternInput
          id="endsWithInput"
          label="Ends with"
          value={inputString}
          onChange={setInputString}
          placeholder="Enter pattern (e.g., 101)"
        />
      </div>

      <div
        ref={containerRef}
        className="h-[62%] w-full border border-gray-300 rounded mt-4"
      ></div>
    </>
  );
};

export default EndsWithPage;
