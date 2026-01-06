import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import Gallery from "./Gallery";
import Featured from "./Featured";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/photofolio/" element={<Hero />} />
        <Route path="/photofolio/featured" element={<Featured />} />
        <Route path="/photofolio/gallery" element={<Gallery />} />
        <Route path="/photofolio/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
