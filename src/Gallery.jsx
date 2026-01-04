import { useEffect, useMemo, useRef, useState } from "react";
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
  const [showLocation, setShowLocation] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollRef = useRef(null);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const photoWidth = el.querySelector("img")?.clientWidth || 1;
      const index = Math.round(el.scrollLeft / photoWidth);
      if (index >= 0 && index < flatPhotos.length) setActivePhotoIndex(index);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [flatPhotos]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShowLocation((window.scrollY / max || 0) <= 0.5);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activePhoto = flatPhotos[activePhotoIndex];

  return (
    <>
      <div
        ref={scrollRef}
        className="flex items-center w-full h-full justify-start overflow-x-auto scroll-snap-x snap-mandatory no-scrollbar"
      >
        <div className="flex gap-16 items-start min-w-max">
          {sortedGroups.map(({ location, year, photos }) => (
            <div key={`${location}-${year}`} className="flex-shrink-0 flex flex-col gap-8">
              <div className="flex gap-8">
                {photos.map(({ id, src, desc }) => (
                  <div key={id} className="snap-start flex-shrink-0 relative pt-[10vh]">
                    <img
                      src={src}
                      alt={desc}
                      className="w-screen h-[90vh] object-cover rounded-sm cursor-pointer"
                      onClick={() => handleClick(id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activePhoto && showLocation && (
        <>
        <div className="fixed top-4 left-4 z-40 pointer-events-none">
          <h2 className="text-xl font-light uppercase tracking-wider">
            {activePhoto.location} <span>{activePhoto.year}</span>  
          </h2>
        </div>
        <div className="fixed top-4 right-4 z-40 pointer-events-none">
          <h2 className="text-xl font-light uppercase tracking-wider">
            {activePhoto.desc}
          </h2>
        </div>
        </>
      )}

      {lightboxOpen && activePhoto && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-around">
          <img
            src={activePhoto.src}
            alt={activePhoto.desc}
            className="w-screen max-h-full object-cover"
          />
          <button
            className="absolute top-2 right-4 text-xl font-light bg-white px-2 rounded"
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}

export default Gallery;
