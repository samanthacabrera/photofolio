import { useEffect, useState, useRef } from "react";
import photos from "./photos";

function Hero() {
  const heroImages = photos.filter(p => p.featured);

  const [current, setCurrent] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [transform, setTransform] = useState("scale(1)");

  const kenBurnsInterval = useRef(null);

  const randomPan = () => {
    const x = Math.random() * 6 - 3; 
    const y = Math.random() * 6 - 3;
    return `scale(1.15) translate(${x}%, ${y}%)`;
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % heroImages.length);
    setFadeKey(prev => prev + 1);
    setTransform("scale(1)");

    requestAnimationFrame(() => {
      setTransform(randomPan());
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setTitleVisible(true), 300);

    setTransform(randomPan());
    kenBurnsInterval.current = setInterval(nextSlide, 5000); 

    return () => {
      clearTimeout(timeout);
      clearInterval(kenBurnsInterval.current);
    };
  }, []);

  const handleTitleClick = () => {
    setCurrent(0);
    setFadeKey(0);
    setTransform("scale(1)");
    requestAnimationFrame(() => setTransform(randomPan()));
  };

  return (
    <section
      id="home"
      data-title="Home"
      className="relative w-screen h-[100dvh] overflow-hidden"
    >
      <img
        key={fadeKey}
        src={heroImages[current].src}
        alt={heroImages[current].city}
        className="absolute inset-0 w-full h-full object-cover animate-fade-in z-10"
        style={{
          transform: transform,
          transition: "transform 10s ease-out",
        }}
      />

      <div className="absolute inset-0 bg-black/20 z-20" />
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#111211] to-transparent z-30 pointer-events-none" />

      <div className="relative z-40 flex items-center justify-center h-screen pb-12">
        <h1
          onClick={handleTitleClick}
          className={`
            text-2xl md:text-4xl tracking-[0.35em] text-white transition-all duration-[1200ms] ease-out cursor-pointer
            ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
        >
          <span className="opacity-90">JM</span>
          <span className="opacity-70">Photography</span>
        </h1>
      </div>

      <style>{`
        @keyframes fadeIn { 0% {opacity:0.9;} 100%{opacity:1;} }
        .animate-fade-in { animation: fadeIn 0.25s linear forwards; }
      `}</style>
    </section>
  );
}

export default Hero;