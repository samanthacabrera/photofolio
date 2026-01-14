import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ layoutValue, setLayoutValue }) {
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
    if (!isHome) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
    setMenuOpen(false); 
  }, [location.pathname, isHome]);


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
  <>
    {(!isHome || showTitle) && (
    <header className="sticky top-0 z-50 w-screen h-[5vh] bg-black flex items-center justify-center text-[10px] md:text-sm tracking-[0.2em] relative">
        <div className="absolute left-4">
          <Link
            to="/photofolio/"
            onClick={handleNavigate}
            className="text-xs md:text-sm tracking-widest hover:opacity-70 transition-opacity uppercase" 
          >
            <span className="font-medium">JM</span>Photos
          </Link>
        </div>


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
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen h-[95vh] bg-black p-8 flex flex-col items-center text-2xl md:text-3xl tracking-[0.15em] font-medium z-50" >
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
                  className="py-4 hover:opacity-50 hover:-translate-y-2 transition-all duration-200"
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
      <div className="absolute right-4 hidden md:flex items-center space-x-2">
          <input
            type="range"
            min={1}
            max={4}
            step={1}
            value={layoutValue}
            onChange={(e) => setLayoutValue(Number(e.target.value))}
            className="w-28 h-1 rounded-full bg-white/50 accent-white cursor-pointer transition-all duration-300 ease-in-out
                      hover:bg-white/80 focus:outline-none"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
        </div>
      )}
    </header>
    )}
    </>
  );
}
