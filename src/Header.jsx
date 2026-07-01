import { useEffect, useState } from "react";
import Filter from "./Filter";

export default function Header({
  filters,
  selectedFilters,
  setSelectedFilters,
}) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full flex justify-center pt-8 pb-4 md:pt-12 md:pb-6 px-4 md:px-0 sticky top-0 z-50 bg-[#000900] backdrop-blur-md font-light transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full">
          <div className="text-center">
            <a
              href="/photofolio"
              className="group text-white/80 transition text-xl md:text-2xl font-light tracking-[0.2em]"
            >
              <span className="inline-block transition-all duration-700 pt-1 pb-4">
                JM
              </span>
              <span className="text-neutral-400">
                Photography
              </span>
            </a>
          </div>

          <Filter
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
      </div>
    </header>
  );
}