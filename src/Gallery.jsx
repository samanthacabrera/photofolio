import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import photos from "./photos";
import Lightbox from "./Lightbox";
import Filter from "./Filter";

function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMdUp(window.innerWidth >= 768); 
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMdUp;
}

function GalleryItem({ photo, hoveredId, setHoveredId, onClick, isMdUp }) {
  const isActive = hoveredId === photo.id;

  if (!isMdUp) {
    return (
      <div
        onClick={() => onClick(photo.id)}
        className="relative cursor-pointer overflow-hidden rounded-lg my-1 mx-4"
      >
        <img
          src={photo.src}
          alt={photo.city}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <motion.div
      layout
      onMouseEnter={() => setHoveredId(photo.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onClick(photo.id)}
      className="relative cursor-pointer overflow-hidden rounded-lg"
      style={{
        gridColumn: isActive ? "span 2" : "span 1",
        gridRow: isActive ? "span 2" : "span 1",
      }}
      transition={{
        layout: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
    >
      <img
        src={photo.src}
        alt={photo.city}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const galleryRef = useRef(null);
  const isMdUp = useIsMdUp();

  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    year: "all",
    country: "all",
  });

  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowFilter(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -300px 0px" }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const filters = useMemo(
    () => ({
      year: [...new Set(photos.map((p) => p.year))],
      category: [...new Set(photos.map((p) => p.category))],
      country: [...new Set(photos.map((p) => p.country))],
    }),
    []
  );

  const filteredPhotos = useMemo(() => {
    return photos
      .filter((photo) =>
        Object.keys(selectedFilters).every((field) => {
          if (selectedFilters[field] === "all") return true;
          if (field === "featured")
            return photo[field] === (selectedFilters[field] === "true");
          return photo[field] === selectedFilters[field];
        })
      )
      .reverse();
  }, [selectedFilters]);

  const handleClick = (id) => {
    const index = filteredPhotos.findIndex((p) => p.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <div>
      <h1 className="group text-center m-1 pb-6 md:pb-20 text-2xl md:text-3xl tracking-[0.4em] font-light"
      >
        <span className="inline-block transition-all duration-700 group-hover:tracking-[0.6em]">
          JM
        </span>
        <span className="ml-3 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
          Photography
        </span>
      </h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: showFilter ? 1 : 0,
          y: showFilter ? 0 : -20,
          pointerEvents: showFilter ? "auto" : "none",
        }}
        transition={{ duration: 0.4 }}
      >
        <Filter
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </motion.div>

      <div className="w-full flex justify-center">
        <div className="w-full md:w-2/3">
          {filteredPhotos.length > 0 ? (
            <div
              ref={galleryRef}
              className={`grid gap-4 ${
                isMdUp
                  ? "md:grid-cols-3 auto-rows-[220px]"
                  : "grid-cols-1 auto-rows-auto"
              }`}
            >
              {filteredPhotos.map((photo) => (
                <GalleryItem
                  key={photo.id}
                  photo={photo}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onClick={handleClick}
                  isMdUp={isMdUp}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/30 text-lg tracking-wide font-light">
              No photos match your selected filters.
            </div>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={filteredPhotos}
          activeIndex={activePhotoIndex}
          setActiveIndex={setActivePhotoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}