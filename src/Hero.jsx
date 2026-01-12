import { useState } from "react";
import { motion, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const ScrambleText = ({ text, darkMode }) => {
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
          .map((char, i) =>
            i < iteration ? text[i] : letters[Math.floor(Math.random() * letters.length)]
          )
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      className={`select-none ${darkMode ? "text-neutral-100" : "text-neutral-900"}`}
    >
      {displayText}
    </span>
  );
};

function Hero({ darkMode }) {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.img
        src="/photofolio/ireland/DSC04136.JPG"
        alt="Hero"
        className="w-full h-[90vh] object-cover"
      />

      <div
        className={`absolute bottom-0 left-0 right-0 h-48 ${
          darkMode ? "bg-gradient-to-t from-black" : "bg-gradient-to-t from-white"
        }`}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center md:items-end text-center m-4"
      >
        <h1 className="text-6xl md:text-7xl text-neutral-700 tracking-wide leading-tight">
          <span className="opacity-50">JM</span>
          Photos
        </h1>

        <div className="flex m-4 text-sm text-neutral-700 md:text-base">
          <Link to="/photofolio/featured" className="w-6 mx-10">
            <ScrambleText text="Featured" />
          </Link>
          <a href="#gallery" className="w-6 mx-8">
            <ScrambleText text="Gallery" />
          </a>
          <Link to="/photofolio/about" className="w-6 mx-8">
            <ScrambleText text="About" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
