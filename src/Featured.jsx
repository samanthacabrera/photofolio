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

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (layoutValue === 2) {
      setOpenId(null); 
    }
  }, [layoutValue]);

  return (
    <>
      <Transition>
        <section
          id="featured"
          className="flex flex-col min-h-screen max-w-7xl mx-6 md:mx-auto py-12">
          
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
                  const isLeft = clickX < rect.width / 2;
                  const newLayout = isLeft ? 1 : 2;
                  setLayoutValue(newLayout);
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
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                  touchAction: "pan-x",
                }}
              />
            </div>
            <button
              onClick={() => {
                setLayoutValue(2);
              }}
              className={`text-xs uppercase tracking-widest transition-opacity ${
                layoutValue === 2 ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              Compact
            </button>
          </div>

          {/* Grid */}
          <ul className={`w-full gap-6 ${
              isCompact
                ? "grid grid-cols-1 gap-6" 
                : "flex flex-col gap-60 py-12" 
            }`}>
            {featuredPhotos.map((photo, index) => {
              const isOpen = openId === photo.id;
              const expandedActive = !isCompact || isOpen;
              const reverse = !isCompact && index % 2 === 1; 

              return (
                <li key={photo.id} className="pb-12">
                  <div
                    className={`flex transition-all duration-500 ease-in-out ${
                      isCompact && isOpen
                        ? "flex-col gap-6"
                        : expandedActive
                        ? "gap-10"
                        : "gap-6"
                    } ${reverse && !isCompact ? "md:flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedActive
                          ? "w-full h-[75vh]"
                          : "w-64 h-48 shrink-0"
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.desc}
                        className={`h-full object-cover
                          ${(isCompact && isOpen)
                              ? "w-full md:w-3/4 mx-auto" 
                              : "w-full" 
                          }`}
                      />
                    </div>
                    {!(isCompact && isOpen) && (
                      <div
                        className={`flex flex-col transition-all duration-500 ease-in-out
                          ${isCompact
                              ? "w-full" 
                              : "w-full md:w-1/5" 
                          }`}
                      >
                        <p
                          className={`uppercase tracking-widest opacity-60 mb-2 ${
                            expandedActive && !isCompact ? "text-sm" : "text-xs"
                          }`}
                        >
                          {photo.location} {photo.year}
                        </p>

                        <h3 className="tracking-widest font-medium mb-4">
                          {photo.desc}
                        </h3>

                        {!isCompact && photo.featuredText && (
                          <p className="normal-case text-sm md:text-base tracking-wide leading-loose">
                            {photo.featuredText}
                          </p>
                        )}

                        {photo.featuredText && isCompact && (
                          <button
                            onClick={() => toggle(photo.id)}
                            className="self-start text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                          >
                            Read more
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Compact mode */}
                  {photo.featuredText && isCompact && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`flex flex-col items-center md:w-3/4 mx-auto mt-6
                        ${isOpen ? "flex" : "hidden"}`}
                    >
                      <p className="uppercase tracking-widest opacity-60 mb-2 text-center">
                        {photo.location} {photo.year}
                      </p>
                      <h3 className="tracking-widest font-medium mb-4 text-center">
                        {photo.desc}
                      </h3>
                      <p className="normal-case text-sm md:text-base tracking-wide leading-loose text-center">
                        {photo.featuredText}
                      </p>
                      <button
                        onClick={() => toggle(photo.id)}
                        className="mt-4 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                      >
                        Close
                      </button>
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
