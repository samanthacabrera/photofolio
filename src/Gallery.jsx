import { useMemo, useRef, useState, useEffect } from "react";
import photos from "./photos";
import Lightbox from "./Lightbox";

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
        <span className="text-white/90 text-sm tracking-widest">
          {photo.location}
        </span>
        <span className="text-white/80 text-sm tracking-widest">
          {photo.year}
        </span>
      </div>
    </div>
  );
}

function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const flatPhotos = useMemo(() => [...photos].reverse(), []);

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
        className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:max-w-[92rem] md:mx-auto">
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
