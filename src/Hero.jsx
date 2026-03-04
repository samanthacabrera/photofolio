import { useEffect, useState } from "react";
import photos from "./photos"; 

function Hero() {
  const heroImages = photos.filter(p => p.featured);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [activeTransform, setActiveTransform] = useState({ scale: 1.15, x: 0, y: 0 });
  const [fadeKey, setFadeKey] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false); 

  useEffect(() => {
    const timeout = setTimeout(() => setTitleVisible(true), 300); 
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((current + 1) % heroImages.length);
      setActiveTransform({ scale: 1.15, x: 0, y: 0 });
      setFadeKey(prevKey => prevKey + 1); 
    }, 5000);

    return () => clearInterval(interval);
  }, [current, heroImages.length]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setActiveTransform({ scale: 1.15, x: current % 2 === 0 ? -1 : 2, y: -1 });
    });
    return () => cancelAnimationFrame(raf);
  }, [current]);

  return (
    <section
      id="home"
      data-title="Home"
      className="relative w-screen h-[100dvh] bg-[#111211] overflow-hidden"
    >
      {prev !== null && (
        <img
          src={heroImages[prev].src}
          alt={heroImages[prev].city}
          className="absolute inset-0 w-full h-full object-cover animate-fade-out z-10"
        />
      )}

      <img
        key={fadeKey} 
        src={heroImages[current].src}
        alt={heroImages[current].city}
        className="absolute inset-0 w-full h-full object-cover animate-fade-in z-20"
        style={{
          transform: `scale(${activeTransform.scale}) translate(${activeTransform.x}%, ${activeTransform.y}%)`,
          transition: "transform 7s ease-in-out",
        }}
      />

      <div className="absolute inset-0 bg-black/20 z-30" />
      <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-t from-[#111211] to-transparent z-40 pointer-events-none" />

      <div className="relative z-50 flex items-center justify-center h-screen pb-12">
        <h1
          className={`
            text-2xl md:text-4xl tracking-[0.35em] text-white transition-all duration-[1200ms] ease-out
            ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
          `}
        >
          <span className="opacity-90">JM</span>
          <span className="opacity-70">Photography</span>
        </h1>
      </div>

      <style>{`
        @keyframes fadeIn { 0% {opacity:0;} 100%{opacity:1;} }
        @keyframes fadeOut { 0% {opacity:1;} 100%{opacity:0;} }
        .animate-fade-in { animation: fadeIn 1.5s ease forwards; }
        .animate-fade-out { animation: fadeOut 1.5s ease forwards; }
      `}</style>
    </section>
  );
}

export default Hero;
