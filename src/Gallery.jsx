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

  const activePhoto = flatPhotos[activePhotoIndex];

  return (
    <>
      <div
        ref={scrollRef}
        className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        <div className="flex flex-col gap-24 items-start mt-[10vh] min-w-max z-20">
          {sortedGroups.map(({ location, year, photos }) => (
            <div key={`${location}-${year}`}>
              <div className="flex flex-col gap-[10vh]">
                {photos.map(({ id, src, desc }) => (
                  <div key={id} className="flex-shrink-0 snap-end relative z-20"
                  >
                    <img
                      src={src}
                      alt={desc}
                      className="w-screen h-[92vh] p-2 object-cover rounded-sm cursor-pointer"
                      onClick={() => handleClick(id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activePhoto && (
        <>
        <div className="fixed top-4 left-4 z-10 pointer-events-none">
          <h2 className="text-xl md:text-3xl font-light uppercase tracking-wider">
            {activePhoto.location} <span>{activePhoto.year}</span>  
          </h2>
        </div>
        <div className="fixed top-4 right-4 z-10 pointer-events-none">
          <h2 className="text-xl md:text-3xl font-light uppercase tracking-wider">
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
            className="absolute top-2 right-4 text-xl font-light bg-white/40 backdrop-blur-sm rounded-sm px-2 rounded"
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
