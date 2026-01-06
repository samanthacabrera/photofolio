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
      className="select-none"
    >
      {displayText}
    </span>
  );
};

function Hero() {
  const [openModal, setOpenModal] = useState(null);
  const closeModal = () => setOpenModal(null);

  return (
    <section className="relative w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/photofolio/ireland/DSC04136.JPG')" }}>
      <div className="absolute inset-0 bg-black/10" />

      <header className="relative flex flex-col items-center justify-center h-screen">
        <h1 className="font-light uppercase text-neutral-800 text-xl md:text-2xl text-center tracking-[0.2em] pl-8 ">
          <span className="text-neutral-300">JM</span>Photography
        </h1>
      </header>

      {/* Nav */}
      <div className="fixed top-4 left-4 z-10 text-white uppercase tracking-[0.35em] text-xl after:block after:h-[1px] after:w-full after:bg-white after:mt-1 hover:opacity-70 transition cursor-pointer ">
        <Link to="/photofolio/featured">
          <ScrambleText text="Featured" />
        </Link>
      </div>
      <div
        onClick={() => setOpenModal("about")}
        className="fixed bottom-4 left-4 z-10 text-white uppercase tracking-[0.35em] text-xl after:block after:h-[1px] after:w-full after:bg-white after:mt-1 hover:opacity-70 transition cursor-pointer "
      >
        <ScrambleText text="About" />
      </div>
      <div className="fixed top-4 right-4 z-10 text-neutral-600 uppercase tracking-[0.35em] text-xl after:block after:h-[1px] after:w-full after:bg-neutral-600 after:mt-1 hover:opacity-70 transition cursor-pointer ">
        <Link to="/photofolio/gallery">
          <ScrambleText text="Gallery" />
        </Link>
      </div>
      <div
        onClick={() => setOpenModal("contact")}
        className="fixed bottom-4 right-4 z-10 text-white uppercase tracking-[0.35em] text-xl after:block after:h-[1px] after:w-full after:bg-white after:mt-1 hover:opacity-70 transition cursor-pointer "
      >
        <ScrambleText text="Contact" />
      </div>

      {/* Modals */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />
          <div className="relative bg-white space-y-4 p-8 max-w-lg w-full text-sm z-10">
            {openModal === "about" && (
              <>
                <p className="text-lg text-center tracking-widest uppercase">About</p>
                <p>
                  This is a personal archive of places I’ve visited that felt worth holding onto.
                  I am self-taught and began photographing in 2020.
                </p>
                <p>
                  All photos are captured with a Sony Alpha a6000 under natural light.
                </p>
              </>
            )}

            {openModal === "contact" && (
              <>
                <p className="text-lg text-center tracking-widest uppercase">Contact</p>
                <p>Based in Utrecht, Netherlands. Happy to connect with fellow travelers and photography enthusiasts.</p>
                <p>
                  You can reach me at{" "}
                  <span className="italic hover:underline">
                    justinamiller1023@gmail.com
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
