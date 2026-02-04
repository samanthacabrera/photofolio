import Transition from "./Transition";

function Hero() {
  return (
    <Transition>
      <section
        id="home"
        data-title="Home"
        className="relative w-screen h-[100dvh] bg-black">
        <img
          src="/photofolio/ireland/DSC04136.JPG"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-30 flex justify-center items-center h-screen">
          <h2 className="font-bold text-6xl tracking-[0.35em]">
            <span className="opacity-80">JM</span>
            <span className="opacity-60">Photography</span>
          </h2>
        </div>
      </section>
    </Transition>
  );
}

export default Hero;
