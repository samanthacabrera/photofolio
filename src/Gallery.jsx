import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import photos from "./photos";
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

  const navigate = useNavigate();

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

  return (
    <section className="min-h-screen">
      {/* Filters */}
      <div className="flex gap-4 translate-y-[8vh] justify-center">
        <select
          className="border p-2 rounded"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {sortedGroups.map(({ location, year, photos }, index) => {
        const alignLeft = index % 2 === 0;
        const isSingle = photos.length === 1;

        return (
          <div key={`${location}-${year}`} className="pt-20 md:pt-32 px-4">
            <div className={`w-full my-4 ${alignLeft ? "text-left" : "text-right"}`}>
              <h2 className="text-2xl md:text-4xl font-light whitespace-nowrap">
                {location} {year}
              </h2>
            </div>

            {isSingle ? (
              <div className={`flex ${alignLeft ? "justify-start" : "justify-end"}`}>
                <div className="w-fit">
                  <img
                    src={photos[0].src}
                    alt={photos[0].desc}
                    className="max-w-[47vw] max-h-[90vh] object-cover cursor-pointer"
                    onClick={() => handleClick(photos[0].id)}
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {photos.map(({ id, src, desc }) => (
                  <div key={id}>
                    <img
                      src={src}
                      alt={desc}
                      className="w-full max-h-[90vh] object-cover cursor-pointer hover:scale-[101%] hover:opacity-90 transition-all duration-300"
                      onClick={() => handleClick(id)}
                    />
                  </div>
                ))}
                {photos.length % 2 !== 0 && <div />}
              </div>
            )}
          </div>
        );
      })}

      <button
        className="text-xs block mx-auto p-12 hover:underline hover:-translate-y-1 transition"
        onClick={() => navigate("/photofolio/")}
      >
        Back Home
      </button>

      {/* Lightbox */}
      {lightboxOpen && activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <img
            src={activePhoto.src}
            alt={activePhoto.desc}
            className="w-screen max-h-full object-cover"
          />

          <div className="absolute top-6 left-6 text-xs tracking-[0.3em] text-neutral-800 bg-white/20 py-1 px-1.5 rounded">
            {activePhotoIndex + 1} / {flatPhotos.length}
          </div>

          <div className="absolute top-6 text-xs tracking-wide text-neutral-800  tracking-[0.3em] bg-white/20 py-1 px-1.5 rounded">
              {activePhoto.location} {activePhoto.year}
          </div>
          
          <button
            className="absolute top-6 right-6 text-xs  text-neutral-800 bg-white/20 py-1 px-1.5 rounded hover:scale-110 transition duration-200"
            onClick={() => setLightboxOpen(false)}
          >
            x
          </button>
        </div>
      )}

      <ScrollToTop />
    </section>
  );
}

export default Gallery;
