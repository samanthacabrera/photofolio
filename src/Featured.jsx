import { useState } from "react";
import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function Featured() {
  const featuredPhotos = photos.filter((photo) => photo.featured);
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <Transition>
        <section
          id="featured"
          className="flex flex-col items-center min-h-screen max-w-7xl mx-6 md:mx-auto py-12"
        >
          <ul className="w-full flex flex-col gap-12">
            {featuredPhotos.map((photo) => {
              const isOpen = openId === photo.id;

              return (
                <li key={photo.id} className="pb-12">
                  <div
                    className={`transition-all duration-500 ease-in-out
                      ${isOpen ? "flex gap-8" : "flex gap-6"}
                    `}
                  >
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out
                        ${
                          isOpen
                            ? "w-4/5 h-[70vh]"
                            : "w-64 h-44 shrink-0"
                        }
                      `}
                    >
                      <img
                        src={photo.src}
                        alt={photo.desc}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`flex flex-col transition-all duration-500 ease-in-out
                        ${
                          isOpen
                            ? "w-1/5"
                            : ""
                        }
                      `}
                    >
                      <p className={`uppercase tracking-widest opacity-60 mb-2
                       ${isOpen ? "text-2xl" : "text-xs"}
                      `}>
                        {photo.location} {photo.year}
                      </p>

                      <h3 className="tracking-widest font-medium mb-4">
                        {photo.desc}
                      </h3>

                      {photo.featuredText && (
                        <button
                          onClick={() => toggle(photo.id)}
                          className="self-start text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                        >
                          {isOpen ? "" : "Read more"}
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out
                      ${isOpen ? "grid-rows-[1fr] mt-8" : "grid-rows-[0fr]"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <p className="normal-case tracking-wide leading-loose">
                        {photo.featuredText}
                      <button
                        onClick={() => toggle(photo.id)}
                        className="pl-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                      >
                        {isOpen ? "Close" : ""}
                      </button>
                      </p>
                    </div>
                  </div>
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
