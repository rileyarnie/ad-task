import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
