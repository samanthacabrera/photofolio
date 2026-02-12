import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      setVisible(scrollPosition >= pageHeight - 120);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="hidden md:block fixed bottom-28 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`group flex flex-col items-center py-6 transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
        `}
      >
        <svg
          width="20"
          height="40"
          viewBox="0 0 24 48"
          fill="none"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 ease-out group-hover:-translate-y-2"
        >
          <path d="M12 38V10" />
          <path d="M6 16l6-6 6 6" />
        </svg>

        <span className="mt-4 text-xs tracking-[0.25em] uppercase text-white/70 transition-colors duration-500 group-hover:text-white">
          Back to Top
        </span>
      </button>
    </div>
  );
}
