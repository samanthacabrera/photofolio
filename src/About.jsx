import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function About() {
  
  return (
    <Transition>
      <section
        id="about"
        data-title="About"
        className="relative flex flex-col items-center justify-center  max-w-6xl mx-6 md:mx-auto"
      >
        {/* <div className="relative h-fit w-full flex flex-col items-end justify-end pb-36 text-right">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-[67vw] bg-white/40" />
            <p className="text-xl md:text-4xl tracking-[0.3em] font-bold text-white/80">
              About
            </p>
          </div>
        </div> */}

        <header className="pb-20 max-w-6xl mx-auto text-center">
          <h1 className="font-bold text-2xl md:text-4xl tracking-[0.35em] opacity-70">
            About
          </h1>
        </header>
        <div
          className="text-center text-sm tracking-widest max-w-xs mx-auto space-y-8"
        >
          <p>
            I am a photographer based in The Netherlands.
          </p>
          <p>
            I am self-taught and began photographing in 2020. All photos are
            captured with a Sony Alpha a6000 under natural light.
          </p>
          <p>
            This is my personal collection of places I’ve visited that felt worth
            holding onto.
          </p>
        </div>

        <p className="translate-y-[20vh] pb-2 text-[10px] md:text-xs tracking-wide">
          This site was made by
          <a
            href="https://samoontha.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition pl-1"
          >
            Sam Cabrera
          </a>
        </p>
      </section>
    <ScrollToTop/>
    </Transition>
  );
}

export default About;
