import { useRef, useEffect } from "react";
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data";
import { startsWith } from "./type/StartsWith.js";
import { EndsWith } from "./type/EndsWith.js";
import { Contains } from "./type/Contains.js";
import { addStartAndFinalNodes } from "./type/utils.js";
import { createNodesWithDeadState } from "../hooks/useDFAVisualizer.js";
import { addLog, resetLogs } from "./logger";

const VisualizationArea = ({ selectedOption, pattern }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const nodesRef = useRef(null);
  const edgesRef = useRef(null);

  function startAnimation() {
    const text = pattern;
    const type = selectedOption;

    if (!containerRef.current) return;

    // cleanup previous graph
    if (networkRef.current) {
      networkRef.current.destroy();
    }

    const nodes = new DataSet();
    const edges = new DataSet();

    resetLogs();
    addLog(`Starting DFA animation for pattern: ${text}`);
    addLog(`Number of states to create(stringLenght + 1): ${text.length + 1}`);

    // ---------------------------

    // create nodes + dead state
    const nodeQueue = createNodesWithDeadState(text, type);
    nodes.add(nodeQueue);

    const data = { nodes, edges };
    const options = {
      physics: false,
      nodes: {
        shape: "circle",
        font: { size: 16 },
      },
      edges: {
        font: { align: "top" },
        arrows: "to",
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0,
        },
      },
    };

    const network = new Network(containerRef.current, data, options);

    nodesRef.current = nodes;
    edgesRef.current = edges;
    networkRef.current = network;

    // ---------------------------
    //   MAIN EDGE ANIMATION
    // ---------------------------
    let mainEdgeIndex = 0;

    function animateMainEdges(str) {
      if (mainEdgeIndex < str.length) {
        const from = mainEdgeIndex;
        const to = mainEdgeIndex + 1;
        const char = str[mainEdgeIndex];

        edges.add({
          id: `main-${from}-${to}-${char}`,
          from,
          to,
          label: char,
          color: { color: "#4A148C" },
          arrows: "to",
        });

        mainEdgeIndex++;
        addLog(`Added edge for '${char}' from q${from} to q${to}`);
        setTimeout(() => animateMainEdges(str), 1000);
      } else {
        // After main edges, animate special edges
        handleSpecialEdges(str);
      }
    }

    function handleSpecialEdges(str) {
      if (type === "Starts With") {
        const animateDeadEdges = startsWith(edges);
        animateDeadEdges(str);
        addStartAndFinalNodes(network, nodes, edges, str.length);
      } else if (type === "Ends With") {
        const animateEndsWith = EndsWith();
        const { edges: newEdges } = animateEndsWith(str);

        newEdges.forEach((e, index) => {
          setTimeout(() => {
            edges.add({
              id: `${e.from}-${e.to}-${e.label}`,
              from: e.from,
              to: e.to,
              label: e.label,
              arrows: "to",
              smooth: { type: "curvedCW", roundness: 0.4 },
            });

            addLog(`Added edge for '${e.label}' from q${e.from} to q${e.to}`);
            if (index === newEdges.length - 1) {
              addStartAndFinalNodes(network, nodes, edges, str.length);
              addLog(`Completed adding all 'Ends With' edges.`);
            }
          }, index * 1000);
        });
      } else if (type === "Contains") {
        const animateContains = Contains(edges);
        const { edges: newEdges } = animateContains(str);

        newEdges.forEach((e, index) => {
          setTimeout(() => {
            edges.add({
              from: e.from,
              to: e.to,
              label: e.label,
              arrows: "to",
              smooth: { type: "curvedCW", roundness: 0.4 },
            });

            addLog(`Added edge for '${e.label}' from q${e.from} to q${e.to}`);
            if (index === newEdges.length - 1) {
              addStartAndFinalNodes(network, nodes, edges, str.length);
              addLog(`Completed adding all 'Contains' edges.`);
            }
          }, index * 1000);
        });
      }
    }

    // Wait 1 sec before starting edge animation
    setTimeout(() => {
      addLog(`Connect the sates same way as pattern: ${text}`);
      animateMainEdges(text);
    }, 2000);
  }

  // RUN when pattern or option changes
  useEffect(() => {
    if (!pattern) return;
    startAnimation();
  }, [pattern, selectedOption]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div
        className="w-full h-[400px] relative flex items-center justify-center"
        ref={containerRef}
      ></div>
    </div>
  );
};

export default VisualizationArea;
