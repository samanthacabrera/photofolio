import Transition from "./Transition";
import ScrollToTop from "./ScrollToTop";

function About() {
  
  return (
    <Transition>
      <section
        id="about"
        data-title="About"
        className="min-h-screen relative flex flex-col items-center justify-center max-w-6xl mx-6 md:mx-auto"
      >
        <div
          className="text-center text-xs md:text-sm tracking-widest max-w-sm leading-loose mx-auto space-y-8"
        >
          <p>
            I am a photographer based in The Netherlands.
          </p>
          <p>
            I am self-taught and began photographing in 2020. All photos are
            captured with a Sony Alpha a6000 under natural light.
          </p>
          <p>
            This is my collection of places I’ve visited that felt worth
            holding onto.
          </p>
        </div>
      </section>
    <ScrollToTop/>
    </Transition>
  );
}

export default About;
