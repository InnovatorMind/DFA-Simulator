// utils.js
export function addStartAndFinalNodes(network, nodes, edges, patternLength) {
    const firstNodePosition = network.getPositions([0])[0] || { x: 0, y: 0 };

    const offsetX = -100;
    const offsetY = 0;

    // Add start node (curved rectangle)
    nodes.add({
        id: "start",
        label: "start",
        shape: "box",
        borderRadius: 20,
        size: 20,
        color: {
            background: "yellow",   // node fill color
            border: "white"        // node border color set to white
        },
        x: firstNodePosition.x + offsetX,
        y: firstNodePosition.y + offsetY,
        fixed: { x: true, y: true }
    });

    // Add arrow from start node to DFA state 0
    edges.add({
        from: "start",
        to: 0,
        arrows: "to",
        color: { color: "black" },
    });

    // Make final DFA node double circled
    nodes.update({
        id: patternLength,
        shape: "ellipse",
        borderWidth: 3,
        color: { background: "white", border: "black" }
    });
}
