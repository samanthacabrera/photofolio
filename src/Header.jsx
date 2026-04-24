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
      className={`w-full flex justify-center pt-8 pb-4 md:pt-8 md:pb-6 px-4 md:px-0 sticky top-0 z-50 bg-[#000900] backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full md:w-[80%] flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          <div className="md:col-span-8 flex flex-col gap-3">
            <a href="/photofolio" className="uppercase flex flex-col">
              <span className="text-white/80 hover:text-white transition text-3xl md:text-4xl font-extralight tracking-wide">
                JM <span className="opacity-80 -ml-2 md:-ml-3">Photography</span>
              </span>
            </a>

            <div className="relative pl-0 md:pl-2 flex flex-col gap-6 text-white/60">
              <p className="text-xs md:text-base tracking-[0.3em] leading-loose">
                All photos are captured with a Sony Alpha a6000 under natural light.
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