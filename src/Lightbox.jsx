import { useEffect, useState } from "react";

function Lightbox({ photos, activeIndex, setActiveIndex, onClose }) {
  const activePhoto = photos[activeIndex];
  const [phase, setPhase] = useState("idle"); 
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => setPhase("backdrop"));
    const t = setTimeout(() => setPhase("content"), 180);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, []);

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
      className={`
        fixed inset-0 z-50
        transition-[opacity,backdrop-filter] duration-700 ease-out
        ${phase !== "idle"
          ? "opacity-100 bg-black/80 backdrop-blur-md"
          : "opacity-0 bg-black/0 backdrop-blur-0"}
      `}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          absolute inset-0
          transition-[clip-path,transform,opacity]
          duration-[1100ms]
          ease-[cubic-bezier(.19,1,.22,1)]
          ${phase === "content"
            ? "opacity-100 translate-y-0 [clip-path:inset(0%_0%_0%_0%)]"
            : "opacity-0 translate-y-6 [clip-path:inset(100%_0%_0%_0%)]"}
        `}
      >
        <img
          src={activePhoto.src}
          alt={activePhoto.desc}
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full object-contain select-none touch-pan-y
          md:w-screen md:h-screen md:object-cover md:px-6"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 md:bg-[#111211]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 md:bg-[#111211]" />

      {/* Location */}
      <div
        className={` absolute top-1 inset-x-0 text-center text-sm tracking-[0.35em] text-white/90
          transition-[opacity,transform] duration-500 delay-300
          ${phase === "content"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"}
        `}
      >
        {activePhoto.location} {activePhoto.year}
      </div>

      {/* Count */}
      <div
        className={`absolute bottom-2 inset-x-0 text-center text-sm tracking-[0.35em] text-white/90
          transition-[opacity,transform] duration-500 delay-400
          ${phase === "content"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"}
        `}
      >
        {activeIndex + 1} / {photos.length}
      </div>

      {/* Exit */}
      <button
        onClick={onClose}
        className={`absolute -top-2 right-2 text-3xl text-white/90
          transition-[opacity,transform] duration-300 delay-500
          ${phase === "content"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"}
          hover:opacity-70
        `}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default Lightbox;
