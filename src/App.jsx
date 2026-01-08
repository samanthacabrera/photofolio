import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Featured from "./Featured";
import Gallery from "./Gallery";
import About from "./About";

function AnimatedRoutes({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/photofolio/" element={<Hero />} />
        <Route path="/photofolio/featured" element={<Featured darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/photofolio/gallery" element={<Gallery darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/photofolio/about" element={<About darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true); 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  
  return (
    <BrowserRouter>
      <AnimatedRoutes darkMode={darkMode} setDarkMode={setDarkMode}/>
    </BrowserRouter>
  );
}

