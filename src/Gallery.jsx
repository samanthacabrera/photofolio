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
      className="relative group cursor-pointer overflow-hidden bg-neutral-100 aspect-[3/2] opacity-0 hover:scale-95 transition-all duration-300 ease-out"
    >
      <img
        src={photo.src}
        alt={photo.city}
        loading="lazy"
        className="w-full h-full object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full flex items-end space-x-1 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 p-3">
        <span className="text-white/90 text-sm tracking-widest">{photo.country}</span>
        <span className="text-white/80 text-sm tracking-widest">{photo.year}</span>
      </div>
    </div>
  );
}

function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = useMemo(() => {
    const reversed = [...photos].reverse();
    return {
      landscape: reversed.filter((p) => p.category === "landscape"),
      macro: reversed.filter((p) => p.category === "macro"),
      architecture: reversed.filter((p) => p.category === "architecture"),
    };
  }, []);

  const allPhotos = useMemo(
    () => [...categories.landscape, ...categories.macro, ...categories.architecture],
    [categories]
  );

  const handleClick = (id) => {
    const index = allPhotos.findIndex((p) => p.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <div>
      {["landscape", "macro", "architecture"].map((cat) => (
        <section
          key={cat}
          id={cat} 
          data-title={cat.charAt(0).toUpperCase() + cat.slice(1)} 
          className="py-2 px-4 scroll-mt-12"
        >

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories[cat].map((photo) => (
              <GalleryItem key={photo.id} photo={photo} onClick={handleClick} />
            ))}
          </div>
        </section>
      ))}

      {lightboxOpen && (
        <Lightbox
          photos={allPhotos}
          activeIndex={activePhotoIndex}
          setActiveIndex={setActivePhotoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

export default Gallery;