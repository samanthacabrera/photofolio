import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = Math.ceil(
        window.scrollY + window.innerHeight
      );
      const pageHeight = document.documentElement.scrollHeight;

      setVisible(scrollPosition >= pageHeight - 100);
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
    <div className="pt-24">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`hidden md:flex fixed bottom-4 right-4 z-50 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-opacity duration-500 hover:opacity-80
          ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="transition duration-200 hover:-translate-y-2"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
