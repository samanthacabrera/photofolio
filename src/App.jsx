import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Gallery from "./Gallery";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-20 pb-20 md:pb-60">
              <About />
              <Gallery />
              <ScrollToTop />
            </div>
          }
        />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

