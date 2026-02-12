import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { label: "Home", hash: "#home" },
  { label: "About", hash: "#about" },
  { label: "Gallery", hash: "#gallery" },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;

      const heroBottom = hero.offsetHeight;
      setVisible(window.scrollY >= heroBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[id][data-title]")
    ).filter((s) => s.id !== "home");

    if (!sections.length) return;

    const onScroll = () => {
      let current = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top <= window.innerHeight * 0.1) {
          current = section;
        }
      }

      if (current) {
        const { id, dataset } = current;
        setCurrentTitle(dataset.title);
        history.replaceState(null, "", `#${id}`);
      } else {
        setCurrentTitle(""); 
        history.replaceState(null, "", "#home");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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
      className={`fixed top-0 left-0 z-50 w-screen h-[6vh] bg-[#111211] flex items-center justify-center
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
        <div className="absolute top-full left-0 w-screen h-[95vh] bg-[#111211] flex flex-col items-center justify-center space-y-8 text-2xl tracking-[0.25em]">
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
            className="text-5xl opacity-60 bg-orange-200 hover:opacity-100 transition"
          >
            ×
          </button>
        </div>
      )}
    </header>
  );
}
