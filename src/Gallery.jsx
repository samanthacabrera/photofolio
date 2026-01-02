import { useEffect, useRef, useState } from "react";
import photos from "./photos";

function groupPhotosByLocationAndYear(photos) {
  return photos.reduce((acc, photo) => {
    const key = `${photo.location}-${photo.year}`;
    if (!acc[key]) acc[key] = { location: photo.location, year: photo.year, photos: [] };
    acc[key].photos.push(photo);
    return acc;
  }, {});
}

function Gallery() {
  const [activeGroupKey, setActiveGroupKey] = useState(null);
  const scrollRef = useRef(null);
  const groupRefs = useRef({});

  const groupedPhotos = groupPhotosByLocationAndYear(photos);
  const sortedGroups = Object.values(groupedPhotos).sort((a, b) => b.year - a.year);

  useEffect(() => {
    if (!scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveGroupKey(entry.target.dataset.key);
          }
        });
      },
      {
        root: scrollRef.current,   
        threshold: 0.1,
      }
    );

    Object.values(groupRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); 

  return (
    <>
    <div ref={scrollRef} className="flex items-center w-full h-full justify-start overflow-x-auto no-scrollbar">
      <div className="flex gap-16 items-start px-4 min-w-max">
        {sortedGroups.map((group) => (
          <div
            ref={(el) => (groupRefs.current[`${group.location}-${group.year}`] = el)}
            data-key={`${group.location}-${group.year}`}
            key={`${group.location}-${group.year}`}
            className="flex-shrink-0 flex flex-col gap-8"
          >
            <div className="flex gap-8">
              {group.photos.map((photo) => {
                return (
                  <div
                    key={photo.id}
                    className="flex-shrink-0 relative pt-[10vh]"
                  >
                    <img
                      src={photo.src}
                      alt={photo.desc}
                      className="w-[90vw] h-[90vh] object-cover rounded-sm"
                      onClick={() => handleClick(photo.id)}
                    />
                    <div
                    >
                    <span className="italic">{photo.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
    {activeGroupKey && (
      <div className="fixed top-4 right-4 z-40">
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
