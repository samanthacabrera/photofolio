import { useEffect, useRef, useState } from "react";
import photos from "./photos"; 

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return [ref, visible];
}

function Hero() {
  const [imageRef, imageVisible] = useFadeIn(0);
  const [titleRef, titleVisible] = useFadeIn(500);

  const heroImages = photos.filter(p => p.featured);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length);
    }, 7000); 

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section
      id="home"
      data-title="Home"
      className="relative w-screen h-[100dvh] bg-[#111211] overflow-hidden"
    >
      {/* Carousel images */}
      {heroImages.map((photo, index) => {
        const isActive = index === current && imageVisible;
        const motionClass =
          index % 2 === 0 ? "hero-pan-left" : "hero-pan-right";

        return (
          <img
            key={photo.id}
            ref={index === 0 ? imageRef : null}
            src={photo.src}
            alt={photo.desc}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-[2000ms] ease-in-out
              ${isActive ? "opacity-100" : "opacity-0"}
              ${isActive ? motionClass : ""}
            `}
          />
        );
      })}

      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-t from-[#111211] to-transparent z-20 pointer-events-none" />

      <div className="relative z-30 flex items-center justify-center h-screen pb-12">
        <h2
          ref={titleRef}
          className={`text-2xl md:text-4xl tracking-[0.35em] text-white transition-all duration-[1000ms] ease-out
            ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <span className="opacity-80">JM</span>
          <span className="opacity-70">Photography</span>
        </h2>
      </div>

      <style jsx>{`
        .hero-pan-left {
          animation: heroPanLeft 12s ease-in-out forwards;
        }

        .hero-pan-right {
          animation: heroPanRight 12s ease-in-out forwards;
        }

        @keyframes heroPanLeft {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.15) translate(-4%, -2%);
          }
        }

        @keyframes heroPanRight {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.15) translate(4%, -2%);
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;


