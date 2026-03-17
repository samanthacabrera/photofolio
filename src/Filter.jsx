import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Filter({ filters = {}, selectedFilters, setSelectedFilters }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (field, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fields = Object.keys(filters || {});

  return (
    <div className="relative w-full z-50">
      
      <div className="fixed top-0 left-0 p-6 z-50">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="group flex flex-col gap-[5px] opacity-80 hover:opacity-100 transition-all duration-500"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-white origin-center"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[1px] bg-white"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-white origin-center"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && fields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-start justify-center h-[60vh] px-6 pt-32"
            style={{ background: "#111211" }} 
          >
            <div className="w-full max-w-3xl space-y-12">

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1 }}
                className="text-md tracking-[0.4em] uppercase"
              >
                Filter Gallery By:
              </motion.h2>

              {fields.map((field, fieldIndex) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.1 * fieldIndex,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-4"
                >
                  <p className="text-white/40 italic tracking-[0.25em] text-md">
                    {field}
                  </p>

                  <div className="flex flex-wrap gap-6 text-lg tracking-wide">
                    
                    <button
                      onClick={() => handleSelect(field, "all")}
                      className={`relative transition-all duration-500 ${
                        selectedFilters[field] === "all"
                          ? "text-white"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      All
                      {selectedFilters[field] === "all" && (
                        <motion.span
                          layoutId={`underline-${field}`}
                          className="absolute left-0 -bottom-1 h-[1px] w-full bg-white/80"
                        />
                      )}
                    </button>

                    {filters[field].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelect(field, option)}
                        className={`relative transition-all duration-500 ${
                          selectedFilters[field] === option
                            ? "text-white"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {option}
                        {selectedFilters[field] === option && (
                          <motion.span
                            layoutId={`underline-${field}`}
                            className="absolute left-0 -bottom-1 h-[1px] w-full bg-white/80"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}