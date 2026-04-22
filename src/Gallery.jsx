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

function GalleryItem({ photo, onClick, isMdUp, index }) {
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

        <div className="flex justify-between text-[8px] tracking-[0.4em] uppercase text-white/70 px-1">
          <span>{photo.city}</span>
          <span>{photo.year}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      onClick={() => onClick(photo.id)}
      className="group cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={photo.src}
          alt={photo.city}
          className="w-full h-auto object-cover"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-500 flex items-end">
          <div className="flex justify-between items-between p-6 opacity-0 group-hover:opacity-100 transition duration-500 w-full">
            <div className="text-white/90 tracking-[0.4em] uppercase text-[8px]">
              {photo.city}
            </div>
            <div className="text-white/90 tracking-[0.4em] uppercase text-[8px]">
              {photo.year}
            </div>
          </div>
        </div>
      </div>
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
      .sort((a, b) => b.id - a.id);
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
        <div className="w-full md:w-[80%]">
          {filteredPhotos.length > 0 ? (
            isMdUp ? (
              <div className="md:columns-3 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <div key={photo.id} className="break-inside-avoid mb-4">
                    <GalleryItem
                      photo={photo}
                      onClick={handleClick}
                      isMdUp={isMdUp}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {filteredPhotos.map((photo, index) => (
                  <GalleryItem
                    key={photo.id}
                    photo={photo}
                    onClick={handleClick}
                    isMdUp={isMdUp}
                    index={index}
                  />
                ))}
              </div>
            )
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