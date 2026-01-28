import { motion } from "framer-motion";
import photos from "./photos";
import Transition from "./Transition";

function Featured() {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  return (
    <>
      <Transition>
        <section className="flex flex-col min-h-screen max-w-7xl mx-6 md:mx-auto py-12">
          <ul className="w-full flex flex-col gap-12 md:gap-60 py-6">
            {featuredPhotos.map((photo, index) => {
              const reverse = index % 2 === 1;

              return (
                <li key={photo.id} className="pb-12">
                  <div
                    className={`flex flex-col md:flex-row gap-6 md:gap-10 ${
                      reverse ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="overflow-hidden w-full md:h-[75vh]">
                      <img src={photo.src} alt={photo.desc} className="h-full w-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col w-full md:w-1/4">
                      <p className="uppercase tracking-widest opacity-60 mb-2 text-sm md:text-xs">
                        {photo.location} {photo.year}
                      </p>
                      <h3 className="tracking-widest font-medium mb-4">{photo.desc}</h3>

                      {photo.featuredText && (
                        <p className="hidden md:block normal-case text-sm md:text-base tracking-wide leading-loose">
                          {photo.featuredText}
                        </p>
                      )}
                    </div>
                  </div>

                  {photo.featuredText && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden"
                    >
                      <p className="normal-case text-sm tracking-wide leading-loose">{photo.featuredText}</p>
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </Transition>
    </>
  );
}

export default Featured;
