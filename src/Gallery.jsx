import { useEffect, useRef, useState } from "react";
import photos from "./photos";

function groupPhotosByLocationAndYear(photos) {
  return photos.reduce((acc, photo) => {
    const key = `${photo.location}-${photo.year}`;
    if (!acc[key]) {
      acc[key] = {
        location: photo.location,
        year: photo.year,
        photos: [],
      };
    }
    acc[key].photos.push(photo);
    return acc;
  }, {});
}

function Gallery() {
  const [activeGroupKey, setActiveGroupKey] = useState(null);
  const [showLocation, setShowLocation] = useState(true);

  const scrollRef = useRef(null);

  const groupedPhotos = groupPhotosByLocationAndYear(photos);
  const sortedGroups = Object.values(groupedPhotos).sort(
    (a, b) => b.year - a.year
  );

  // ✅ Set initial location immediately
  useEffect(() => {
    if (sortedGroups.length > 0) {
      const first = sortedGroups[0];
      setActiveGroupKey(`${first.location}-${first.year}`);
    }
  }, [sortedGroups]);

  // ✅ Update active group based on horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleHorizontalScroll = () => {
      const scrollX = el.scrollLeft;
      const groupWidth = el.scrollWidth / sortedGroups.length;
      const index = Math.floor(scrollX / groupWidth);
      const group = sortedGroups[index];

      if (group) {
        setActiveGroupKey(`${group.location}-${group.year}`);
      }
    };

    el.addEventListener("scroll", handleHorizontalScroll);
    return () => el.removeEventListener("scroll", handleHorizontalScroll);
  }, [sortedGroups]);

  useEffect(() => {
    const handleVerticalScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setShowLocation(progress <= 0.75);
    };

    window.addEventListener("scroll", handleVerticalScroll);
    handleVerticalScroll();

    return () => window.removeEventListener("scroll", handleVerticalScroll);
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="flex items-center w-full h-full justify-start overflow-x-auto no-scrollbar"
      >
        <div className="flex gap-16 items-start px-4 min-w-max">
          {sortedGroups.map((group) => (
            <div
              key={`${group.location}-${group.year}`}
              className="flex-shrink-0 flex flex-col gap-8"
            >
              <div className="flex gap-8">
                {group.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="flex-shrink-0 relative pt-[13vh]"
                  >
                    <img
                      src={photo.src}
                      alt={photo.desc}
                      className="w-[85vw] h-[80vh] object-cover rounded-sm"
                      onClick={() => handleClick(photo.id)}
                    />
                    <div>
                      <span className="italic">{photo.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeGroupKey && showLocation && (
        <div className="fixed top-4 right-4 z-40 pointer-events-none">
          <h2 className="text-2xl md:text-4xl font-light tracking-wide uppercase">
            {activeGroupKey.split("-")[0]}{" "}
            <span className="text-gray-400">
              {activeGroupKey.split("-")[1]}
            </span>
          </h2>
        </div>
      )}
    </>
  );
}

export default Gallery;
