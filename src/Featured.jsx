import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function Featured({ layoutValue }) {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  const articleLayoutMap = {
    1: "md:flex flex-col",
    2: "md:grid md:grid-cols-2",
    3: "md:grid md:grid-cols-[3fr_2fr]",
    4: "md:grid md:grid-cols-[4fr_1fr]",
  };

  return (
    <>
      <Transition>
      <section
        id="featured"
        className="flex flex-col items-center min-h-screen max-w-7xl mx-4 md:mx-auto py-6 md:py-24"
      >
        <div
          className={`
            ${
              layoutValue <= 1
                ? "flex flex-col md:flex-row gap-[10vh]"
                : "flex flex-col gap-[20vh]"
            }
          `}
        >
          {featuredPhotos.map((photo, index) => (
            <article
              key={photo.id}
              className={`gap-6
                ${articleLayoutMap[layoutValue]}
                ${
                  index % 2 === 1 && layoutValue === 4
                    ? "md:[direction:rtl]"
                    : ""
                }
              `}
            >
              <div className="relative overflow-hidden rounded-sm shadow-lg">
                <img
                  src={photo.src}
                  alt={photo.desc}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[101%]"
                />
              </div>

              <div className="self-start flex flex-col gap-4">
                <p className="text-sm md:text-base uppercase tracking-widest text-neutral-500">
                  {photo.location} {photo.year}
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold tracking-widest">
                  {photo.desc}
                </h2>

                {photo.featuredText && (
                  <p className="normal-case text-justify">
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
