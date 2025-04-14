// ContainsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import PatternInput from "./PatternInput"; // Adjust the path as needed

const ContainsPage = () => {
  const containerRef = useRef(null);
  const [inputString, setInputString] = useState("");

  // Compute prefix function for the pattern (KMP algorithm)
  const computePrefix = (pattern) => {
    const prefix = new Array(pattern.length).fill(0);
    let k = 0;
    for (let i = 1; i < pattern.length; i++) {
      while (k > 0 && pattern[k] !== pattern[i]) {
        k = prefix[k - 1];
      }
      if (pattern[k] === pattern[i]) {
        k++;
      }
      prefix[i] = k;
    }
    return prefix;
  };

  // Determine the next state for a given state and character
  const getNextState = (state, char, pattern, prefix) => {
    if (state < pattern.length && char === pattern[state]) {
      return state + 1;
    }
    while (state > 0) {
      state = prefix[state - 1];
      if (char === pattern[state]) {
        return state + 1;
      }
    }
    return 0;
  };

  // Generate a DFA for "contains/substring" matching using the computed prefix table
  const generateDFA = (pattern) => {
    if (!pattern) return { nodes: [], edges: [] };
  
    // Detect whether input is binary or alphabetic
    const isBinary = /^[01]+$/.test(pattern);
    const isAlpha = /^[ab]+$/.test(pattern);
  
    if (!isBinary && !isAlpha) {
      return { nodes: [], edges: [] }; // Invalid input, return empty DFA
    }
  
    const alphabet = isBinary ? ["0", "1"] : ["a", "b"];
    const nodes = [];
    const edges = [];
    const m = pattern.length;
  
    // Create states for DFA
    for (let i = 0; i <= m; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === m ? "lightgreen" : "lightblue",
      });
    }
  
    // Process substring transitions only if pattern exists
    if (pattern) {
      const prefix = computePrefix(pattern);
      alphabet.forEach((char) => {
        for (let i = 0; i <= m; i++) {
          let nextState = i === m ? m : getNextState(i, char, pattern, prefix);
          edges.push({
            from: i,
            to: nextState,
            label: char,
          });
        }
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
          DFA Visualizer: Contains / Substring
        </h1>
        <PatternInput
          id="containsInput"
          label="Contains"
          value={inputString}
          onChange={setInputString}
          placeholder="Enter substring pattern (e.g., 101)"
        />
      </div>

      <div
        ref={containerRef}
        className="h-[62%] w-full border border-gray-300 rounded mt-4"
      ></div>
    </>
  );
};

export default ContainsPage;
