import { useState } from "react";
import { motion } from "framer-motion";
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
      className={`
        inline-flex
        ${darkMode ? "text-neutral-100" : "text-neutral-900"}
      `}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block w-[1.5ch] text-center"
        >
          {char}
        </span>
      ))}
    </span>
  );
};

function Hero({ darkMode }) {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.img
        src="/photofolio/ireland/DSC04136.JPG"
        alt="Hero"
        className="w-full h-screen object-cover"
      />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]
        ${darkMode
          ? "bg-gradient-to-t from-black/95 via-black/50"
          : "bg-gradient-to-t from-white via-white/20"}
        `}
      />

      <motion.div className="absolute inset-0 flex flex-col justify-end items-center px-8 md:px-16 pb-20">
        <h1
          className={`
            font-light
            text-4xl md:text-6xl
            tracking-[0.25em]
            ${darkMode ? "text-neutral-100" : "text-neutral-900"}
          `}
        >
          <span className="font-medium">JM</span>Photos
        </h1>

        <div className="mt-6 flex gap-8 text-xs md:text-sm uppercase font-medium">
          <Link
            to="/photofolio/featured"
            className="hover:opacity-70 transition"
          >
            <ScrambleText text="Featured" darkMode={darkMode} />
          </Link>

          <a
            href="#gallery"
            className="hover:opacity-70 transition"
          >
            <ScrambleText text="Gallery" darkMode={darkMode} />
          </a>

          <Link
            to="/photofolio/about"
            className="hover:opacity-70 transition"
          >
            <ScrambleText text="About" darkMode={darkMode} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
