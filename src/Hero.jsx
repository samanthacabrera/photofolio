import { useState } from "react";
import { Link } from "react-router-dom";

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
      className="inline-flex"
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

function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src="/photofolio/ireland/DSC04136.JPG"
        alt="Hero"
        className="w-full h-screen object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/95 via-black/50" />

      <div className="absolute inset-0 flex flex-col justify-start md:justify-end items-center px-8 md:px-16 pt-12 pb-20 text-neutral-800 md:text-inherit">
        <h1 className="font-light text-4xl tracking-[0.25em]">
          <span className="font-medium">JM</span>Photos
        </h1>

        <div className="mt-6 flex gap-8 text-xs md:text-sm uppercase font-medium">
          <Link
            to="/photofolio/featured"
            className="hover:opacity-70 transition"
          >
            <ScrambleText text="Featured" />
          </Link>

          <a
            href="#gallery"
            className="hover:opacity-70 transition"
          >
            <ScrambleText text="Gallery" />
          </a>

          <Link
            to="/photofolio/about"
            className="hover:opacity-70 transition"
          >
            <ScrambleText text="About" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
