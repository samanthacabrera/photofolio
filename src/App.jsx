import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Featured from "./Featured";
import Gallery from "./Gallery";
import About from "./About";

function AppContent() {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const isHome = location.pathname === "/photofolio/";

  function getPageName(pathname) {
    switch (pathname) {
      case "/photofolio/featured":
        return "Featured";
      case "/photofolio/gallery":
        return "Gallery";
      case "/photofolio/about":
        return "About";
      default:
        return "";
    }
  }

  const pageName = getPageName(location.pathname);

  return (
    <>
      {!isHome && (
        <Header darkMode={darkMode} setDarkMode={setDarkMode} pageName={pageName}/>
      )}

      <Routes>
        <Route path="/photofolio/" element={<Hero />} />
        <Route path="/photofolio/featured" element={<Featured />} />
        <Route path="/photofolio/gallery" element={<Gallery />} />
        <Route path="/photofolio/about" element={<About />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
