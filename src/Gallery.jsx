import { useState } from "react";
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
  const [activePhotoId, setActivePhotoId] = useState(null);

  const handleClick = (id) => {
    setActivePhotoId(activePhotoId === id ? null : id);
  };

  const groupedPhotos = groupPhotosByLocationAndYear(photos);
  const sortedGroups = Object.values(groupedPhotos).sort((a, b) => b.year - a.year);

  return (
    <div className="w-full h-[80vh] -translate-x-[25vw] overflow-x-auto no-scrollbar py-12">
      <div className="flex gap-16 items-start px-4">
        {sortedGroups.map((group) => (
          <div
            key={`${group.location}-${group.year}`}
            className="flex-shrink-0 flex flex-col gap-8"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-wide uppercase transform whitespace-nowrap">
              {group.location} <span className="text-gray-400">{group.year}</span>
            </h2>

            <div className="flex gap-8">
              {group.photos.map((photo, idx) => {
                const isActive = activePhotoId === photo.id;
                return (
                  <div
                    key={photo.id}
                    className="cursor-pointer flex-shrink-0 relative w-[60vw] md:w-[35vw] transform transition-transform duration-500 hover:scale-105"
                  >
                    <img
                      src={photo.src}
                      alt={photo.desc}
                      className="w-full h-full object-cover rounded-sm shadow"
                      onClick={() => handleClick(photo.id)}
                    />
                    <div
                      className={`absolute bottom-4 left-4 right-4 bg-white/80 rounded-sm p-2 text-sm transition-all duration-300 ${
                        isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      📍 {photo.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
