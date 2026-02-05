import { useEffect, useState } from "react";

function Lightbox({ photos, activeIndex, setActiveIndex, onClose }) {
  const activePhoto = photos[activeIndex];
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex(
          (prev) => (prev - 1 + photos.length) % photos.length
        );
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photos.length, setActiveIndex, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    const threshold = 50;

    if (distance > threshold) {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    } else if (distance < -threshold) {
      setActiveIndex(
        (prev) => (prev - 1 + photos.length) % photos.length
      );
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!activePhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={activePhoto.src}
        alt={activePhoto.desc}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full h-full object-contain
          select-none touch-pan-y
          md:w-screen md:h-screen md:object-cover
        "
      />

      <div className="absolute top-4 left-2 text-xs tracking-[0.3em] text-neutral-300 md:text-neutral-800 bg-white/20 py-1 px-1.5 rounded">
        {activeIndex + 1} / {photos.length}
      </div>

      <div className="absolute top-4 text-xs tracking-[0.3em] text-neutral-300 md:text-neutral-800 bg-white/20 py-1 px-1.5 rounded">
        {activePhoto.location} {activePhoto.year}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-2 text-xs text-neutral-300 md:text-neutral-800 bg-white/20 py-2 px-3 rounded hover:scale-110 transition duration-200"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default Lightbox;
