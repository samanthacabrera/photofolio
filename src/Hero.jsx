import { useEffect, useRef, useState } from "react";

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

  return (
      <section
        id="home"
        data-title="Home"
        className="relative w-screen h-[100dvh] bg-[#111211] overflow-hidden"
      >
        <img
          ref={imageRef}
          src="/photofolio/ireland/DSC04136.JPG"
          alt="Hero"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[6000ms] ease-in-out
            ${imageVisible ? "opacity-100 scale-105" : "opacity-0 scale-100"}
          `}
        />

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#111211] to-transparent z-20 pointer-events-none" />

        <div className="relative z-30 flex items-center justify-center h-screen">
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
          @keyframes zoomSlow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          img {
            animation: zoomSlow 10s ease-in-out infinite;
          }
        `}</style>
      </section>
  );
}

export default Hero;
