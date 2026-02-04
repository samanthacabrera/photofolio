import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Featured from "./Featured";
import Gallery from "./Gallery";
import About from "./About";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-64">
              <Hero />
              <Gallery />
              <Featured />
              <About />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

