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
      whileHover={{ scale: 0.99 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={photo.src}
        alt={photo.city}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:bg-black/30 transition-opacity duration-500 flex items-end p-4 italic">
        <div className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white">
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

  const categoryTiles = [
    {
      key: "all",
      label: "All",
      photo: "/photofolio/public/ireland/DSC04136.JPG",
    },
    {
      key: "macro",
      label: "Macro",
      photo: "/photofolio/public/macro/DSC01025.JPG",
    },
    {
      key: "landscape",
      label: "Landscape",
      photo: "/photofolio/public/portugal/DSC02552.JPG",
    },
    {
      key: "architecture",
      label: "Architecture",
      photo: "/photofolio/public/architecture/DSC01396.JPG",
    },
  ];

  return (
    <div>
      <Header
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <div className="min-h-[70vh] w-full flex justify-center">
        {isMdUp && showCategoryGrid ? (
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {categoryTiles.map((tile) => (
              <div
                key={tile.key}
                onClick={() => handleCategoryClick(tile.key)}
                className="relative cursor-pointer overflow-hidden group h-48 md:h-96 hover:scale-[0.99] tranisition duration-300"
              >
                <img
                  src={tile.photo}
                  alt={tile.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-lg tracking-[0.3em] uppercase">
                    {tile.label}
                  </span>
                </div>
              </div>
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