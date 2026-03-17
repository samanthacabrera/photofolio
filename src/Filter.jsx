import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Filter({  filters = {}, selectedFilters, setSelectedFilters  }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (field, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fields = Object.keys(filters || {});

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="m-4 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors duration-300 z-50"
        aria-label="Toggle Filter"
      >
        <div className="w-6 h-[2px] bg-white mb-1"></div>
        <div className="w-6 h-[2px] bg-white mb-1"></div>
        <div className="w-6 h-[2px] bg-white"></div>
      </button>

      <AnimatePresence>
        {open && fields.length > 0 && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 w-full h-[50vh] bg-black/95 backdrop-blur-md shadow-lg flex flex-col items-center justify-center space-y-6 p-6 overflow-y-auto"
          >
            <button
              className="absolute top-4 right-6 text-white text-2xl"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            {fields.map((field) => (
              <div key={field} className="flex flex-wrap justify-center gap-3">
                <span className="text-white uppercase text-xs tracking-widest mr-2">{field}:</span>

                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                    selectedFilters[field] === "all"
                      ? "bg-white text-black"
                      : "bg-black text-white border border-white/30 hover:bg-white/10"
                  }`}
                  onClick={() => handleSelect(field, "all")}
                >
                  All
                </button>

                {filters[field].map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                      selectedFilters[field] === option
                        ? "bg-white text-black"
                        : "bg-black text-white border border-white/30 hover:bg-white/10"
                    }`}
                    onClick={() => handleSelect(field, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}