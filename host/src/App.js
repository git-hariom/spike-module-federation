import React, { Suspense, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactApp from "./ReactApp";
import FlutterApp from "./FlutterApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test" exact element={<FlutterApp />} />
        <Route path="/" element={<ReactApp />} />
      </Routes>
    </Router>
  );
};

export default App;
