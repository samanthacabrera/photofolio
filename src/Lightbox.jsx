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
        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
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
      setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!activePhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
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
        className="w-full h-full object-contain select-none touch-pan-y md:w-screen md:h-screen md:object-cover md:px-6"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 md:bg-[#111211]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 md:bg-[#111211]" />

      <div className="absolute top-1 inset-x-0 text-center text-sm tracking-[0.35em] text-white/90">
        {activePhoto.location} {activePhoto.year}
      </div>

      <div className="absolute bottom-2 inset-x-0 text-center text-sm tracking-[0.35em] text-white/90">
        {activeIndex + 1} / {photos.length}
      </div>

      <button
        onClick={onClose}
        className="absolute -top-2 right-2 md:right-2 text-3xl text-white/90 hover:opacity-70 transition"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default Lightbox;
