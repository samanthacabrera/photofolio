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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        className="flex flex-col items-center min-h-screen max-w-5xl mx-4 md:mx-auto"
    > 
        <h1 className="heading text-2xl md:text-4xl tracking-widest py-4 md:py-12">Featured</h1>      
        <div className="grid grid-cols-1 gap-24 my-6 p-6">
            {featuredPhotos.map((photo) => (
            <div
                key={photo.id}
                className="w-full mx-auto relative group"
            >
                <div className="flex flex-col space-y-4 my-4 text-sm text-center tracking-wider">
                    <p>{photo.location} {photo.year}</p>
                    <p className="text-lg">{photo.desc}</p>
                    {photo.featuredText && (
                    <p className="normal-case text-justify tracking-wide">
                        {photo.featuredText}
                    </p>
                    )}
                </div>
                
                <div className="relative">
                    <img src={photo.src} alt={photo.desc} className="w-fit h-full md:w-full object-cover"/>
                    {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white text-xs tracking-wide">
                        <p>buy print</p>
                        <p>(coming soon)</p>
                    </div> */}
                </div>
            </div>
            ))}
        </div>
    </motion.section>
    <ScrollToTop />
    </>
  );
}

export default Featured;
