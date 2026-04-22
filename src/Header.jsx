import Filter from "./Filter";

export default function Header({
  filters,
  selectedFilters,
  setSelectedFilters,
}) {
  return (
    <header className="w-full flex justify-center min-h-[20vh] py-10 md:py-20 px-4 md:px-0">
      <div className="w-full md:w-[80%] flex flex-col justify-between">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          <div className="md:col-span-8 flex flex-col gap-8">

            <a href="/photofolio" className="uppercase flex flex-col">
              <span className="text-white/80 hover:text-white transition text-5xl md:text-8xl font-extralight tracking-[0.08em] leading-[0.85]">
                JM <span className="opacity-80 -ml-4 md:-ml-8">Photography</span>
              </span>
            </a>

            <div className="relative pl-0 md:pl-2 flex flex-col gap-6 text-white/60">
              {/* <p className="text-xs md:text-sm tracking-[0.3em] leading-loose">
                Based in The Netherlands.
              </p> */}

              <p className="text-xs md:text-sm tracking-[0.3em] leading-loose">
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