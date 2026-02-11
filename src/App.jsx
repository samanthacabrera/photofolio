import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Gallery from "./Gallery";
import Contact from "./Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-24">
              <Hero />
              <About />
              <Gallery />
              <Contact />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

