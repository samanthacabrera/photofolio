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
  const [layoutValue, setLayoutValue] = useState(1);

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
    1: "md:grid-cols-2",
    2: "md:grid-cols-3",
    3: "md:grid-cols-4",
  };

  return (
    <Transition>
      <section
        id="gallery"
        className="min-h-screen mx-6 py-24 flex flex-col gap-32"
      >
        <p className="pt-20 text-center text-4xl max-w-2xl mx-auto leading-loose tracking-widest italic">
          A complete archive <br/> of my work
        </p>

        {/* Slider */}
        <div className="flex flex-col items-center gap-24">
          <div className="hidden md:flex flex-col items-center gap-1 text-center">
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={layoutValue}
              onChange={(e) => setLayoutValue(Number(e.target.value))}
              className="mt-2 w-40 h-1 rounded-full bg-white/50 accent-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/80 focus:outline-none"
              style={{ WebkitAppearance: "none", appearance: "none" }}
            />
          </div>

          {/* Gallery */}
          <div
            className={`grid gap-2 w-full max-w-7xl ${galleryGridMap[layoutValue]}`}
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
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[101%]"
                />
                <div
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                            flex items-center justify-center text-white text-sm md:text-base 
                            font-semibold transition-opacity duration-300"
                >
                  <span className="tracking-wide">
                    {location} {year}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
