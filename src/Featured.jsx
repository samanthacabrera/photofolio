import { motion } from "framer-motion";
import photos from "./photos"; 
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

function Featured({ darkMode, setDarkMode }) {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <motion.section 
        id="featured" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.25 }}
        className="flex flex-col items-center min-h-screen max-w-7xl mx-4 md:mx-auto py-24"
      > 
        <div className="flex flex-col gap-16">
          {featuredPhotos.map((photo, index) => (
            <article key={photo.id} className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              
              <div className="md:w-3/4 relative overflow-hidden rounded-sm shadow-lg">
                <img 
                  src={photo.src} 
                  alt={photo.desc} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[101%]"
                />
              </div>
              <div className="self-start md:w-1/4 flex flex-col gap-4">
                <p className="text-sm md:text-base uppercase tracking-widest text-neutral-500">
                  {photo.location} {photo.year}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
                  {photo.desc}
                </h2>
                {photo.featuredText && (
                  <p className="normal-case text-justify tracking-wide text-neutral-700 dark:text-neutral-300">
                      {photo.featuredText} 
                  </p>
                )}
              </div>

            </article>
          ))}
        </div>
      </motion.section>
      <ScrollToTop />
    </>
  );
}

export default Featured;
