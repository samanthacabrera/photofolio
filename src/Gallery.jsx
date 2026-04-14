import { useMemo, useState, useEffect, useRef } from "react";
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
  if (!isMdUp) {
    return (
      <div
        onClick={() => onClick(photo.id)}
        className="relative cursor-pointer overflow-hidden rounded my-1 mx-4"
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
      onClick={() => onClick(photo.id)}
      className="relative cursor-pointer overflow-hidden"
      whileHover={{ scale: 0.98, opacity: 0.90 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMdUp = useIsMdUp();

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

  return (
    <div>
      <Header
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <div className="min-h-[70vh] w-full flex justify-center">
        <div className="w-full md:w-2/3">
          {filteredPhotos.length > 0 ? (
            <div
              className={`grid gap-6 ${
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