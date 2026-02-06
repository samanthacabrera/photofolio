import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Gallery from "./Gallery";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-24 pb-24">
              <Hero />
              <About />
              <Gallery />
              <ScrollToTop />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

