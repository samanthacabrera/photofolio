import Header from "./Header";
import { motion } from "framer-motion";

function About({ darkMode, setDarkMode }) {

return (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        className="h-screen overflow-hidden"
    >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div id="about" className="flex flex-col items-center justify-center max-w-md mx-6 md:mx-auto">   
            <h1 className="text-2xl md:text-4xl mt-12 py-16 md:py-20">About</h1>
            <div className="tracking-widest normal-case space-y-6">
                <p className="text-justify">This is a personal archive of places I’ve visited that felt worth holding onto. I am self-taught and began photographing in 2020. All photos are captured with a Sony Alpha a6000 under natural light.</p>
                <p className="text-left">Based in Utrecht, Netherlands. You can reach me at{" "}<span className="italic hover:underline">justinamiller1023@gmail.com</span>.</p>
            </div>
        </div>
    </motion.div>
  );
}

export default About;
