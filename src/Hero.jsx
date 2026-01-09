import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
  };

  const handleMouseLeave = () => {
    clearInterval(interval);
    setDisplayText(text);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      className="select-none"
    >
      {displayText}
    </span>
  );
};

function Hero() {
  return (
    <>
      <motion.section
        id="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col items-center justify-center relative w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/photofolio/ireland/DSC04136.JPG')" }}
      >
      
        <h1 className="text-7xl md:text-9xl text-center text-neutral-800 tracking-wide font-bold">
          <span className="text-neutral-300">JM</span>Photos
        </h1>
      
        <div className="fixed top-1 flex justify-around w-full max-w-5xl text-neutral-800 font-medium">
          <motion.div whileTap={{ opacity: 0.6 }} className="w-[5vw]">
            <Link
              to="/photofolio/featured"
              className="text-xs md:text-sm tracking-wide"
            >
              <ScrambleText text="Featured" />
            </Link>
          </motion.div>
          <motion.div whileTap={{ opacity: 0.6 }} className="w-[5vw]">
            <Link
              to="/photofolio/gallery"
              className="text-xs md:text-sm tracking-wide"
            >
              <ScrambleText text="Gallery" />
            </Link>
          </motion.div>
          <motion.div whileTap={{ opacity: 0.6 }} className="w-[5vw]">
            <Link
              to="/photofolio/about"
              className="text-xs md:text-sm tracking-wide"
            >
              <ScrambleText text="About" />
            </Link>
          </motion.div>
        </div>
    </motion.section>
    </>
  );
}

export default Hero;