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
      <div className="backdrop-blur-sm bg-black/5 p-12">
        <h1 className="text-xl text-center tracking-[0.2em]">
          <span className="text-neutral-500">JM</span>Photos
        </h1>
        <div className="flex flex-col gap-4 py-8 w-full text-center">
          <motion.div whileTap={{ opacity: 0.6 }}>
            <Link
              to="/photofolio/featured"
              className="text-xs md:text-sm"
            >
              <ScrambleText text="Featured" />
            </Link>
          </motion.div>
          <motion.div whileTap={{ opacity: 0.6 }}>
            <Link
              to="/photofolio/gallery"
              className="text-xs md:text-sm"
            >
              <ScrambleText text="Gallery" />
            </Link>
          </motion.div>
          <motion.div whileTap={{ opacity: 0.6 }}>
            <Link
              to="/photofolio/about"
              className="text-xs md:text-sm"
            >
              <ScrambleText text="About" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
    </>
  );
}

export default Hero;
