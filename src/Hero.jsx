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
      <section
        className="no-toggle flex flex-col items-center relative w-screen h-screen bg-cover bg-center p-8"
        style={{ backgroundImage: "url('/photofolio/ireland/DSC04136.JPG')" }}
      >
      <h1 className="no-toggle font-light text-xl text-center tracking-[0.2em] pl-8">
        <span className="text-neutral-400">JM</span>Photography
      </h1>

      <div className="flex flex-col gap-4 py-8 w-full">
        <Link
          to="/photofolio/featured"
          className="text-xs md:text-sm text-center w-full"
        >
          <ScrambleText text="Featured" />
        </Link>
        <Link
          to="/photofolio/gallery"
          className="text-xs md:text-sm text-center w-full"
        >
          <ScrambleText text="Gallery" />
        </Link>

        <Link
          to="/photofolio/about"
          className="text-xs md:text-sm text-center w-full"
        >
          <ScrambleText text="About" />
        </Link>
      </div>
    </section>
    </>
  );
}

export default Hero;
