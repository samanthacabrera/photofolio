import { useState, useEffect, useRef } from "react";

export default function Filter({
  filters,
  selectedFilters,
  setSelectedFilters,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (field, value) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    const r = {};
    Object.keys(filters).forEach((f) => (r[f] = "all"));
    setSelectedFilters(r);
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed top-6 right-4 md:top-8 md:right-8 z-50"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-11 h-11 hover:scale-105 transition duration-300 flex items-center justify-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="square"
            d="M4 6h16M7 12h10M10 18h4"
          />
        </svg>
      </button>

      <div
        className={`absolute top-14 right-0 w-[380px] bg-black border border-white/15 transition-all duration-200 origin-top-right ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-8 py-7">
          <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-6">
            Filters
          </div>

          <div className="border-t border-white/20" />

          <div className="py-6 space-y-7">
            {Object.keys(filters).map((field) => (
              <div
                key={field}
                className="grid grid-cols-[88px_1fr] gap-6 items-start"
              >
                <div className="pt-1 text-[9px] uppercase tracking-[0.3em] text-white/60">
                  {field}
                </div>

                <div className="flex flex-col items-start">
                  <button
                    onClick={() => handleSelect(field, "all")}
                    className={`text-[13px] leading-7 font-light transition-colors ${
                      selectedFilters[field] === "all"
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    All
                  </button>

                  {filters[field].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(field, option)}
                      className={`text-[13px] leading-7 font-light transition-colors ${
                        selectedFilters[field] === option
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-5 flex justify-between items-center">
            <button
              onClick={reset}
              className="text-[9px] uppercase tracking-[0.35em] text-white/60 hover:text-white transition-colors"
            >
              Reset
            </button>

            <button
              onClick={() => setOpen(false)}
              className="text-[9px] uppercase tracking-[0.35em] text-white/60 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}