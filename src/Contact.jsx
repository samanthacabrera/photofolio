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

function Contact() {
  const textRef = useScrollFade(0);
  const footerRef = useScrollFade(450);

  return (
    <section
      id="contact"
      data-title="Contact"
      className="relative w-screen min-h-screen flex flex-col justify-center px-8 md:px-20 bg-[#111211] text-white"
    >
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 text-center">
        <p
          ref={textRef}
          className="opacity-0 transform translate-y-6 transition-all duration-500 ease-out text-white/80 text-sm lg:text-xl leading-loose max-w-md"
        >
          For project inquiries or collaborations, <br/> you can best reach me by email at{" "}
          <a
            href="mailto:justinamiller1023@gmail.com"
            className="relative group font-light tracking-[0.05em] underline-animation hover:text-white transition-all duration-500"
          >
            justinamiller1023@gmail.com
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </a>
          .
        </p>
      </div>

      {/* Footer */}
      <p
        ref={footerRef}
        className="group absolute bottom-4 left-0 right-0 mx-auto flex justify-center opacity-0 translate-y-6 transition-all duration-500 ease-out text-xs md:text-sm text-white/50 tracking-widest"
      >
        This site was made by{" "}
        <a
          href="https://samoontha.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block relative mx-1 group-hover:text-white transition-all duration-500"
        >
          Sam Cabrera
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
        </a>
      </p>
    </section>
  );
}

export default Contact;
