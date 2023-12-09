import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./components/appbar/Appbar";
import Home from "./pages/Home";
import AssignmentA from "./pages/AssignmentA";
import AssignmentB from "./pages/AssignmentB";
import AssignmentC from "./pages/AssignmentC";
import Fallback from "./components/fallback/Fallback";
import "./App.css";

function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Explore Abdul's Assignment Again!" : "Isar Aerospace Assignment";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<Fallback />}>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assignment-a" element={<AssignmentA />} />
          <Route path="/assignment-b" element={<AssignmentB />} />
          <Route path="/assignment-c" element={<AssignmentC />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
