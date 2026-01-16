import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const PAGE_TITLES = {
  "/photofolio/": "Gallery",
  "/photofolio/featured": "Featured",
  "/photofolio/gallery": "Gallery",
  "/photofolio/about": "About",
};

const MENU_ITEMS = [
  { label: "Home", path: "/photofolio/" },
  { label: "Featured", path: "/photofolio/featured" },
  { label: "Gallery", path: "/photofolio/gallery" },
  { label: "About", path: "/photofolio/about" },
];

function DropdownMenu({ open, onClose, onNavigate }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen h-[95vh] bg-black p-8 flex flex-col items-center text-2xl md:text-3xl tracking-[0.15em] font-medium z-50"
    >
      {MENU_ITEMS.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          onClick={onNavigate}
          className="py-4 hover:opacity-50 hover:-translate-y-2 transition-all duration-200"
        >
          {item.label}
        </Link>
      ))}

      <button
        onClick={onClose}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-5xl font-light hover:opacity-50 transition-opacity duration-200"
        aria-label="Close menu"
      >
        ×
      </button>
    </div>
  );
}


export default function Header({ layoutValue, setLayoutValue }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const pathname = location.pathname;
  const isHome = pathname === "/photofolio/";
  const currentTitle = PAGE_TITLES[pathname] || "";
  const shouldShowHeader = !isHome || showTitle;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setShowTitle(true);
      return;
    }

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const breakpoint = isMobile ? 90 : 750;
      setShowTitle(window.scrollY > breakpoint);
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleNavigate = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!shouldShowHeader) return null;

  return (
    <header className="sticky top-0 z-50 w-screen h-[15vh] bg-black flex items-center justify-center text-[10px] md:text-sm tracking-[0.2em] relative">
      {!menuOpen && (
      <div className="hidden md:flex absolute left-6">
        <Link
          to="/photofolio/"
          onClick={handleNavigate}
          className="text-xs md:text-sm tracking-widest hover:opacity-70 transition-opacity uppercase"
        >
          <span className="font-medium">JM</span>Photos
        </Link>
      </div>
      )}

      {/* Page Title / Dropdown Menu */}
      {currentTitle && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out
            ${
              currentTitle === "About" || showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
        >
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="text-sm md:text-base tracking-widest hover:opacity-70 transition-opacity uppercase"
              aria-label="Open menu"
            >
              {currentTitle}
            </button>
          )}

          <DropdownMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>
      )}

      {/* Slider */}
      {!menuOpen && (
      <div className="absolute right-6 hidden md:flex items-center space-x-2">
        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={layoutValue}
          onChange={(e) => setLayoutValue(Number(e.target.value))}
          className="w-28 h-1 rounded-full bg-white/50 accent-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/80 focus:outline-none"
          style={{ WebkitAppearance: "none", appearance: "none" }}
        />
      </div>
      )}
    </header>
  );
}
