import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import photos from "./photos";
import Lightbox from "./Lightbox";
import Header from "./Header";

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

function GalleryItem({ photo, onClick, isMdUp }) {
  const info = `${photo.city}   ${photo.year}`;

  if (!isMdUp) {
    return (
      <div
        onClick={() => onClick(photo.id)}
        className="relative flex flex-col space-y-4 my-1 mx-4"
      >
        <img
          src={photo.src}
          alt={photo.city}
          className="w-full h-full object-cover"
        />
        <p className="text-white/70 font-light tracking-[0.2em] italic">
          {info}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      onClick={() => onClick(photo.id)}
      className="relative cursor-pointer overflow-hidden group"
      whileHover={{ scale: 0.995 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={photo.src}
        alt={photo.city}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <div className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/80 italic">
          {info}
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMdUp = useIsMdUp();
  const [showCategoryGrid, setShowCategoryGrid] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    year: "all",
    country: "all",
  });

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

  const handleCategoryClick = (category) => {
    setSelectedFilters((prev) => ({
      ...prev,
      category,
    }));
    setShowCategoryGrid(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const categories = ["macro", "landscape", "architecture", "all"];

  return (
    <div>
      <Header
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <div className="min-h-[70vh] w-full flex justify-center">
        {isMdUp && showCategoryGrid ? (
          <div className="w-full md:w-2/3 flex flex-col">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer py-10 border-b border-white/10 flex items-baseline justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-white/80 tracking-[0.3em]">
                    0{index + 1}
                  </span>
                  <span className="text-white/80 text-lg md:text-xl tracking-[0.2em] uppercase font-light hover:text-white hover:tracking-[0.2rem] transition-all duration-500">
                    {category}
                  </span>
                </div>

                <div className="h-px w-12 bg-white/20 group-hover:w-24 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full md:w-2/3">
            {filteredPhotos.length > 0 ? (
              <div
                className={`grid gap-2 md:gap-6 ${
                  isMdUp
                    ? "md:grid-cols-2 auto-rows-auto"
                    : "grid-cols-1 auto-rows-auto"
                }`}
              >
                {filteredPhotos.map((photo) => (
                  <GalleryItem
                    key={photo.id}
                    photo={photo}
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
        )}
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