// StartsWithPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import PatternInput from "./PatternInput"; // adjust the import path as needed

const StartsWithPage = () => {
  const containerRef = useRef(null);
  const [inputString, setInputString] = useState("");

  const generateDFA = (pattern) => {
    const nodes = [];
    const edges = [];
  
    const alphabet = pattern.includes("a") || pattern.includes("b") ? ["a", "b"] : ["0", "1"];
  
    // Create states
    for (let i = 0; i <= pattern.length; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === pattern.length ? "lightgreen" : "lightblue",
      });
    }
  
    // Create transitions
    for (let i = 0; i < pattern.length; i++) {
      edges.push({ from: i, to: i + 1, label: pattern[i] });
    }
  
    // Self-loop on final state for all valid inputs
    edges.push({ from: pattern.length, to: pattern.length, label: alphabet.join(",") });
  
    // Trap State for invalid transitions
    nodes.push({ id: "X", label: "qX", color: "lightcoral" });
  
    for (let i = 0; i < pattern.length; i++) {
      alphabet.forEach((char) => {
        if (char !== pattern[i]) {
          edges.push({ from: i, to: "X", label: char });
        }
      });
    }
    edges.push({ from: "X", to: "X", label: alphabet.join(",") });
  
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
          DFA Visualizer: Starts With
        </h1>
        <PatternInput
          id="startWithInput"
          label="Starts with"
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

export default StartsWithPage;
