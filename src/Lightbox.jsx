import { useEffect, useState } from "react";

function Lightbox({ photos, activeIndex, setActiveIndex, onClose }) {
  const [phase, setPhase] = useState("idle");
  const [virtualIndex, setVirtualIndex] = useState(activeIndex);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const visibleRange = 5; 

  const getRealIndex = (i) =>
    ((i % photos.length) + photos.length) % photos.length;

  const activePhoto = photos[getRealIndex(virtualIndex)];

  useEffect(() => {
    setVirtualIndex(activeIndex);
  }, [activeIndex]);

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
        setVirtualIndex((v) => v + 1);
      } else if (e.key === "ArrowLeft") {
        setVirtualIndex((v) => v - 1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setActiveIndex(getRealIndex(virtualIndex));
  }, [virtualIndex]);

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
      setVirtualIndex((v) => v + 1);
    } else if (distance < -threshold) {
      setVirtualIndex((v) => v - 1);
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!activePhoto) return null;

  const visiblePhotos = [];

  for (let i = -visibleRange; i <= visibleRange; i++) {
    const index = virtualIndex + i;
    const photo = photos[getRealIndex(index)];

    visiblePhotos.push({
      photo,
      virtual: index,
      real: getRealIndex(index),
    });
  }

  return (
    <div
      className={`
        fixed inset-0 z-50
        transition-[opacity,backdrop-filter] duration-700 ease-out
        ${
          phase !== "idle"
            ? "opacity-100 bg-black/80 backdrop-blur-md"
            : "opacity-0 bg-black/0 backdrop-blur-0"
        }
      `}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile */}
      <div className="md:hidden absolute inset-0">
        <img
          src={activePhoto.src}
          alt=""
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* Desktop */}
      <div
        className="hidden md:flex absolute inset-0 items-center justify-center overflow-hidden px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-10 transition-transform duration-700 ease-[cubic-bezier(.19,1,.22,1)]">
          {visiblePhotos.map(({ photo, virtual }) => {
            const isActive = virtual === virtualIndex;

            return (
              <div
                key={`${photo.id}-${virtual}`}
                className={`flex-shrink-0 flex justify-center ${
                  isActive ? "" : "opacity-40 scale-75 hover:opacity-70"
                }`}
                style={{ width: "600px" }}
              >
                <img
                  src={photo.src}
                  alt=""
                  onClick={() => setVirtualIndex(virtual)}
                  className="w-full object-cover rounded-sm cursor-pointer transition-all duration-500 ease-out"
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
        {getRealIndex(virtualIndex) + 1} / {photos.length}
      </p>

      {/* Exit */}
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