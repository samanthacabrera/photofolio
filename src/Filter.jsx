import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterDrawer({ filters, selectedFilters, setSelectedFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

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
        className="sticky top-4 left-full mx-4 z-50 backdrop-blur-sm text-lg text-white opacity-70 hover:opacity-100 hover:scale-95 transition-all duration-300 font-light tracking-[0.25em] uppercase"
        onClick={() => setIsOpen(true)}
      >
        Filter
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
              className="fixed top-0 right-0 h-full w-72 md:w-80 bg-white/10 dark:bg-black/10 backdrop-blur-md shadow-2xl z-50 flex flex-col p-6 space-y-6 overflow-y-auto text-right"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                className="self-end text-white/70 hover:text-white dark:hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-md tracking-[0.25em] text-white/80">
                Filter Gallery By: 
              </h2>

              <div className="flex flex-col gap-4">
                {Object.keys(filters).map((field) => (
                  <div key={field} className="flex flex-col items-end">
                    <span className="font-medium text-white/70 text-xl mb-2 tracking-wide font-light">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() => handleSelect(field, 'all')}
                        className={`px-3 py-1 rounded-lg text-lg font-light tracking-wide transition-colors ${
                          selectedFilters[field] === 'all'
                            ? 'bg-black/30 text-white'
                            : 'bg-black/10 text-white/70 hover:bg-white/20 dark:hover:bg-black/20'
                        }`}
                      >
                        All
                      </button>
                      {filters[field].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelect(field, option)}
                          className={`px-3 py-1 rounded-lg text-lg font-light tracking-wide transition-colors ${
                            selectedFilters[field] === option
                              ? 'bg-black/30 text-white'
                              : 'bg-black/10 text-white/70 hover:bg-white/20 dark:hover:bg-black/20'
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
                className="self-end px-3 py-1 my-2 rounded-lg text-lg text-white/80 bg-black/20 dark:bg-white/10 hover:bg-black/30 dark:hover:bg-white/20 text-sm tracking-wide font-light transition-colors"
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