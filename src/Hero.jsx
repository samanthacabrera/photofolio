import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const [openModal, setOpenModal] = useState(null);
  const closeModal = () => setOpenModal(null);
  const navigate = useNavigate();

  return (
    <>
    {/* Desktop Layout */}
    <section className="no toggle hidden md:flex justify-center relative w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/photofolio/ireland/DSC04136.JPG')" }}>
      <div className="relative flex flex-col items-center justify-center h-screen">
        <h1 className="font-light text-neutral-800 text-xl md:text-2xl text-center tracking-[0.2em] pl-8">
          <span className="text-neutral-300">JM</span>Photography
        </h1>
      </div>

      <div className="fixed top-4 left-4 z-10 text-neutral-300  tracking-[0.35em] after:block after:h-[1px] after:w-full after:bg-neutral-300 after:mt-1 hover:opacity-70 transition cursor-pointer ">
        <Link to="/photofolio/featured">
          <ScrambleText text="Featured" />
        </Link>
      </div>
      <div
        onClick={() => setOpenModal("about")}
        className="fixed bottom-4 left-4 z-10 text-neutral-300  tracking-[0.35em] after:block after:h-[1px] after:w-full after:bg-neutral-300 after:mt-1 hover:opacity-70 transition cursor-pointer "
      >
        <ScrambleText text="About" />
      </div>
      <div className="fixed top-4 right-4 z-10 text-neutral-800  tracking-[0.35em] after:block after:h-[1px] after:w-full after:bg-neutral-600 after:mt-1 hover:opacity-70 transition cursor-pointer ">
        <Link to="/photofolio/gallery">
          <ScrambleText text="Gallery" />
        </Link>
      </div>
      <div
        onClick={() => setOpenModal("contact")}
        className="fixed bottom-4 right-4 z-10 text-neutral-300  tracking-[0.35em] after:block after:h-[1px] after:w-full after:bg-neutral-300 after:mt-1 hover:opacity-70 transition cursor-pointer "
      >
        <ScrambleText text="Contact" />
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />
          <div className="relative bg-current text-current space-y-4 p-8 max-w-lg w-full text-sm z-10">
            {openModal === "about" && (
              <div className="no-toggle text-sm tracking-wide leading-[18px] space-y-4">
                <p className="text-lg text-center  mb-4">About</p>
                <p>
                  This is a personal archive of places I’ve visited that felt worth holding onto.
                  I am self-taught and began photographing in 2020.
                </p>
                <p>
                  All photos are captured with a Sony Alpha a6000 under natural light.
                </p>
              </div>
            )}

            {openModal === "contact" && (
              <div className="no-toggle text-sm tracking-wide leading-[18px] space-y-4">
                <p className="text-lg text-center tracking-widest ">Contact</p>
                <p>Based in Utrecht, Netherlands.</p>
                <p>
                  You can reach me at{" "}
                  <span className="italic hover:underline">
                    justinamiller1023@gmail.com
                  </span>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>

    {/* Mobile Layout */}
      <section
        // className="no-toggle flex flex-col items-center relative w-screen h-screen bg-cover bg-center p-8"
        className="no-toggle md:hidden flex flex-col items-center relative w-screen h-screen bg-cover bg-center p-8"
        style={{ backgroundImage: "url('/photofolio/ireland/DSC04136.JPG')" }}
      >
      <h1 className="font-light text-neutral-800 text-xl md:text-2xl text-center tracking-[0.2em] pl-8 ">
        <span className="text-neutral-400">JM</span>Photography
      </h1>

      <div className="flex flex-col gap-4 py-8 w-full items-center">
        <Link
          to="/photofolio/featured"
          className="text-xs text-center  w-full"
        >
          <ScrambleText text="Featured" />
        </Link>
        <Link
          to="/photofolio/gallery"
          className="text-xs text-center  w-full"
        >
          <ScrambleText text="Gallery" />
        </Link>

        <Link
          to="/photofolio/about"
          className="text-xs text-center  w-full"
        >
          <ScrambleText text="About" />
        </Link>
      </div>
    </section>
    </>
  );
}

export default Hero;
