import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";

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
        <h1 className="text-3xl font-bold text-center mb-6">
          DFA Visualizer: Ends With
        </h1>
        <div className="flex items-center space-x-4 border border-gray-300">
          <label htmlFor="startWithInput" className="whitespace-nowrap ml-4">
            Starts with
          </label>
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            placeholder="Enter pattern (e.g., 101)"
            className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[500px] w-full border border-gray-300 rounded"
      ></div>
    </>
  );
};

export default StartsWithPage;
