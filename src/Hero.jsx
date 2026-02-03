import { useNavigate, Link } from "react-router-dom";
import Transition from "./Transition";

function Hero() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <Transition>
      <section className="relative w-screen h-[100dvh] bg-black">
        <img
          src="/photofolio/ireland/DSC04136.JPG"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-30 flex pt-12 justify-center h-screen">
          <h2 className="font-bold text-2xl tracking-[0.35em]">
            <span className="opacity-90 mr-2">JM</span>
            <span className="opacity-70">Photography</span>
          </h2>
        </div>

        {/* Nav */}
        <nav className="relative z-30 flex flex-col items-center space-y-4 -mt-64 py-12 text-lg tracking-[0.35em] font-medium">
          {[
            { label: "Featured", path: "/photofolio/featured" },
            { label: "Gallery", path: "/photofolio/gallery" },
            { label: "About", path: "/photofolio/about" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.path);
              }}
              className="relative opacity-70 hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
    </Transition>
  );
}

export default Hero;
