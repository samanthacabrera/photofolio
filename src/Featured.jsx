import photos from "./photos";
import Transition from "./Transition";

function Featured() {
  const featuredPhotos = photos.filter((p) => p.featured);
  if (!featuredPhotos.length) return null;

  return (
    <Transition>
      <section className="min-h-screen max-w-7xl mx-6 md:mx-auto py-12">
        
        <p className="py-20 text-center text-4xl max-w-2xl mx-auto leading-loose tracking-widest italic">
          A selection of my <br /> favorite shots
        </p>

        <div className="flex flex-col gap-[50vh] py-[25vh]">
          {featuredPhotos.map((photo, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={photo.id}
                className={`flex flex-col md:flex-row gap-12 items-start ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/6">
                  <h1 className="text-2xl font-light mb-4">
                    {photo.desc}
                  </h1>

                  <p className="italic tracking-widest opacity-70 mb-4">
                    {photo.location} {photo.year}
                  </p>

                  {photo.featuredText && (
                    <p className="leading-loose normal-case tracking-wider">
                      {photo.featuredText}
                    </p>
                  )}
                </div>

                <div className="relative w-full md:w-5/6 h-[80vh] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.desc}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Transition>
  );
}

export default Featured;
