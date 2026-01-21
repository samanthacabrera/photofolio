import { useState } from "react";
import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function Featured() {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  const [openId, setOpenId] = useState(null);
  const [layout, setLayout] = useState("expanded"); 

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const isCompact = layout === "compact";

  return (
    <>
      <Transition>
        <section
          id="featured"
          className="flex flex-col min-h-screen max-w-7xl mx-6 md:mx-auto py-12">
          {/* Layout Toggle */}
          <div className="group hidden md:flex items-center w-fit mb-12">
            <p className="text-xs font-medium opacity-70 mx-2">Expanded</p>
            <div className="relative w-20 h-3">
              <div className="absolute top-1/2 w-full h-[2px] bg-current opacity-30 group-hover:opacity-60 rounded-full -translate-y-1/2"></div>
              <div
                className={`absolute top-1/2 w-3 h-3 bg-current rounded-full shadow-sm -translate-y-1/2 transition-all duration-200 ${
                  isCompact ? "left-full -translate-x-full" : "left-0"
                }`}
                onClick={() => setLayout(isCompact ? "expanded" : "compact")}
                style={{ cursor: "pointer" }}
              ></div>
              <div
                className="absolute inset-0"
                onClick={() => setLayout(isCompact ? "expanded" : "compact")}
              ></div>
            </div>
            <p className="text-xs font-medium opacity-70 mx-2">Compact</p>
          </div>
          {/* Grid */}
          <ul className={`w-full gap-6 ${
              isCompact
                ? "grid grid-cols-1 gap-6" 
                : "flex flex-col gap-48 py-12" 
            }`}>
            {featuredPhotos.map((photo, index) => {
              const isOpen = openId === photo.id;
              const expandedActive = !isCompact || isOpen;
              const reverse = !isCompact && index % 2 === 1; 

              return (
                <li key={photo.id} className="pb-12">
                  <div
                    className={`flex transition-all duration-500 ease-in-out ${
                      isCompact && isOpen
                        ? "flex-col gap-6"
                        : expandedActive
                        ? "gap-10"
                        : "gap-6"
                    } ${reverse && !isCompact ? "md:flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedActive
                          ? "w-full h-[75vh]"
                          : "w-64 h-48 shrink-0"
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.desc}
                        className={`h-full object-cover
                          ${(isCompact && isOpen)
                              ? "w-full md:w-2/3 mx-auto" 
                              : "w-full" 
                          }`}
                      />
                    </div>
                    {!(isCompact && isOpen) && (
                      <div
                        className={`flex flex-col transition-all duration-500 ease-in-out
                          ${isCompact
                              ? "w-full" 
                              : "w-full md:w-1/5" 
                          }`}
                      >
                        <p
                          className={`uppercase tracking-widest opacity-60 mb-2 ${
                            expandedActive && !isCompact ? "text-sm" : "text-xs"
                          }`}
                        >
                          {photo.location} {photo.year}
                        </p>

                        <h3 className="tracking-widest font-medium mb-4">
                          {photo.desc}
                        </h3>

                        {!isCompact && photo.featuredText && (
                          <p className="normal-case text-sm md:text-base tracking-wide leading-loose">
                            {photo.featuredText}
                          </p>
                        )}

                        {photo.featuredText && isCompact && (
                          <button
                            onClick={() => toggle(photo.id)}
                            className="self-start text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                          >
                            Read more
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Compact mode */}
                  {photo.featuredText && isCompact && isOpen && (
                    <div className="flex flex-col items-center md:w-2/3 mx-auto mt-4 transition-all duration-500 ease-in-out">
                      <p className="uppercase tracking-widest opacity-60 mb-2 text-center">
                        {photo.location} {photo.year}
                      </p>
                      <h3 className="tracking-widest font-medium mb-4 text-center">
                        {photo.desc}
                      </h3>
                      <p className="normal-case text-sm md:text-base tracking-wide leading-loose text-center ">
                        {photo.featuredText}
                      </p>
                      <button
                        onClick={() => toggle(photo.id)}
                        className="mt-4 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </Transition>

      <ScrollToTop />
    </>
  );
}

export default Featured;
