import { motion } from "framer-motion";
import Header from "./Header";

function About({ darkMode, setDarkMode }) {

return (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
        className="h-screen overflow-hidden"
    >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div id="about" className="flex flex-col items-center justify-center max-w-lg mx-4 md:mx-auto">   
            <h1 className="ext-2xl md:text-6xl tracking-wider m-12 px-4 py-4 md:py-8">About</h1>
            <div className="text-center tracking-wide normal-case space-y-4">
                <p>Based in Utrecht, Netherlands. </p>
                <p>This is a personal archive of places I’ve visited that felt worth holding onto.</p>
                <p>I am self-taught and began photographing in 2020. All photos are captured with a Sony Alpha a6000 under natural light.</p>
                <p>You can reach me at{" "}<span className="italic hover:underline">justinamiller1023@gmail.com</span>.</p>
            </div>
            <p className="fixed bottom-2 text-[10px] md:text-xs">This site was made by
                <a href="https://samoontha.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition pl-1">Sam Cabrera</a>
            </p>
        </div>
    </motion.div>
  );
}

export default About;
