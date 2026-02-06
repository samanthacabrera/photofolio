import { useMemo, useState } from "react";
import photos from "./photos";
import Lightbox from "./Lightbox";
import Transition from "./Transition";

const groupPhotosByLocationAndYear = (items) =>
  items.reduce((acc, { location, year, ...rest }) => {
    const key = `${location}-${year}`;
    acc[key] ??= { location, year, photos: [] };
    acc[key].photos.push({ location, year, ...rest });
    return acc;
  }, {});

function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [layoutValue, setLayoutValue] = useState(2);

  const sortedGroups = useMemo(() => {
    return Object.values(groupPhotosByLocationAndYear(photos)).sort(
      (a, b) => b.year - a.year
    );
  }, []);

  const flatPhotos = useMemo(
    () => sortedGroups.flatMap((g) => g.photos),
    [sortedGroups]
  );

  const handleClick = (id) => {
    const index = flatPhotos.findIndex((p) => p.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
      setLightboxOpen(true);
    }
  };

  const galleryGridMap = {
    1: "md:grid-cols-1 md:gap-4 md:max-w-xl md:mx-auto",
    2: "md:grid-cols-2 md:gap-2 md:max-w-3xl md:mx-auto",
    3: "md:grid-cols-3 md:gap-2 md:max-w-4xl md:mx-auto",
    4: "md:grid-cols-4 md:gap-2 md:max-w-6xl md:mx-auto",
  };

  return (
    <Transition>
      <section
        id="gallery"
        data-title="Gallery"
        className="min-h-screen"
      >
        <div className="relative h-fit w-full flex flex-col items-center justify-end pb-20">
          <div className="flex flex-col items-center gap-4">
            {/* <p className="text-2xl md:text-4xl tracking-[0.30em] opacity-70">
              Gallery
            </p> */}
          <nav className="hidden md:flex justify-center gap-6 mt-6">
            {[1, 2, 3, 4].map((val) => (
              <button
                key={val}
                onClick={() => setLayoutValue(val)}
                aria-label={`Set gallery density ${val}`}
                className="relative w-2 h-2 rounded-full transition-all"
              >
                <span
                  className={`
                    block w-full h-full rounded-full
                    ${layoutValue === val
                      ? "bg-white scale-125"
                      : "bg-white/30 hover:bg-white/60"}
                    transition-all duration-300
                  `}
                />
              </button>
            ))}
          </nav>
          </div>
        </div>

        {/* Gallery */}
        <div
          className={`grid w-full gap-4 p-4 md:p-0 ${galleryGridMap[layoutValue]}`}
        >
          {flatPhotos.map(({ id, src, desc, location, year }) => (
            <div
              key={id}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => handleClick(id)}
            >
              <img
                src={src}
                alt={desc}
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div
                className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 
                          flex items-end p-2 justify-start text-white/80 text-sm md:text-base 
                          font-semibold transition-opacity duration-300"
              >
                <span className="tracking-wide">
                  {location} {year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            photos={flatPhotos}
            activeIndex={activePhotoIndex}
            setActiveIndex={setActivePhotoIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </section>
    </Transition>

  );
}

export default Gallery;

