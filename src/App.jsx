import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Featured from "./Featured";
import Gallery from "./Gallery";
import About from "./About";
import Footer from "./Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/photofolio/"
          element={<Hero />}
        />
        <Route
          path="/photofolio/featured"
          element={<Featured />}
        />
        <Route
          path="/photofolio/gallery"
          element={<Gallery />}
        />
        <Route
          path="/photofolio/about"
          element={<About />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
