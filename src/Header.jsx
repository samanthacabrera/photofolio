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
      <div className="w-full md:w-[80%] min-h-[60px] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          <div className="md:col-span-8 flex flex-col gap-3">
            <a
              href="/photofolio"
              className="group text-white/80 transition text-2xl md:text-4xl font-light tracking-[0.2em]"
            >
              <span className="inline-block transition-all duration-700 font-medium">
                JM
              </span>
              <span>
                Photography
              </span>
            </a>

            <div className="relative flex flex-col gap-6 text-white/70">
              <p className="text-sm md:text-base tracking-widest">
                All photos captured with Sony Alpha a6000 under natural light.
              </p>
            </div>
          </div>

          <Filter
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />

        </div>
      </div>
    </header>
  );
}