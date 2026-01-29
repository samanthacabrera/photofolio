import { motion } from "framer-motion";
import photos from "./photos";
import Transition from "./Transition";

function Featured() {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  return (
    <Transition>
      <section className="min-h-screen max-w-7xl mx-6 md:mx-auto py-24 flex flex-col gap-48">
        
        <p className="pt-20 text-center text-4xl max-w-2xl mx-auto leading-relaxed italic">
          A curated selection of my favorite shots
        </p>

        <ul className="flex flex-col gap-48">
          {featuredPhotos.map((photo) => (
            <li key={photo.id} className="flex flex-col items-center gap-12">

              <div className="text-center mt-6 max-w-5xl">
                  <p className="text-2xl tracking-[0.3em]">
                    {photo.desc}
                  </p>
              </div>

              <div className="relative w-full max-w-5xl h-[80vh] overflow-hidden rounded-md shadow-lg">
                <img
                  src={photo.src}
                  alt={photo.desc}
                  className="h-full w-full object-cover"
                />
              </div>

              {photo.featuredText && (
                <div className="text-center mt-6 max-w-5xl">
                  <p className="italic">{photo.location} {photo.year}</p>
                  <p className="text-base md:text-lg leading-loose normal-case tracking-wide my-4">
                    {photo.featuredText}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Transition>
  );
}

export default Featured;
