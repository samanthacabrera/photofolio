import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import Gallery from "./Gallery";
import About from "./About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-24 md:space-y-48 pb-48">
              <Hero />
              <About />
              <Gallery />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

