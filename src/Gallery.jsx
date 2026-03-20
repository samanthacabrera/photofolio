import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import photos from "./photos";
import Lightbox from "./Lightbox";
import Filter from "./Filter";

function GalleryItem({ photo, hoveredId, setHoveredId, onClick }) {
  const isActive = hoveredId === photo.id;

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
      .filter((photo) => {
        return Object.keys(selectedFilters).every((field) => {
          if (selectedFilters[field] === "all") return true;
          if (field === "featured")
            return photo[field] === (selectedFilters[field] === "true");
          return photo[field] === selectedFilters[field];
        });
      })
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
      <Filter
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <div className="w-full flex justify-center">
        <div className="w-full md:w-2/3">
          {filteredPhotos.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-4"
            >
              {filteredPhotos.map((photo) => (
                <GalleryItem
                  key={photo.id}
                  photo={photo}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                  onClick={handleClick}
                />
              ))}
            </motion.div>
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