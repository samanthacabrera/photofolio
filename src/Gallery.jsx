import { useEffect, useMemo, useRef, useState } from "react";
import photos from "./photos";

const groupPhotosByLocationAndYear = (items) =>
  items.reduce((acc, { location, year, ...rest }) => {
    const key = `${location}-${year}`;
    acc[key] ??= { location, year, photos: [] };
    acc[key].photos.push({ location, year, ...rest });
    return acc;
  }, {});

function Gallery() {
  const [activeGroupKey, setActiveGroupKey] = useState(null);
  const [showLocation, setShowLocation] = useState(true);
  const scrollRef = useRef(null);

  const sortedGroups = useMemo(() => {
    return Object.values(groupPhotosByLocationAndYear(photos)).sort(
      (a, b) => b.year - a.year
    );
  }, []);

  useEffect(() => {
    if (sortedGroups.length) {
      const { location, year } = sortedGroups[0];
      setActiveGroupKey(`${location}-${year}`);
    }
  }, [sortedGroups]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const index = Math.floor(
        el.scrollLeft / (el.scrollWidth / sortedGroups.length)
      );
      const group = sortedGroups[index];
      if (group) setActiveGroupKey(`${group.location}-${group.year}`);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [sortedGroups]);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setShowLocation((window.scrollY / max || 0) <= 0.10);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="flex items-center w-full h-full justify-start overflow-x-auto no-scrollbar"
      >
        <div className="flex gap-16 items-start px-4 min-w-max">
          {sortedGroups.map(({ location, year, photos }) => (
            <div
              key={`${location}-${year}`}
              className="flex-shrink-0 flex flex-col gap-8"
            >
              <div className="flex gap-8">
                {photos.map(({ id, src, desc }) => (
                  <div
                    key={id}
                    className="flex-shrink-0 relative pt-[13vh]"
                  >
                    <img
                      src={src}
                      alt={desc}
                      className="w-[85vw] h-[80vh] object-cover rounded-sm"
                      onClick={() => handleClick(id)}
                    />
                    <p className="uppercase text-sm tracking-[0.35em] pt-2">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeGroupKey && showLocation && (
        <div className="fixed top-4 right-4 z-40 pointer-events-none">
          <h2 className="text-4xl font-light uppercase tracking-wider">
            {activeGroupKey.split("-")[0]}{" "}
            <span className="">
              {activeGroupKey.split("-")[1]}
            </span>
          </h2>
        </div>
      )}
    </>
  );
}

export default Gallery;
