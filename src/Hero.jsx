import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Transition from "./Transition";

function Hero() {
  const navigate = useNavigate();
  const [swipe, setSwipe] = useState({ x: 0, y: 0, active: false });

  const handleClick = (path, dir) => {
    setSwipe({ ...dir, active: true });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(path);
    }, 650);
  };

  return (
    <Transition>
      <motion.section
        className="relative w-screen h-[100dvh] md:h-[200vh] overflow-hidden bg-black"
        animate={
          swipe.active
            ? {
                x: swipe.x * -400,
                y: swipe.y * 400,
                opacity: 0,
                scale: 0.96,
                filter: "blur(6px)",
              }
            : {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
          mass: 0.6,
        }}
      >
        <motion.img
          src="/photofolio/ireland/DSC04136.JPG"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/25 z-10" />

        <div className="absolute inset-0 z-20 pointer-events-none">
          <h1 className="absolute top-[20vh] left-1/2 -translate-x-1/2 opacity-30 font-extrabold tracking-tight leading-none text-[28vw]">
            JM
          </h1>
        </div>

        <div className="relative z-30 flex items-center justify-center h-screen">
          <h2 className="font-bold tracking-[0.25em] md:tracking-[0.5em] pl-6 text-2xl md:text-5xl">
            Photography
          </h2>
        </div>

        <nav className="absolute bottom-20 left-1/2 -translate-x-1/2 md:relative md:pt-20 z-30 w-screen font-bold tracking-wide flex flex-col items-center gap-10 md:gap-0 text-2xl md:text-7xl">
          <Link
            to="/photofolio/featured"
            onClick={(e) => {
              e.preventDefault();
              handleClick("/photofolio/featured", { x: 0, y: -1 });
            }}
            className="w-full h-full md:h-[33vh] flex items-center justify-center text-center opacity-60 hover:opacity-90 md:hover:bg-black transition-all duration-200"
          >
            Featured
          </Link>
          <Link
            to="/photofolio/gallery"
            onClick={(e) => {
              e.preventDefault();
              handleClick("/photofolio/gallery", { x: 0, y: -1 });
            }}
            className="w-full h-full md:h-[33vh] flex items-center justify-center text-center opacity-60 hover:opacity-90 md:hover:bg-black transition-all duration-200"
          >
            Gallery
          </Link>
          <Link
            to="/photofolio/about"
            onClick={(e) => {
              e.preventDefault();
              handleClick("/photofolio/about", { x: 0, y: -1 });
            }}
            className="w-full h-full md:h-[33vh] flex items-center justify-center text-center opacity-60 hover:opacity-90 md:hover:bg-black transition-all duration-200"
          >
            About
          </Link>
        </nav>
      </motion.section>
    </Transition>
  );
}

export default Hero;
