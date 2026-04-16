import Filter from "./Filter";

export default function Header({
  filters,
  selectedFilters,
  setSelectedFilters,
}) {
  return (
    <header className="w-full flex justify-center pt-12 md:pt-24 pb-4 md:pb-12 px-6 md:px-0">
      <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
        <div className="w-full flex items-end justify-between">
          <a href="/" className="group uppercase font-light tracking-[0.6em] text-xl md:text-2xl">
            <span className="in-block transition-all duration-700 group-hover:tracking-[0.9em]">
              JM
            </span>
            <span className="mt-2 opacity-80 tracking-[0.5em]">
              Photography
            </span>
          </a>

            <Filter
              filters={filters}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
        </div>

        <div className="w-full h-px bg-white/50" />
      </div>
    </header>
  );
}