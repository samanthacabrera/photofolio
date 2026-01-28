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
        className="relative w-screen h-[100dvh] bg-black"
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

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-30 flex pt-12 justify-center h-screen">
          <h2 className="font-bold text-2xl tracking-[0.35em]">
            <span className="opacity-90 mr-2">JM</span>
            <span className="opacity-70">Photography</span>
          </h2>
        </div>

        <nav className="relative z-30 flex flex-col items-center space-y-4 -mt-64 py-12 text-lg tracking-[0.35em] font-medium">
          {[
            { label: "Featured", path: "/photofolio/featured" },
            { label: "Gallery", path: "/photofolio/gallery" },
            { label: "About", path: "/photofolio/about" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.path, { x: 0, y: -1 });
              }}
              className="relative opacity-50 hover:opacity-90 transition-all duration-300 ease-out"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.section>
    </Transition>
  );
}

export default Hero;
