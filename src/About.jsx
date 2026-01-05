function About() {
  return (
    <section className="w-screen h-screen flex items-center justify-center bg-white z-20">
      <div className="flex flex-col space-y-6 max-w-sm text-center text-xs leading-loose tracking-wider font-light">
        <p className="text-lg uppercase mb-2">
          About
        </p>
        <p>
          This is a personal archive of places I’ve visited that felt worth holding onto. 
          I am self-taught and began photographing in 2020.
        </p>
        <p>
          All the photos you see are captured with a Sony Alpha a6000
          under natural light. You can reach me at{" "}
          <a 
            href="mailto:justinamiller1023@gmail.com" 
            className="italic hover:underline"
          >
            justinamiller1023@gmail.com
          </a>.
        </p>
      </div>

      {/* <button
        className="fixed bottom-6 right-6 bg-white px-3 py-2 -rotate-90 border border-black rounded-full hover:bg-black hover:text-white transition-all"
      >
        ➔
      </button> */}
    </section>
  );
}

export default About;
