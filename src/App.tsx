import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import ResumePage from "./pages/ResumePage/ResumePage";
import { StartPage } from "./pages/StartPage/StartPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
