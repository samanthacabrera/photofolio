import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "./Gallery";
import Footer from "./Footer";
import Loading from "./Loading";
import photos from "./photos";

function preloadImages(imageUrls) {
  return Promise.all(
    imageUrls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        })
    )
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageUrls = photos.map((p) => p.src);

    Promise.all([
      preloadImages(imageUrls),
      new Promise((res) => setTimeout(res, 2500)),
    ]).then(() => {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            className="absolute inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/photofolio/"
              element={
                <div>
                  <Gallery />
                </div>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </motion.div>
    </div>
  );
}