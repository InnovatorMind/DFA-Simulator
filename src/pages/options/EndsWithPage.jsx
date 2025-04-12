import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";

const EndsWithPage = () => {
  const containerRef = useRef(null);
  const [inputString, setInputString] = useState("");

  const generateDFA = (pattern) => {
    const nodes = [];
    const edges = [];
    // let stateCounter = 0;

    // Create states for the pattern
    for (let i = 0; i <= pattern.length; i++) {
      nodes.push({
        id: i,
        label: `q${i}`,
        color: i === pattern.length ? "lightgreen" : "lightblue",
      });
    }

    // Create a trap state
    // const trapState = "X";
    // nodes.push({ id: trapState, label: "qX", color: "lightcoral" });

    // Transition logic for "ends with"
    for (let i = 0; i <= pattern.length; i++) {
      const currentPrefix = pattern.slice(0, i);
      ["0", "1"].forEach((char) => {
        const nextPrefix = currentPrefix + char;

        // Determine the longest suffix of nextPrefix that is also a prefix of pattern
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
        <h1 className="text-3xl font-bold text-center mb-6">
          DFA Visualizer: Ends With
        </h1>
        <div className="flex items-center space-x-4 border border-gray-300">
          <label htmlFor="endsWithInput" className="whitespace-nowrap ml-4">
            Ends with
          </label>
          <input
            id="endsWithInput"
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            placeholder="Enter pattern (ends with...)"
            className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-6 border border-gray-300">
        <div
          ref={containerRef}
          className="h-[500px] w-full border border-gray-300 rounded"
        ></div>
      </div>
    </>
  );
};

export default EndsWithPage;
