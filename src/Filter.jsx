import { useState, useEffect, useRef } from "react";

export default function Filter({ filters, selectedFilters, setSelectedFilters }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (field, value) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));
    setOpen(false);
  };

  const reset = () => {
    const r = {};
    Object.keys(filters).forEach((f) => (r[f] = "all"));
    setSelectedFilters(r);
  };

  return (
    <div ref={wrapperRef} className="relative z-50 flex flex-col items-end">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 border border-white/40 hover:border-white/60 transition rounded-sm group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white/80 group-hover:text-white transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      </button>

      <div
        className={`absolute top-12 right-0 w-64 border-b border-x border-black bg-[#000900] backdrop-blur-xl rounded-2xl shadow-2xl transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="">
          {Object.keys(filters).map((field) => (
            <div key={field} className="border-t border-white/10 pt-2 px-3">
              <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 text-right font-semibold mb-2">
                {field}
              </div>

              <button
                onClick={() => handleSelect(field, "all")}
                className={`w-full text-right p-1 text-[11px] tracking-[0.3em] uppercase transition ${
                  selectedFilters[field] === "all"
                    ? "text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                ALL
              </button>

              {filters[field].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(field, option)}
                  className={`w-full text-right p-1 text-[11px] tracking-[0.3em] uppercase transition ${
                    selectedFilters[field] === option
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}

          <div className="border-t border-white/10 mt-2 pt-2 px-3">
            <button
              onClick={reset}
              className="text-[10px] text-center w-full tracking-[0.4em] uppercase text-white/30 hover:text-white/70 transition"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}