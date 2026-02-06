import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import photos from "./photos";

const slideVariants = {
  enter: { opacity: 0, filter: "blur(4px)" },
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.4, 1, 0.36, 1] },
  },
  exit: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.5 } },
};

function Featured() {
  const featuredPhotos = photos.filter((p) => p.featured);
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!featuredPhotos.length) return null;

  const photo = featuredPhotos[index];
  const isReversed = index % 2 !== 0;

  const paginate = (newDirection) => {
    setIndex(([prev]) => {
      const next = prev + newDirection;
      if (next < 0) return [featuredPhotos.length - 1, newDirection];
      if (next >= featuredPhotos.length) return [0, newDirection];
      return [next, newDirection];
    });
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
      <section
        id="featured"
        data-title="Featured"
        className="min-h-screen max-w-6xl mx-6 md:mx-auto overflow-hidden"
      >
        <div className="relative h-fit w-full flex flex-col items-start justify-end pb-24 text-left">
          <div className="flex items-center gap-4 mb-4">
            <p className="text-xl md:text-5xl tracking-[0.3em] font-bold text-white/80">
              Featured
            </p>
            <span className="h-px w-[55vw] bg-white/40" />
          </div>
        </div>

        <div className="hidden md:block relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={photo.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`flex flex-col gap-8 md:gap-12 items-start
                ${isReversed ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              {/* Info */}
              <div className="w-full md:w-1/6 flex flex-col md:items-start items-center text-center md:text-left">
                <h1 className="text-2xl font-light mb-4">{photo.desc}</h1>

                <p className="italic tracking-widest opacity-70 mb-4">
                  {photo.location} {photo.year}
                </p>

                {photo.featuredText && (
                  <p className="leading-loose normal-case tracking-wider mb-4">
                    {photo.featuredText}
                  </p>
                )}

                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="opacity-60 hover:opacity-100 transition text-xl py-2 md:py-4"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
              </div>

              {/* Photo */}
              <div className="relative w-full md:w-5/6 h-[60vh] md:h-[80vh] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.desc}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col gap-16 md:hidden">
          {featuredPhotos.map((p) => (
            <div key={p.id} className="flex flex-col gap-4">
              <img
                src={p.src}
                alt={p.desc}
                className="w-full h-[50vh] object-cover"
              />
              <div className="flex flex-col gap-2 px-2">
                <h2 className="text-xl font-semibold">{p.desc}</h2>
                <p className="italic tracking-widest opacity-70">
                  {p.location} {p.year}
                </p>
                {p.featuredText && (
                  <p className="leading-loose normal-case tracking-wider">
                    {p.featuredText}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}

export default Featured;
