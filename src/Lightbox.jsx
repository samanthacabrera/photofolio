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
    >

      {/* MOBILE */}
      <div className="md:hidden absolute inset-0">
        <img
          src={activePhoto.src}
          alt=""
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* DESKTOP */}
      <div
        className="hidden md:flex absolute inset-0 items-center justify-center overflow-hidden px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-10 transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)]"
          style={{
            transform: `translateX(calc(50% - ${activeIndex * 640 + 300}px))`
          }}
        >
          {photos.map((photo, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={photo.id}
                className="flex-shrink-0 flex justify-center"
                style={{ width: "600px" }}
              >
                <img
                  src={photo.src}
                  alt=""
                  onClick={() => setActiveIndex(index)}
                  className={`
                    w-full object-cover rounded-sm cursor-pointer
                    transition-all duration-500 ease-out
                    ${isActive
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-40 hover:opacity-70"}
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>
   

      {/* Country + Year */}
      <p className="absolute top-4 inset-x-0 text-center text-sm tracking-[0.35em] text-white/90">
        {activePhoto.country} {activePhoto.year}
      </p>

      {/* Count */}
      <p className="absolute bottom-4 inset-x-0 text-center text-sm tracking-[0.35em] text-white/90">
        {activeIndex + 1} / {photos.length}
      </p>

      {/* Exit Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-3xl text-white/90 hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
}

export default Lightbox;