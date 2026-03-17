import { useRef, useEffect, useState } from "react";

function useScrollReveal(delay = 0, trigger = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animateIn = () => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.filter = "blur(10px)";

      setTimeout(() => {
        el.style.transition =
          "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.filter = "blur(0px)";
      }, delay);
    };

    animateIn();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animateIn();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, trigger]);

  return ref;
}

export default function About() {
  const [trigger, setTrigger] = useState(0);

  const titleRef = useScrollReveal(0, trigger);
  const p1 = useScrollReveal(200, trigger);
  const p2 = useScrollReveal(400, trigger);
  const p3 = useScrollReveal(600, trigger);

  return (
    <section
      id="about"
      data-title="About"
      className="min-h-screen flex items-center justify-center px-6 md:px-0"
      style={{ background: "transparent" }} 
    >
      <div className="max-w-3xl w-full text-left space-y-10">
        
        <h1
          ref={titleRef}
          onClick={() => setTrigger(t => t + 1)}
          className="group cursor-pointer text-3xl md:text-4xl tracking-[0.4em] font-light opacity-0"
        >
          <span className="inline-block transition-all duration-700 group-hover:tracking-[0.6em]">
            JM
          </span>
          <span className="ml-3 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
            Photography
          </span>
        </h1>

        <div className="space-y-6 text-sm md:text-lg tracking-wide leading-relaxed text-white/80">
          <p ref={p1} className="opacity-0">
            I am a photographer based in The Netherlands.
          </p>

          <p ref={p2} className="opacity-0">
            I am self-taught and started photographing in 2020. All photos are captured with a Sony Alpha a6000 under natural light.
          </p>

          <p ref={p3} className="opacity-0">
            Below is a collection of photos from places I’ve visited that felt worth holding onto.
          </p>
        </div>
      </div>
    </section>
  );
}