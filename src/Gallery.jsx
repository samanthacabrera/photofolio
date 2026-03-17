import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import photos from "./photos";
import Lightbox from "./Lightbox";
import Filter from "./Filter";

function GalleryItem({ photo, index, hoveredId, setHoveredId, onClick }) {
  const isActive = hoveredId === photo.id;

  return (
    <motion.div
      layout
      onHoverStart={() => setTimeout(() => setHoveredId(photo.id), 120)}
      onHoverEnd={() => setHoveredId(null)}
      onClick={() => onClick(photo.id)}
      className="relative cursor-pointer overflow-hidden"
      style={{
        gridColumn: isActive ? "span 2" : "span 1",
        gridRow: isActive ? "span 2" : "span 1",
      }}
      transition={{
        layout: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.015,
        },
      }}
    >
      <motion.img
        src={photo.src}
        alt={photo.city}
        className="w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 flex items-end p-3 bg-black/20"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white text-xs tracking-widest">
          {photo.country} {photo.year}
        </span>
      </motion.div>
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

    const filters = useMemo(() => ({
      year: [...new Set(photos.map(p => p.year))],
      category: [...new Set(photos.map(p => p.category))],
      country: [...new Set(photos.map(p => p.country))],
    }), []);

    const filteredPhotos = useMemo(() => {
      return photos.filter(photo => {
        return Object.keys(selectedFilters).every(field => {
          if (selectedFilters[field] === "all") return true;
          if (field === "featured") return photo[field] === (selectedFilters[field] === "true");
          return photo[field] === selectedFilters[field];
        });
      }).reverse(); 
    }, [selectedFilters]);

    const handleClick = (id) => {
      const index = filteredPhotos.findIndex(p => p.id === id);
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

      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4"
      >
        {filteredPhotos.map((photo, i) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            index={i}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onClick={handleClick}
          />
        ))}
      </motion.div>

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