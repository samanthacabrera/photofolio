import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function Featured() {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  const [openId, setOpenId] = useState(null);
  const [layoutValue, setLayoutValue] = useState(1);
  const isCompact = layoutValue === 2;

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  useEffect(() => {
    if (layoutValue === 2) setOpenId(null);
  }, [layoutValue]);

  return (
    <>
      <Transition>
        <section className="flex flex-col min-h-screen max-w-7xl mx-6 md:mx-auto py-12">

          {/* Layout Toggle */}
          <div className="hidden md:flex items-center w-fit gap-4 mb-12">
            <button
              onClick={() => setLayoutValue(1)}
              className={`text-xs uppercase tracking-widest transition-opacity ${
                layoutValue === 1 ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              Expanded
            </button>
            <div className="relative flex items-center w-24">
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setLayoutValue(clickX < rect.width / 2 ? 1 : 2);
                }}
              />
              <input
                type="range"
                min={1}
                max={2}
                step={1}
                value={layoutValue}
                onChange={(e) => setLayoutValue(Number(e.target.value))}
                className="w-24 h-1 rounded-full bg-white/50 accent-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/80 focus:outline-none relative z-20"
                style={{ WebkitAppearance: "none", appearance: "none", touchAction: "pan-x" }}
              />
            </div>
            <button
              onClick={() => setLayoutValue(2)}
              className={`text-xs uppercase tracking-widest transition-opacity ${
                layoutValue === 2 ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              Compact
            </button>
          </div>

          {/* Featured List */}
          <ul className="w-full flex flex-col gap-12 md:gap-60 py-6">
            {featuredPhotos.map((photo, index) => {
              const isOpen = openId === photo.id;
              const expandedActive = !isCompact || isOpen;
              const reverse = !isCompact && index % 2 === 1;

              return (
                <li key={photo.id} className="pb-12">
                  <div
                    className={`flex flex-col md:flex-row transition-all duration-500 ease-in-out ${
                      !isCompact && reverse ? "md:flex-row-reverse" : ""
                    } gap-6 md:gap-10`}
                  >
                    {/* Image */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out w-full md:w-3/4 ${
                        expandedActive ? "h-[75vh]" : "h-48 md:h-[75vh]"
                      }`}
                    >
                      <img src={photo.src} alt={photo.desc} className="h-full w-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col w-full md:w-1/4">
                      <p className="uppercase tracking-widest opacity-60 mb-2 text-sm md:text-xs">
                        {photo.location} {photo.year}
                      </p>
                      <h3 className="tracking-widest font-medium mb-4">{photo.desc}</h3>

                      {photo.featuredText && (
                        <>
                          <p className="hidden md:block normal-case text-sm md:text-base tracking-wide leading-loose">
                            {photo.featuredText}
                          </p>
                          <button
                            className="md:hidden self-start text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                            onClick={() => toggle(photo.id)}
                          >
                            {isOpen ? "Close" : "Read more"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {photo.featuredText && isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden mt-4 text-center"
                    >
                      <p className="normal-case text-sm tracking-wide leading-loose">{photo.featuredText}</p>
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </Transition>
      <ScrollToTop />
    </>
  );
}

export default Featured;
