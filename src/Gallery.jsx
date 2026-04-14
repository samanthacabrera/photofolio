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
      className="relative cursor-pointer overflow-hidden rounded-lg"
      whileHover={{ scale: 1.02 }}
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
  const galleryRef = useRef(null);
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
      <h1 className="group text-center m-1 pt-6 pb-6 md:pb-20 text-xl md:text-2xl tracking-[0.4em] font-light">
        <span className="inline-block transition-all duration-700 group-hover:tracking-[0.6em]">
          JM
        </span>
        <span className="ml-3 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
          Photography
        </span>
      </h1>
      <motion.div>
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
              className={`grid gap-6 ${
                isMdUp
                  ? "md:grid-cols-4 auto-rows-auto"
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