import photos from "./photos";
import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function Featured() {
  const featuredPhotos = photos.filter((photo) => photo.featured);

  return (
    <>
      <Transition>
        <section
          id="featured"
          className="flex flex-col items-center min-h-screen max-w-screen mx-8 py-6 md:py-24"
        >
          <div
            className="flex flex-col gap-[25vh] md:gap-[50vh]"
          >
            {featuredPhotos.map((photo, index) => (
              <article
                key={photo.id}
                className={`md:grid md:grid-cols-[4fr_1fr] gap-8
                  ${
                    index % 2 === 1
                      ? "md:[direction:rtl]"
                      : ""
                  }
                `}
              >
                <div className="relative overflow-hidden rounded-sm shadow-lg md:h-[75vh]">
                  <img
                    src={photo.src}
                    alt={photo.desc}
                    className="w-full h-full object-cover transition-transform duration-300"/>
                </div>

                <div className="flex flex-col self-start gap-4">
                  <p className="uppercase tracking-widest text-neutral-500">
                    {photo.location} {photo.year}
                  </p>

                  <h2 className="font-semibold tracking-widest text-xl">
                    {photo.desc}
                  </h2>

                  {photo.featuredText && (
                    <p className="normal-case text-md text-justify tracking-tight w-full leading-relaxed">
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

