import Transition from "./Transition";

function About() {
  
  return (
    <Transition>
      <div
        id="about"
        className="relative flex flex-col items-center justify-center min-h-[90vh] max-w-lg mx-8 md:mx-auto"
      >
        <div
          className="text-left leading-relaxed tracking-wide normal-case space-y-4"
        >
          <p>
            I am a photographer based in Utrecht, Netherlands.
          </p>

          <p>
            This is my personal collection of places I’ve visited that felt worth
            holding onto.
          </p>

          <p>
            I am self-taught and began photographing in 2020. All photos are
            captured with a Sony Alpha a6000 under natural light.
          </p>
        </div>

        <p className="fixed bottom-2 text-[10px] md:text-xs tracking-wide">
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
      </div>
    </Transition>
  );
}

export default About;
