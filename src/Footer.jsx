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
          el.style.transform = "translateY(24px)";
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

function Footer() {
  const linksRef = useScrollFade(0);
  const topRef = useScrollFade(180);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full flex justify-center pt-24 md:pt-40 pb-16 md:pb-24 px-6 md:px-0">
      <div className="w-full md:w-2/3 flex flex-col items-center gap-6 md:gap-8">
        <div className="w-full h-px bg-white/20" />

        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-16 md:gap-0">
          <div
            ref={linksRef}
            className="opacity-0 translate-y-6 transition-all duration-700 ease-out flex flex-col md:flex-row gap-6 md:gap-10"
          >
            <a
              href="/photofolio"
              className="text-sm font-light tracking-widest hover:tracking-[0.2em] text-white/80 hover:text-white/100 transition-all duration-500"
            >
              Home
            </a>

            <a
              href="mailto:justinamiller1023@gmail.com"
              className="text-sm font-light tracking-widest hover:tracking-[0.2em] text-white/80 hover:text-white/100 transition-all duration-500"
            >
              Contact
            </a>

            <a
              href="https://samoontha.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-light tracking-widest hover:tracking-[0.2em] text-white/80 hover:text-white/100 transition-all duration-500"
            >
              Credits
            </a>
          </div>

          <button
            ref={topRef}
            onClick={scrollToTop}
            className="text-[9px] font-light tracking-widest hover:tracking-[0.2em] uppercase text-white/80 hover:text-white/100 transition-all duration-500"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;