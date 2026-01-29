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
            <li key={photo.id} className="relative flex flex-col items-center gap-12">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                 
                </h2>
              </div>

            <div className="hidden md:flex flex-row max-w-7xl mx-auto -translate-x-[5vw]">
              <div className="flex items-center">
                <p className="inline-block transform -rotate-90 whitespace-nowrap opacity-70 tracking-widest text-xl">
                  {photo.desc}
                </p>
              </div>
              <div className="relative md:w-[70vw] md:h-[80vh] flex-shrink-0 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.desc}
                  className="h-fit w-fit object-cover"
                />
              </div>
            </div>

            {photo.featuredText && (
              <div className="text-center mt-6 md:max-w-3xl">
                <p className="text-base md:text-lg leading-loose tracking-wider my-4">
                  {photo.featuredText}
                </p>
              </div>
            )}

              <div className="md:hidden flex flex-col w-full mt-4 text-center">
                <p className="uppercase tracking-wide opacity-60 mb-2 text-sm">{photo.location} • {photo.year}</p>
                {photo.featuredText && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm tracking-wide leading-relaxed max-w-md mx-auto"
                  >
                    {photo.featuredText}
                  </motion.p>
                )}
              </div>

            </li>
          ))}
        </ul>
      </section>
    </Transition>
  );
}

export default Featured;
