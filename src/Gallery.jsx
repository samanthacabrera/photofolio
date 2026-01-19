import { useEffect, useMemo, useState } from "react";
import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

const groupPhotosByLocationAndYear = (items) =>
  items.reduce((acc, { location, year, ...rest }) => {
    const key = `${location}-${year}`;
    acc[key] ??= { location, year, photos: [] };
    acc[key].photos.push({ location, year, ...rest });
    return acc;
  }, {});

function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [layoutValue, setLayoutValue] = useState(1);

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
    setActivePhotoIndex(0);
  }, [filterLocation, filterYear]);

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

  const galleryGridMap = {
    1: "md:grid-cols-2",
    2: "md:grid-cols-3",
    3: "md:grid-cols-4",
  };
  return (
    <>
    <Transition>
    <section id="gallery" className="flex flex-col items-center min-h-screen mx-4">
      <div className="flex flex-col md:flex-row justify-between items-center pt-20 px-4 w-full gap-6">
        {/* Filters */}
        <div className="flex flex-col flex-wrap gap-4 md:gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="uppercase tracking-widest">Year</span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() =>
                  setFilterYear((prev) => (prev === String(year) ? "All" : String(year)))
                }
                className={`px-3 py-1 rounded-full border transition-all duration-200 uppercase text-current text-xs md:text-sm hover:opacity-70
                  ${filterYear === String(year) ? "border-current" : "border-transparent"}
                `}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="uppercase tracking-widest">Location</span>
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() =>
                  setFilterLocation((prev) => (prev === loc ? "All" : loc))
                }
                className={`px-3 py-1 rounded-full border transition-all duration-200 uppercase text-current text-xs md:text-sm hover:opacity-70
                  ${filterLocation === loc ? "border-current" : "border-transparent"}
                `}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="hidden md:flex flex-shrink-0 mt-4 md:mt-0">
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={layoutValue}
            onChange={(e) => setLayoutValue(Number(e.target.value))}
            className="w-28 h-1 rounded-full bg-white/50 accent-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/80 focus:outline-none"
            style={{ WebkitAppearance: "none", appearance: "none" }}
          />
        </div>
      </div>

      {/* Gallery */}
      <div className="py-12">
        <div className={`grid gap-4 py-2 ${galleryGridMap[layoutValue]}`} >
          {flatPhotos.map(({ id, src, desc, location, year }) => (
            <div
              key={id}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => handleClick(id)}
            >
              <img
                src={src}
                alt={desc}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[101%]"
              />
              <div
                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
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

      {/* Lightbox */}
      {lightboxOpen && activePhoto && (
        <div 
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
        </div>
      )}
    </section>
    </Transition>
    <ScrollToTop />
    </>
  );
}

export default Gallery;
