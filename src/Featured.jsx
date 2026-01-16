import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function Featured({ layoutValue }) {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  const articleLayout = "md:grid md:grid-cols-[5fr_2fr]";

  return (
    <>
      <Transition>
        <section
          id="featured"
          className="flex flex-col items-center min-h-screen max-w-7xl mx-4 md:mx-auto py-6 md:py-24"
        >
          <div
            className={`
              flex flex-col
              ${
                layoutValue === 1
                  ? "gap-[25vh]"
                  : layoutValue === 2
                  ? "gap-[30vh]"
                  : "gap-[35vh]"
              }
            `}
          >
            {featuredPhotos.map((photo, index) => (
              <article
                key={photo.id}
                className={`
                  ${articleLayout}
                  ${
                    layoutValue === 1
                      ? "gap-6"
                      : layoutValue === 2
                      ? "gap-8 md:gap-10"
                      : "gap-10 md:gap-12"
                  }
                  ${
                    index % 2 === 1
                      ? "md:[direction:rtl]"
                      : ""
                  }
                `}
              >
                <div className="relative overflow-hidden rounded-sm shadow-lg md:h-[60vh]">
                  <img
                    src={photo.src}
                    alt={photo.desc}
                    className={`
                      w-full h-full object-cover transition-transform duration-300
                      ${
                        layoutValue === 1
                          ? ""
                          : layoutValue === 2
                          ? "scale-[1.015]"
                          : "scale-[1.025]"
                      }
                      group-hover:scale-[101%]
                    `}
                  />
                </div>

                <div
                  className={`
                    flex flex-col self-start
                    ${
                      layoutValue === 1
                        ? "gap-3"
                        : layoutValue === 2
                        ? "gap-5"
                        : "gap-6"
                    }
                  `}
                >
                  <p
                    className={`
                      uppercase tracking-widest text-neutral-500
                      ${
                        layoutValue === 1
                          ? "text-xs md:text-sm"
                          : layoutValue === 2
                          ? "text-sm md:text-base"
                          : "text-base"
                      }
                    `}
                  >
                    {photo.location} {photo.year}
                  </p>

                  <h2
                    className={`
                      font-semibold tracking-widest
                      ${
                        layoutValue === 1
                          ? "text-xl md:text-2xl"
                          : layoutValue === 2
                          ? "text-2xl md:text-3xl"
                          : "text-3xl md:text-4xl"
                      }
                    `}
                  >
                    {photo.desc}
                  </h2>

                  {photo.featuredText && (
                    <p
                      className={`
                        normal-case text-justify max-w-prose
                        ${
                          layoutValue === 1
                            ? "text-sm leading-relaxed"
                            : layoutValue === 2
                            ? "text-base leading-relaxed"
                            : "text-lg leading-relaxed"
                        }
                      `}
                    >
                      {photo.featuredText}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </Transition>

      <ScrollToTop />
    </>
  );
}

export default Featured;
