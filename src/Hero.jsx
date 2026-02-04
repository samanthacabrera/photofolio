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

        <div className="absolute inset-0 bg-black/20 z-10" />
        
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

        <div className="relative z-30 flex justify-center items-center h-screen">
          <h2 className="font-bold text-2xl md:text-4xl tracking-[0.35em]">
            <span className="opacity-80">JM</span>
            <span className="opacity-60">Photography</span>
          </h2>
        </div>
      </section>
    </Transition>
  );
}

export default Hero;
