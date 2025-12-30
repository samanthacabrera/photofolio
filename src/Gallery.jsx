const photos = [
  {
    id: 1,
    src: "/ireland/DSC04136.JPG",
    location: "Ireland",
    year: 2025,
    desc: "Cliffs along the Irish coast"
  },
  {
    id: 2,
    src: "/ireland/DSC03798.JPG",
    location: "Ireland",
    year: 2025,
    desc: "Morning light over a green field"
  },
  {
    id: 3,
    src: "/ireland/DSC04133.JPG",
    location: "Ireland",
    year: 2025,
    desc: "Old stone walls in the countryside"
  },
  {
    id: 4,
    src: "/ireland/DSC04158.JPG",
    location: "Ireland",
    year: 2025,
    desc: "A quiet coastal path"
  },
  {
    id: 5,
    src: "/portugal/DSC02534.JPG",
    location: "Portugal",
    year: 2025,
    desc: "Golden hour over a vineyard"
  },
  {
    id: 6,
    src: "/portugal/DSC02552.JPG",
    location: "Portugal",
    year: 2025,
    desc: "Rolling hills and olive trees"
  },
  {
    id: 7,
    src: "/portugal/DSC02615.JPG",
    location: "Portugal",
    year: 2025,
    desc: "A quiet path through the countryside"
  },
  {
    id: 8,
    src: "/portugal/DSC02620.JPG",
    location: "Portugal",
    year: 2025,
    desc: "Sunlight over coastal cliffs"
  },
];

function groupPhotosByLocationAndYear(photos) {
  return photos.reduce((acc, photo) => {
    const key = `${photo.location}-${photo.year}`;
    if (!acc[key]) acc[key] = { location: photo.location, year: photo.year, photos: [] };
    acc[key].photos.push(photo);
    return acc;
  }, {});
}

function Gallery() {
  const groupedPhotos = groupPhotosByLocationAndYear(photos);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {Object.values(groupedPhotos).map((group) => (
        <section key={`${group.location}-${group.year}`} className="mb-24">
          <h2 className="mb-6 text-2xl">
            {group.location} {group.year}
          </h2>

          <div className="grid grid-cols-1 gap-12">
            {group.photos.map((pic) => (
              <div key={pic.id} className="overflow-hidden">
                <img
                  src={pic.src}
                  alt={pic.desc}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Gallery;
