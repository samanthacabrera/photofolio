import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterDrawer({ filters, selectedFilters, setSelectedFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (field, value) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    const resetFilters = {};
    Object.keys(filters).forEach((field) => {
      resetFilters[field] = "all";
    });
    setSelectedFilters(resetFilters);
  };

  return (
    <>
      <button
        className="sticky top-4 left-4 z-50 w-12 h-12 flex items-center justify-center
                  rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/60 text-white/60 hover:text-white transition-all duration-300"
        onClick={() => setIsOpen(true)}
        aria-label="Open filters"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={drawerRef}
              className="fixed top-0 left-0 h-full w-72 md:w-80 bg-white/10 dark:bg-black/10 backdrop-blur-md z-50 flex flex-col p-6 overflow-y-auto text-center"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                className="self-start text-white/40 hover:text-white/80 transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              <div className="flex flex-col gap-4">
                {Object.keys(filters).map(field => (
                  <div key={field} className="flex flex-col items-center">
                    <span className="tracking-[0.25em] text-white/50 text-lg my-6 font-light uppercase">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleSelect(field, 'all')}
                        className={`px-3 py-1 rounded-full text-sm tracking-wide
                                    border transition-all duration-300
                                    ${
                                      selectedFilters[field] === 'all'
                                        ? 'border-white/40 text-white bg-white/10'
                                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 hover:bg-white/5'
                                    }`}
                      >
                        All
                      </button>
                      {filters[field].map(option => (
                        <button
                          key={option}
                          onClick={() => handleSelect(field, option)}
                          className={`px-3 py-1 rounded-full tracking-wide
                                      border transition-all duration-300
                                      ${
                                        selectedFilters[field] === option
                                          ? 'border-white/40 text-white bg-white/10'
                                          : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80 hover:bg-white/5'
                                      }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="mt-12 px-4 py-2 rounded-full text-sm tracking-[0.2em] uppercase
                border border-white/10 text-white/50 hover:border-white/30 hover:text-white hover:bg-white/5
                transition-all duration-300"
              >
                Reset All
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}