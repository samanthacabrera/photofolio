import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import About from "./About";
import Gallery from "./Gallery";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import Loading from "./Loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading onFinish={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-20 pb-20 md:pb-60 overflow-x-hidden">
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