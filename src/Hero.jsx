import { Link } from "react-router-dom";
import Transition from "./Transition";

function Hero() {
  return (
    <Transition>
      <section className="relative w-screen h-screen overflow-hidden">
        <img
          src="/photofolio/ireland/DSC04136.JPG"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="fixed top-12 text-3xl md:text-4xl font-light">
            <span className="font-normal">JM</span>Photos
          </h1>

          {/* Nav */}
          <nav className="flex flex-col space-y-6 md:space-y-10 text-center tracking-wide text-3xl sm:text-4xl md:text-6xl w-full pb-16">
            
            <Link
              to="/photofolio/featured"
              className="group relative flex justify-center opacity-80 hover:opacity-100 transition duration-500"
            >
              Featured
              <span className="hidden md:block absolute right-[20vw] opacity-0 translate-x-4
                               group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                ☞
              </span>
            </Link>

            <Link
              to="/photofolio/gallery"
              className="group relative flex justify-center opacity-80 hover:opacity-100 transition duration-500"
            >
              Gallery
              <span className="hidden md:block absolute left-[20vw] opacity-0 translate-x-4
                               group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                ☜
              </span>
            </Link>

            <Link
              to="/photofolio/about"
              className="group relative flex justify-center opacity-80 hover:opacity-100 transition duration-500"
            >
              About
              <span className="hidden md:block absolute top-full mt-6 opacity-0 translate-y-2
                               group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                ☟
              </span>
            </Link>

          </nav>
        </div>
      </section>
    </Transition>
  );
}

export default Hero;
