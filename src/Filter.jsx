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
        className="sticky top-4 left-4 z-50 px-4 py-6
                  bg-[#111211] text-white text-sm font-light tracking-[0.25em] hover:tracking-widest uppercase
                  shadow-lg 
                  rounded-lg 
                  flex items-center justify-center
                  hover:scale-95 hover:border transition-all duration-300"

        onClick={() => setIsOpen(true)}
      >
        Filter
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              className="fixed top-0 left-0 h-full w-72 md:w-80 bg-white/10 dark:bg-black/10 backdrop-blur-md z-50 flex flex-col p-6 space-y-6 overflow-y-auto text-center"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                className="self-end text-white/70 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-white/80 tracking-[0.25em] my-4">
                Filter Gallery By
              </h2>

              <div className="flex flex-col gap-4">
                {Object.keys(filters).map(field => (
                  <div key={field} className="flex flex-col items-center">
                    <span className="tracking-[0.2em] text-white/70 text-lg my-6 font-light">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleSelect(field, 'all')}
                        className={`px-3 py-1 rounded-md text-white/70 transition-colors ${
                          selectedFilters[field] === 'all'
                            ? 'bg-black/30 text-white'
                            : 'hover:bg-white/20 dark:hover:bg-black/20'
                        }`}
                      >
                        All
                      </button>
                      {filters[field].map(option => (
                        <button
                          key={option}
                          onClick={() => handleSelect(field, option)}
                          className={`px-3 py-1 rounded-md text-white/70 transition-colors ${
                            selectedFilters[field] === option
                              ? 'bg-black/30 text-white'
                              : 'hover:bg-white/20 dark:hover:bg-black/20'
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
                className="mt-4 px-3 py-1 rounded-md text-white/80 bg-black/20 hover:bg-black/30 transition-colors "
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