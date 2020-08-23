import React from 'react';

import { Graph } from "react-d3-graph";

import './App.css';

function App() {
  const data = { "nodes": [{ "id": "A" }, { "id": "B" }, { "id": "D" }, { "id": "C" }, { "id": "E" }, { "id": "F" }, { "id": "G" }, { "id": "H" }, { "id": "J" }, { "id": "I" }], "links": [{ "source": "A", "target": "B", "weight": 5 }, { "source": "A", "target": "D", "weight": 15 }, { "source": "B", "target": "C", "weight": 5 }, { "source": "C", "target": "D", "weight": 7 }, { "source": "E", "target": "F", "weight": 5 }, { "source": "F", "target": "G", "weight": 5 }, { "source": "G", "target": "H", "weight": 10 }, { "source": "G", "target": "J", "weight": 20 }, { "source": "H", "target": "I", "weight": 10 }, { "source": "I", "target": "J", "weight": 5 }] };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  return (
    <div className="App">
      <Graph
        id="route-graph"
        data={data}
        config={config}
      />;
    </div>
  );
}
export default App;
