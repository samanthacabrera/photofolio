import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import photos from "./photos";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const groupPhotosByLocationAndYear = (items) =>
  items.reduce((acc, { location, year, ...rest }) => {
    const key = `${location}-${year}`;
    acc[key] ??= { location, year, photos: [] };
    acc[key].photos.push({ location, year, ...rest });
    return acc;
  }, {});

function Gallery({ darkMode, setDarkMode }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  const locations = useMemo(
    () => ["All", ...new Set(photos.map((p) => p.location))],
    []
  );
  const years = useMemo(
    () => ["All", ...new Set(photos.map((p) => p.year))],
    []
  );

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const locationMatch = filterLocation === "All" || p.location === filterLocation;
      const yearMatch = filterYear === "All" || p.year === Number(filterYear);
      return locationMatch && yearMatch;
    });
  }, [filterLocation, filterYear]);

  const sortedGroups = useMemo(() => {
    return Object.values(groupPhotosByLocationAndYear(filteredPhotos)).sort(
      (a, b) => b.year - a.year
    );
  }, [filteredPhotos]);

  const flatPhotos = useMemo(
    () => sortedGroups.flatMap((g) => g.photos),
    [sortedGroups]
  );

  const handleClick = (id) => {
    const index = flatPhotos.findIndex((p) => p.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === "ArrowRight")
      setActivePhotoIndex((prev) => (prev + 1) % flatPhotos.length);
    else if (e.key === "ArrowLeft")
      setActivePhotoIndex(
        (prev) => (prev - 1 + flatPhotos.length) % flatPhotos.length
      );
    else if (e.key === "Escape") setLightboxOpen(false);
  };

  useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, flatPhotos]);

    const activePhoto = flatPhotos[activePhotoIndex];

    useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <motion.section 
        id="gallery"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        className="flex flex-col items-center min-h-screen max-w-7xl mx-4 md:mx-auto">
      {/* Filters */}
      <div className="self-start pt-12 m-4 flex flex-col gap-6 md:gap-8 text-sm md:text-base">
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-widest">
            Location
          </span>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="bg-transparent border-b pb-1 focus:outline-none tracking-wide cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-widest">
            Year
          </span>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="bg-transparent border-b pb-1 focus:outline-none tracking-wide cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {sortedGroups.map(({ location, year, photos }, index) => {
        return (
          <div key={`${location}-${year}`} className="py-2">
            <div className="grid md:grid-cols-2 gap-4">
              {photos.map(({ id, src, desc }) => (
                <div
                  key={id}
                  className="relative group cursor-pointer overflow-hidden"
                  onClick={() => handleClick(id)}
                >
                  <img
                    src={src}
                    alt={desc}
                    className="w-full max-h-[90vh] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                              flex items-center justify-center text-white text-sm md:text-base 
                              font-semibold transition-opacity duration-300"
                  >
                    <span className="tracking-wide">{location} {year}</span>
                  </div>
                </div>
              ))}
              {photos.length % 2 !== 0 && <div />}
            </div>
          </div>
        );
      })}

      {/* Lightbox */}
      {lightboxOpen && activePhoto && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <img
            src={activePhoto.src}
            alt={activePhoto.desc}
            className="max-w-full max-h-full object-contain md:w-screen md:h-screen md:object-cover"
          />

          <div className="absolute top-4 left-2 text-xs tracking-[0.3em] text-neutral-300 md:text-neutral-800 bg-white/20 py-1 px-1.5 rounded">
            {activePhotoIndex + 1} / {flatPhotos.length}
          </div>

          <div className="absolute top-4 text-xs tracking-wide text-neutral-300 md:text-neutral-800  tracking-[0.3em] bg-white/20 py-1 px-1.5 rounded">
              {activePhoto.location} {activePhoto.year}
          </div>
          
          <button
            className="absolute top-4 right-2 text-xs text-neutral-300 md:text-neutral-800 bg-white/20 py-1 px-1.5 rounded hover:scale-110 transition duration-200"
            onClick={() => setLightboxOpen(false)}
          >
            x
          </button>
        </motion.div>
      )}
    </motion.section>
    <ScrollToTop />
    </>
  );
}

export default Gallery;
