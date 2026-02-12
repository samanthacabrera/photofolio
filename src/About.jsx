import { useRef, useEffect } from "react";

function useScrollFade(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
          }, delay);
        } else {
          el.style.opacity = 0;
          el.style.transform = "translateY(20px)";
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

function About() {
  const para1Ref = useScrollFade(0);
  const para2Ref = useScrollFade(200);
  const para3Ref = useScrollFade(400);

  return (
    <section
      id="about"
      data-title="About"
      className="min-h-screen relative flex flex-col items-center justify-center max-w-6xl mx-6 md:mx-auto"
    >
      <div className="text-center text-sm md:text-base tracking-widest max-w-sm leading-loose mx-auto space-y-8">
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
          I am self-taught and began photographing in 2020. All photos are
          captured with a Sony Alpha a6000 under natural light.
        </p>
        <p
          ref={para3Ref}
          className="opacity-0 transform translate-y-6 transition-all duration-500 ease-out"
        >
          This is my collection of places I’ve visited that felt worth
          holding onto.
        </p>
      </div>
    </section>
  );
}

export default About;
