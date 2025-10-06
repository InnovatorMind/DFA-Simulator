import { useRef, useEffect } from "react";
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data";
import { startsWith } from "./type/StartsWith.js"
import { EndsWith } from "./type/EndsWith.js";
import { Contains } from "./type/Contains.js";
import { addStartAndFinalNodes } from './type/utils.js';
import { createNodesWithDeadState } from "../hooks/useDFAVisualizer.js"

const VisualizationArea = ({ selectedOption, pattern }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const nodesRef = useRef(null);
  const edgesRef = useRef(null);

  function startAnimation() {
    const text = pattern;
    const type = selectedOption;

    if (!containerRef.current) return;

    const nodes = new DataSet();
    const edges = new DataSet();
    
    // create nodes for each and dead node for start with dfa
    const nodeQueue = createNodesWithDeadState(text, type);

    nodes.add(nodeQueue); // actually add nodes

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
    networkRef.current = network;
    nodesRef.current = nodes;
    edgesRef.current = edges;

    // let nodeIndex = 0;
    function animateNodes() {
      animateMainEdges(text);
    }

    let mainEdgeIndex = 0;
    function animateMainEdges(str) {
      if (mainEdgeIndex < str.length) {
        const from = mainEdgeIndex;
        const to = mainEdgeIndex + 1;
        const char = str[mainEdgeIndex];

        edges.add({
          from,
          to,
          label: char,
          color: { color: "#4A148C" },
          arrows: "to"
        });

        mainEdgeIndex++;
        setTimeout(() => animateMainEdges(str), 500);
      } else if (type === "Starts With") {
        const animateDeadEdges = startsWith(edges);
        animateDeadEdges(str);
        addStartAndFinalNodes(network, nodes, edges, str.length);
      } else if (type === "Ends With") {
        const animateEndsWith = EndsWith();
        const { edges: newEdges } = animateEndsWith(str);
        console.log(newEdges);

        newEdges.forEach((e, index) => {
          setTimeout(() => {
            edges.add({
              id: `${e.from}-${e.to}-${e.label}`,
              from: e.from,
              to: e.to,
              label: e.label,
              arrows: "to",
              smooth: { type: "curvedCW", roundness: 0.4 },
              font: { color: "#000000", size: 16, align: "horizontal" },
            });

            // When the last edge is drawn, add the special nodes
            if (index === newEdges.length - 1) {
              addStartAndFinalNodes(network, nodes, edges, str.length);
            }

          }, index * 1000);
        });

      } else if (type === "Contains") {
        const animateContains = Contains(edges);
        const { edges: newEdges } = animateContains(str);
        console.log(newEdges);

        newEdges.forEach((e, index) => {
          console.log("-> ", e.label);
          setTimeout(() => {
            edges.add({
              from: e.from,
              to: e.to,
              label: e.label,
              arrows: "to",
              smooth: { type: "curvedCW", roundness: 0.4 },
              font: { color: "#000000", size: 16, align: "horizontal" },
            });

            if (index === newEdges.length - 1) {
              addStartAndFinalNodes(network, nodes, edges, str.length);
            }
          }, index * 1000);
        });
      }
    }

    // ✅ Kick off animation
    animateNodes();
    // console.log("Pattern text:", text);
    // console.log("Selected type:", type);
    // console.log("InputData:", inputData);
  }

  // ✅ run only when pattern or option changes
  useEffect(() => {
    startAnimation();
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-full h-[400px] relative flex items-center justify-center" ref={containerRef}>
      </div>
    </div>
  );
};

export default VisualizationArea;

