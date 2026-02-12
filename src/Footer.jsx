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
          el.style.transform = "translateY(12px)";
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

function Footer() {
  const emailRef = useScrollFade(0);
  const linkRef = useScrollFade(250);

  return (
    <section
      id="contact"
      data-title="Contact"
      className="w-full p-4 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
        <p
          ref={emailRef}
          className="group opacity-0 translate-y-3 transition-all duration-700 ease-out text-[11px] md:text-xs tracking-[0.12em] leading-relaxed"
        >
          For project inquiries or collaborations, you can best reach me at{" "}
          <a
            href="mailto:justinamiller1023@gmail.com"
            className="relative inline-block transition-colors duration-300 group-hover:text-white/70"
          >
            justinamiller1023@gmail.com
            <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-white/70 transition-all duration-500 ease-out group-hover:w-full"></span>
          </a>
          .
        </p>

        <p
          ref={linkRef}
          className="group opacity-0 translate-y-3 transition-all duration-700 ease-out text-[11px] md:text-xs tracking-[0.12em] leading-relaxed md:text-right"
        >
          This site was made by{" "}
          <a
            href="https://samoontha.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block transition-colors duration-300 group-hover:text-white/70"
          >
            Sam Cabrera
            <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-white/70 transition-all duration-500 ease-out group-hover:w-full"></span>
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default Footer;
