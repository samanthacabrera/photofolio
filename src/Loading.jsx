import { useEffect, useRef } from "react";

export default function Loading({ onFinish }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const transition =
      "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1.5s ease";

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.filter = "blur(10px)";

    setTimeout(() => {
      el.style.transition = transition;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.filter = "blur(0px)";
    }, 50);

    setTimeout(() => {
      el.style.opacity = "0";
      el.style.filter = "blur(10px)";
    }, 2000);

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111211] text-white">
      <h1
        ref={titleRef}
        className="group text-3xl md:text-4xl tracking-[0.4em] font-light"
      >
        <span className="inline-block transition-all duration-700 group-hover:tracking-[0.6em]">
          JM
        </span>
        <span className="ml-3 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
          Photography
        </span>
      </h1>
    </div>
  );
}