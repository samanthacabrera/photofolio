import { useMemo, useRef, useState, useEffect } from "react";
import photos from "./photos";
import Lightbox from "./Lightbox";

const groupPhotosByLocationAndYear = (items) =>
  items.reduce((acc, { location, year, ...rest }) => {
    const key = `${location}-${year}`;
    acc[key] ??= { location, year, photos: [] };
    acc[key].photos.push({ location, year, ...rest });
    return acc;
  }, {});

function useScrollFade(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.opacity = entry.intersectionRatio;
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function GalleryItem({ photo, onClick }) {
  const ref = useRef(null);
  useScrollFade(ref);

  return (
    <div
      ref={ref}
      onClick={() => onClick(photo.id)}
      className="relative group cursor-pointer overflow-hidden bg-neutral-100 aspect-[3/2] opacity-0 transition-opacity duration-300 ease-out">
      <img
        src={photo.src}
        alt={photo.desc}
        className="w-full h-full object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full flex items-end space-x-1 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
        <span className="text-white/90 text-[10px] tracking-widest">
          {photo.location}
        </span>
        <span className="text-white/70 text-[10px] tracking-widest">
          {photo.year}
        </span>
      </div>
    </div>
  );
}

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

  return (
    <section id="gallery" data-title="Gallery" className="min-h-screen">
      <div
        className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4 md:max-w-[92rem] md:mx-auto">
        {flatPhotos.map((photo) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onClick={handleClick}
          />
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={flatPhotos}
          activeIndex={activePhotoIndex}
          setActiveIndex={setActivePhotoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}

export default Gallery;
