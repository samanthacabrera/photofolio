import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Featured from "./Featured";
import Gallery from "./Gallery";
import About from "./About";

export default function App() {
  const [layoutValue, setLayoutValue] = useState(1);

  return (
    <BrowserRouter>
      <Header layoutValue={layoutValue} setLayoutValue={setLayoutValue} />
      <Routes>
        <Route
          path="/photofolio/"
          element={<Home layoutValue={layoutValue} />}
        />
        <Route
          path="/photofolio/featured"
          element={<Featured layoutValue={layoutValue} />}
        />
        <Route
          path="/photofolio/gallery"
          element={<Gallery layoutValue={layoutValue} />}
        />
        <Route
          path="/photofolio/about"
          element={<About layoutValue={layoutValue}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
