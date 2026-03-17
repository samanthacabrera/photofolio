import { useRef, useState, useEffect } from "react";

function useScrollFade(delay = 0, resetTrigger = 0) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const runAnimation = () => {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";

      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, delay);
    };

    runAnimation();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation();
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, resetTrigger]);

  return ref;
}

export default function About() {
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const titleRef = useScrollFade(0, animationTrigger);
  const para1Ref = useScrollFade(200, animationTrigger);
  const para2Ref = useScrollFade(400, animationTrigger);
  const para3Ref = useScrollFade(600, animationTrigger);

  return (
    <section
      id="about"
      data-title="About"
      className="min-h-screen relative flex flex-col items-center justify-center max-w-6xl mx-6 md:mx-auto"
    >
      <div className="text-left text-sm md:text-xl tracking-widest max-w-3xl leading-loose mx-auto space-y-8">
        <h1
          ref={titleRef}
          onClick={() => setAnimationTrigger(prev => prev + 1)}
          className="text-2xl md:text-3xl mb-10 tracking-[0.35em] opacity-0 transform translate-y-6 transition-all duration-500 ease-out cursor-pointer"
        >
          <span className="opacity-90">JM</span>
          <span className="opacity-70">Photography</span>
        </h1>
        <p
          ref={para1Ref}
          className="opacity-0 transform translate-y-6 transition-all duration-500 ease-out"
        >
          I am a photographer based in The Netherlands.
        </p>
        <p
          ref={para2Ref}
          className="opacity-0 transform translate-y-6 transition-all duration-500 ease-out"
        >
          I am self-taught and started photographing in 2020. All photos are
          captured with a Sony Alpha a6000 under natural light.
        </p>
        <p
          ref={para3Ref}
          className="opacity-0 transform translate-y-6 transition-all duration-500 ease-out"
        >
          Below is a collection of photos from places I’ve visited that felt worth holding onto.
        </p>
      </div>
    </section>
  );
}