import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { label: "Home", hash: "#home" },
  { label: "Featured", hash: "#featured" },
  { label: "Gallery", hash: "#gallery" },
  { label: "About", hash: "#about" },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const onScroll = () => {
      setVisible(window.scrollY > hero.offsetHeight - 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[id][data-title]")
    ).filter((s) => s.id !== "home");

    if (!sections.length) return;

    const onScroll = () => {
      const middle = window.innerHeight / 2;
      let closestSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMiddle - middle);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      if (closestSection) {
        const { id, dataset } = closestSection;
        setCurrentTitle(dataset.title);
        history.replaceState(null, "", `#${id}`);
      }
    };

    onScroll(); 
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (hash) => {
    const el = document.getElementById(hash.replace("#", ""));
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-screen h-[6vh] bg-black flex items-center justify-center
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
    >
      {!menuOpen && currentTitle && (
        <button
          onClick={() => setMenuOpen(true)}
          className="uppercase tracking-[0.35em] text-sm"
        >
          {currentTitle}
        </button>
      )}

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-screen h-[95vh] bg-black flex flex-col items-center space-y-6 text-2xl tracking-[0.25em]">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.hash}
              onClick={() => handleNavClick(item.hash)}
              className="opacity-60 hover:opacity-100 transition uppercase"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute bottom-10 text-5xl"
          >
            ×
          </button>
        </div>
      )}
    </header>
  );
}
