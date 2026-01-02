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
    <div className="flex items-center w-full h-[80vh] justify-start overflow-x-auto no-scrollbar">
      <div className="flex gap-16 items-start px-1 min-w-max">
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
                    className="cursor-pointer flex-shrink-0 relative"
                  >
                    <img
                      src={photo.src}
                      alt={photo.desc}
                      className="w-[70vw] h-[70vh] object-cover rounded-sm shadow"
                      onClick={() => handleClick(photo.id)}
                    />
                    <div
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
