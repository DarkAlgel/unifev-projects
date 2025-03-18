import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import PageHome from "./pages/PageHome.jsx";
import PageGrafos from "./pages/PageGrafos.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/Grafo" element={<PageGrafos />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
