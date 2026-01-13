import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
  const location = useLocation();
  const [showTitle, setShowTitle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const pageTitles = {
    "/photofolio/": "Gallery",
    "/photofolio/featured": "Featured",
    "/photofolio/gallery": "Gallery",
    "/photofolio/about": "About",
  };

  const currentTitle = pageTitles[location.pathname] || "";

  const isHome = location.pathname === "/photofolio/";

  useEffect(() => {
    if (!isHome) return setShowTitle(true);

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const scrollBreakpoint = isMobile ? 90 : 750;
      setShowTitle(window.scrollY > scrollBreakpoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavigate = () => {
    setMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-screen h-[8vh] bg-white flex items-center justify-center text-neutral-800 text-[10px] md:text-sm tracking-[0.2em] relative">
      {(!isHome || showTitle) && (
        <div className="absolute left-4">
          <Link
            to="/photofolio/"
            onClick={handleNavigate}
            className="text-xs md:text-sm tracking-widest hover:opacity-70 transition-opacity uppercase" 
          >
            <span className="font-medium">JM</span>Photos
          </Link>
        </div>
      )}

      {currentTitle && (
        <div
          ref={menuRef}
          className={`absolute left-1/2 -translate-x-1/2
            transition-all duration-300 ease-out
            ${
              currentTitle === "About"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }
          `}
        >
          {!menuOpen && (
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-sm md:text-base tracking-widest hover:opacity-70 transition-opacity uppercase"
            aria-label="Open menu"
          >
            {currentTitle}
          </button>
          )}

          {menuOpen && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen h-[95vh] p-8 flex flex-col items-center text-2xl md:text-3xl tracking-[0.15em] font-medium z-50 ${
              darkMode ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
              {[
                { label: "Home", path: "/photofolio/" },
                { label: "Featured", path: "/photofolio/featured" },
                { label: "Gallery", path: "/photofolio/gallery" },
                { label: "About", path: "/photofolio/about" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={handleNavigate}
                  className="py-4 hover:opacity-50 hover:translate-x-4 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-5xl font-light hover:opacity-50 transition-opacity duration-200"
              aria-label="Close menu"
            >
              ×
            </button>
            </div>
          )}
        </div>
      )}

      {(!isHome || showTitle) && (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-4 flex items-center space-x-1 hover:opacity-70 transition-opacity uppercase"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" strokeWidth="1" />
                <line x1="12" y1="2" x2="12" y2="5" strokeWidth="1" strokeLinecap="round"/>
                <line x1="12" y1="19" x2="12" y2="22" strokeWidth="1" strokeLinecap="round"/>
                <line x1="2" y1="12" x2="5" y2="12" strokeWidth="1" strokeLinecap="round"/>
                <line x1="19" y1="12" x2="22" y2="12" strokeWidth="1" strokeLinecap="round"/>
                <line x1="5" y1="5" x2="7" y2="7" strokeWidth="1" strokeLinecap="round"/>
                <line x1="17" y1="17" x2="19" y2="19" strokeWidth="1" strokeLinecap="round"/>
                <line x1="5" y1="19" x2="7" y2="17" strokeWidth="1" strokeLinecap="round"/>
                <line x1="17" y1="7" x2="19" y2="5" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              <span className="tracking-[0.2em]">Light</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21.752 15.002A9 9 0 1112 3a9.003 9.003 0 009.752 12.002z" />
              </svg>
              <span className="tracking-[0.2em]">Dark</span>
            </>
          )}
        </button>
      )}
    </header>
  );
}
