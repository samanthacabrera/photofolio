import { useEffect, useMemo, useState } from "react";
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

  const sortedGroups = useMemo(() => {
    return Object.values(groupPhotosByLocationAndYear(photos)).sort(
      (a, b) => b.year - a.year
    );
  }, []);

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
    if (e.key === "ArrowRight") setActivePhotoIndex((prev) => (prev + 1) % flatPhotos.length);
    else if (e.key === "ArrowLeft") setActivePhotoIndex((prev) => (prev - 1 + flatPhotos.length) % flatPhotos.length);
    else if (e.key === "Escape") setLightboxOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, flatPhotos]);

  const activePhoto = flatPhotos[activePhotoIndex];

  return (
    <section className="min-h-screen snap-start">
          {sortedGroups.map(({ location, year, photos }) => (
            <div key={`${location}-${year}`}>
              <div className="flex flex-col">
                {photos.map(({ id, src, desc }) => (
                  <div key={id}>
                    <img
                      src={src}
                      alt={desc}
                      className="w-[60vw] h-[50vh] p-2 object-cover cursor-pointer"
                      onClick={() => handleClick(id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

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
