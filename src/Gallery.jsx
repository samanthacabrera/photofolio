const photos = [
  {
    id: 1,
    src: "/ireland/DSC04136.JPG",
    location: "Ireland",
    year: 2025
  },
  {
    id: 2,
    src: "/ireland/DSC03798.JPG",
    location: "Ireland",
    year: 2025
  },
  {
    id: 3,
    src: "/ireland/DSC04133.JPG",
    location: "Ireland",
    year: 2025
  },
  {
    id: 4,
    src: "/ireland/DSC04158.JPG",
    location: "Ireland",
    year: 2025
  },
  {
    id: 5,
    src: "/portugal/DSC02534.JPG",
    location: "Portugal",
    year: 2025
  },
  {
    id: 6,
    src: "/portugal/DSC02552.JPG",
    location: "Portugal",
    year: 2025
  },
  {
    id: 7,
    src: "/portugal/DSC02615.JPG",
    location: "Portugal",
    year: 2025
  },
  {
    id: 8,
    src: "/portugal/DSC02620.JPG",
    location: "Portugal",
    year: 2025
  },
];

function Gallery() {
  const photosByLocation = photos.reduce((acc, photo) => {
    acc[photo.location] = acc[photo.location] || [];
    acc[photo.location].push(photo);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-4">
      {Object.entries(photosByLocation).map(([location, pics]) => {
        const year = pics[0].year; 

        return (
          <section key={location} className="mb-24">
            <h2 className="mb-6 text-2xl">
              {location} {year}
            </h2>

            <div className="grid grid-cols-1 gap-12">
              {pics.map((pic) => (
                <div
                  key={pic.id}
                  className="overflow-hidden"
                >
                  <img
                    src={pic.src}
                    alt={`${location} ${pic.id}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Gallery;
