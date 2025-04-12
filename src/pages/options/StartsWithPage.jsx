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

    // Self-loop on final state
    edges.push({ from: pattern.length, to: pattern.length, label: "0,1" });

    // Loopback for invalid cases (trap state qX)
    nodes.push({ id: "X", label: "qX", color: "lightcoral" });
    for (let i = 0; i < pattern.length; i++) {
      ["0", "1"].forEach((char) => {
        if (char !== pattern[i]) {
          edges.push({ from: i, to: "X", label: char });
        }
      });
    }
    edges.push({ from: "X", to: "X", label: "0,1" }); // Self-loop on trap state

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
