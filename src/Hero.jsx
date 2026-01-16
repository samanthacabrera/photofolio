// import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Transition from "./Transition";

// const ScrambleText = ({ text, boldPrefix = "" }) => {
//   const [displayText, setDisplayText] = useState(text);
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const intervalRef = useRef(null);

//   const handleMouseEnter = () => {
//     let iteration = 0;
//     const totalLength = text.length;

//     clearInterval(intervalRef.current);

//     intervalRef.current = setInterval(() => {
//       setDisplayText(
//         text
//           .split("")
//           .map((char, i) =>
//             i < iteration
//               ? char
//               : letters[Math.floor(Math.random() * letters.length)]
//           )
//           .join("")
//       );

//       iteration += 0.25;

//       if (iteration >= totalLength) {
//         clearInterval(intervalRef.current);
//         setDisplayText(text);
//       }
//     }, 20);
//   };

//   return (
//     <span
//       onMouseEnter={handleMouseEnter}
//       onTouchStart={handleMouseEnter}
//       className="group inline-flex"
//     >
//       {displayText.split("").map((char, i) => (
//         <span
//           key={i}
//           className={`inline-block w-[1.5ch] text-center text-5xl md:text-4xl group-hover:scale-125 transition duration-500 ${
//             i < boldPrefix.length ? "font-semibold" : ""
//           } uppercase tracking-tight`}
//         >
//           {char}
//         </span>
//       ))}
//     </span>
//   );
// };

function Hero() {
  return (
    <Transition>
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <img
        src="/photofolio/ireland/DSC04136.JPG"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 flex flex-col items-center h-full pt-8 space-y-20 text-white">
        {/* <ScrambleText text="JMPHOTOS" boldPrefix="JM"/> */}
        <h1 className="text-4xl font-light"><span className="font-normal">JM</span>Photos</h1>

       <div className="flex flex-col space-y-6 tracking-wide text-center text-4xl md:text-8xl w-full">
          <Link to="/photofolio/featured" className="group flex justify-center opacity-80 hover:opacity-100 transition-all duration-500 p-4">
            Featured
            <span className="absolute right-[20vw] ml-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">☞</span>
          </Link>
          <Link to="/photofolio/gallery" className="group flex justify-center opacity-80 hover:opacity-100 transition-all duration-500 p-4">
            Gallery
            <span className="absolute left-[20vw] ml-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">☜</span>
          </Link>
          <Link to="/photofolio/about" className="group flex justify-center opacity-80 hover:opacity-100 transition-all duration-500 p-4">
            About
            <span className="absolute bottom-0 ml-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">☟</span>
          </Link>
        </div>

      </div>
    </section>
    </Transition>
  );
}

export default Hero;
