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
        loading="lazy"
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
  const [selectedCategory, setSelectedCategory] = useState("landscape");

  const flatPhotos = useMemo(() => {
    return [...photos]
      .reverse()
      .filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  const mobilePhotos = useMemo(() => {
    const reversed = [...photos].reverse();
    const landscapes = reversed.filter(
      (photo) => photo.category === "landscape"
    );
    const macro = reversed.filter(
      (photo) => photo.category === "macro"
    );
    const architecture = reversed.filter(
      (photo) => photo.category === "architecture"
    );
    return [...landscapes, ...macro, ...architecture,];
  }, []);

  const handleClick = (id, source) => {
    const sourceArray = source === "mobile" ? mobilePhotos : flatPhotos;
    const index = sourceArray.findIndex((p) => p.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <section id="gallery" data-title="Gallery" className="min-h-screen">
      <div className="hidden sm:flex w-full">
        <div className="flex items-center gap-4 ml-8 text-lg tracking-[0.25em]">
          <button
            onClick={() => setSelectedCategory("landscape")}
            className="relative uppercase transition-all duration-500"
          >
            <span
              className={`transition-opacity duration-500 ${
                selectedCategory === "landscape"
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              Landscape
            </span>
          </button>
           <button
            onClick={() => setSelectedCategory("architecture")}
            className="relative uppercase transition-all duration-500"
          >
            <span
              className={`transition-opacity duration-500 ${
                selectedCategory === "architecture"
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              Architecture
            </span>
          </button>
          <button
            onClick={() => setSelectedCategory("macro")}
            className="relative uppercase transition-all duration-500"
          >
            <span
              className={`transition-opacity duration-500 ${
                selectedCategory === "macro"
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              Macro
            </span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:hidden">
        {mobilePhotos.map((photo) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onClick={(id) => handleClick(id, "mobile")}
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid w-full gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:max-w-[92rem] md:mx-auto">
        {flatPhotos.map((photo) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            onClick={(id) => handleClick(id, "desktop")}
          />
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={
            typeof window !== "undefined" && window.innerWidth < 640
              ? mobilePhotos
              : flatPhotos
          }
          activeIndex={activePhotoIndex}
          setActiveIndex={setActivePhotoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}

export default Gallery;
