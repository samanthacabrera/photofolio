import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import photos from "./photos";
import Transition from "./Transition";

const slideVariants = {
  enter: {
    opacity: 0,
    filter: "blur(4px)",
  },
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.40, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.5 },
  },
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

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Transition>
      <section className="min-h-screen max-w-7xl mx-6 md:mx-auto py-12 overflow-hidden">
        <p className="py-20 text-center text-4xl max-w-2xl mx-auto leading-loose tracking-widest italic">
          A selection of my <br /> favorite shots
        </p>

        <div className="relative pt-40">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={photo.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`flex flex-col md:flex-row gap-12 items-start ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Info */}
              <div className="w-full md:w-1/6">
                <h1 className="text-2xl font-light mb-4">
                  {photo.desc}
                </h1>

                <p className="italic tracking-widest opacity-70 mb-4">
                  {photo.location} {photo.year}
                </p>

                {photo.featuredText && (
                  <p className="leading-loose normal-case tracking-wider">
                    {photo.featuredText}
                  </p>
                )}
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="opacity-60 hover:opacity-100 transition text-xl py-4"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
              </div>
              {/* Photo */}
              <div className="relative w-full md:w-5/6 h-[80vh] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.desc}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Transition>
  );
}

export default Featured;
