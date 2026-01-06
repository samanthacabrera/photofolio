import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import photos from "./photos";

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
    <section className="min-h-screen p-6">
      <h1 className="sticky top-0 z-10 w-screen bg-white text-2xl md:text-4xl font-light my-12 py-4 text-center">
        Gallery
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-12 justify-center">
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
          <div key={`${location}-${year}`} className="mb-24">
            <div className={`w-full mb-8 ${alignLeft ? "text-left" : "text-right"}`}>
              <h2 className="text-6xl md:text-8xl whitespace-nowrap">
                {location} {year}
              </h2>
            </div>

            {isSingle ? (
              <div className={`flex ${alignLeft ? "justify-start" : "justify-end"}`}>
                <div className="w-fit">
                  <img
                    src={photos[0].src}
                    alt={photos[0].desc}
                    className="w-full max-h-[90vh] object-cover cursor-pointer"
                    onClick={() => handleClick(photos[0].id)}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-8">
                {photos.map(({ id, src, desc }) => (
                  <div key={id}>
                    <img
                      src={src}
                      alt={desc}
                      className="w-full max-h-[90vh] object-cover cursor-pointer"
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
        className="text-xs uppercase block mx-auto hover:underline hover:-translate-y-1 transition mb-6"
        onClick={() => navigate("/photofolio")}
      >
        Back Home
      </button>

      {/* Lightbox */}
      {lightboxOpen && activePhoto && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-around">
          <img
            src={activePhoto.src}
            alt={activePhoto.desc}
            className="w-screen max-h-full object-cover"
          />
          <button
            className="absolute top-2 right-4 text-xl font-light bg-white/40 backdrop-blur-sm rounded-sm px-2 rounded"
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}

export default Gallery;
