import React, { useState, useEffect } from 'react';

import { Graph } from "react-d3-graph";

import './App.css';

function App() {
  return (
    <div className="App">
      <TrainRoute />
    </div>
  );
}

function TrainRoute() {
  const [data, setData] = useState({routes: {nodes: [], links: []}});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/routes', { method: "GET" }).then(response => response.json())

      console.log('routes: ', result);
      
      setData({routes: result});
    };
 
    fetchData();
  }, []);

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
      data.routes.nodes.length !== 0 ?
        <Graph
          id="route-graph"
          data={data.routes}
          config={config}
        /> : 
        <div></div>
  );
}

export default App;
