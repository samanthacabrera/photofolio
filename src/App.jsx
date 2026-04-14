import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
// import About from "./About";
import Gallery from "./Gallery";
import Footer from "./Footer";
import Loading from "./Loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading onFinish={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/photofolio/"
          element={
            <div className="flex flex-col space-y-20 overflow-x-hidden">
              {/* <About /> */}
              <Gallery />
            </div>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}