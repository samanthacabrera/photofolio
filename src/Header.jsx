import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const PAGE_TITLES = {
  "/photofolio/": "Home",
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
      className="dropdown-menu absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen h-[95vh] bg-black p-8 flex flex-col items-center text-2xl md:text-3xl tracking-[0.15em] font-medium z-50"
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


export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [isLight, setIsLight] = useState(
    localStorage.getItem("theme") === "light"
  );  
  const pathname = location.pathname;
  const isHome = pathname === "/photofolio/";
  const currentTitle = PAGE_TITLES[pathname] || "";
  const shouldShowHeader = !isHome && showTitle;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setShowTitle(true);
      return;
    }
  }, [isHome]);

  useEffect(() => {
    const root = document.documentElement;

    if (isLight) {
      root.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);


  const handleNavigate = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!shouldShowHeader) return null;

  return (
    <header className="header sticky top-0 z-50 w-screen h-[10vh] bg-black flex items-center justify-center text-[10px] md:text-sm tracking-[0.2em] relative">
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

      {/* Light/Dark Toggle  */}
      {!menuOpen && (
        <div className="hidden md:flex absolute right-6">
          <button
            onClick={() => setIsLight(!isLight)}
            aria-label="Toggle light/dark mode"
            className="flex items-center justify-center w-8 h-8 hover:opacity-70 transition-opacity"
          >
            {isLight ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="1" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="1" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="4.22" x2="7.07" y2="7.07" />
                <line x1="16.93" y1="16.93" x2="19.78" y2="19.78" />
                <line x1="4.22" y1="19.78" x2="7.07" y2="16.93" />
                <line x1="16.93" y1="7.07" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </header>   
  );
}

