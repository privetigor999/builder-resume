import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import ResumePage from "./pages/ResumePage/ResumePage";
import StartPage from "./pages/StartPage/StartPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </div>
  );
}

export default App;
