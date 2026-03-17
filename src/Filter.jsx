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
    <div className="relative w-full z-50 overflow-hidden">
      <div className="fixed top-0 left-0 bg-[#111211]/20 backdrop-blur-md rounded-full flex justify-end p-4 z-50">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 flex flex-col justify-center items-center gap-[4px] hover:scale-105 transition-all duration-300"
          aria-label="Toggle Filter"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-5 h-[1.5px] bg-white block origin-center"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-[2px] bg-white block"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-5 h-[1.5px] bg-white block origin-center"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && fields.length > 0 && (
          <motion.div
            initial={{ y: "-110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 w-full h-[50vh] bg-[#111211] flex flex-col items-center justify-start p-8 overflow-y-auto overflow-x-hidden"
          >
            <h2 className="mr-auto text-xl text-white/60 mt-12 mb-2 tracking-[0.25em]">filter gallery by:</h2>

            {fields.map((field, fieldIndex) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * fieldIndex, duration: 0.3 }}
                className="w-full m-4 text-xl"
              >
                <p className="text-white/60 tracking-[0.2em] mb-2 italic">{field}</p>
                <div className="flex flex-wrap gap-4 tracking-widest">
                  <button
                    className={`text-white/50 font-light relative transition-colors duration-200 ${
                      selectedFilters[field] === "all" ? "text-white" : "hover:text-white"
                    }`}
                    onClick={() => handleSelect(field, "all")}
                  >
                    All
                    {selectedFilters[field] === "all" && (
                      <span className="absolute left-0 -bottom-[2px] h-[1px] w-full bg-white"></span>
                    )}
                  </button>

                  {filters[field].map((option) => (
                    <button
                      key={option}
                      className={`text-white/50 font-light relative transition-colors duration-200 ${
                        selectedFilters[field] === option ? "text-white" : "hover:text-white"
                      }`}
                      onClick={() => handleSelect(field, option)}
                    >
                      {option}
                      {selectedFilters[field] === option && (
                        <span className="absolute left-0 -bottom-[2px] h-[1px] w-full bg-white"></span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}