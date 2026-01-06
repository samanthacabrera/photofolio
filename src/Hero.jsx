import { useState } from "react";

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
    <section className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/photofolio/ireland/DSC04136.JPG')" }}>
      <header className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-light uppercase text-neutral-800 text-xl md:text-xl text-center tracking-[0.3em]">
          <span className="text-neutral-300">JM</span>Photography
        </h1>
      </header>

      {/* Nav */}
      <div
        onClick={() => setOpenModal("locations")}
        className="fixed top-2 left-2 p-4 border-2 border-black rounded-full hover:scale-105 transition cursor-pointer"
      >
        <p><ScrambleText text="Locations" /></p>
      </div>
      <div
        onClick={() => setOpenModal("about")}
        className="fixed bottom-2 left-2 p-6 border-2 border-black rounded-full hover:scale-105 transition cursor-pointer"
      >
        <p><ScrambleText text="About" /></p>
      </div>
      <div
        onClick={() => setOpenModal("years")}
        className="fixed top-2 right-2 p-6 border-2 border-black rounded-full hover:scale-105 transition cursor-pointer"
      >
        <p><ScrambleText text="Years" /></p>
      </div>
      <div
        onClick={() => setOpenModal("contact")}
        className="fixed bottom-2 right-2 p-6 border-2 border-black rounded-full hover:scale-105 transition cursor-pointer"
      >
        <p><ScrambleText text="Contact" /></p>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />

          <div className="relative bg-white p-8 max-w-md w-full rounded-lg z-10">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-sm border border-black px-2 py-1 rounded-full hover:bg-black hover:text-white transition"
            >
              Close
            </button>

            {openModal === "about" && (
              <>
                <p>
                  This is a personal archive of places I’ve visited that felt worth holding onto.
                  I am self-taught and began photographing in 2020.
                </p>
                <p className="mt-4">
                  All photos are captured with a Sony Alpha a6000 under natural light.
                </p>
              </>
            )}

            {openModal === "locations" && (
              <>
                <p className="font-medium mb-4">Locations</p>
                <ul className="space-y-2">
                  <li>Ireland</li>
                  <li>Portugal</li>
                  <li>Colorado</li>
                  <li>California</li>
                </ul>
              </>
            )}

            {openModal === "years" && (
              <>
                <p className="font-medium mb-4">Years</p>
                <ul className="space-y-2">
                  <li>2025</li>
                  <li>2026</li>
                </ul>
              </>
            )}

            {openModal === "contact" && (
              <>
                <p className="font-medium mb-4">Contact</p>
                <p>You can reach me at <span className="italic hover:underline">justinamiller1023@gmail.com</span></p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
