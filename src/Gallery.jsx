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
    <div className="max-w-6xl mx-auto p-4">
      {sortedGroups.map((group) => (
        <section key={`${group.location}-${group.year}`} className="mb-24">
          <h2 className="font-light text-2xl mb-6">
            {group.location} {group.year}
          </h2>

          <div className="grid grid-cols-1 gap-12">
            {group.photos.map((photo) => {
              const isActive = activePhotoId === photo.id;
              return (
                <div key={photo.id} className="cursor-pointer">
                  <img
                    src={photo.src}
                    alt={photo.desc}
                    className="w-full object-cover"
                    onClick={() => handleClick(photo.id)}
                  />
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isActive ? "max-h-40 mt-2 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
                    }`}
                  >
                    <p className="text-sm text-gray-700">📍{photo.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Gallery;
