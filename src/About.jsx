function About() {
  return (
    <section className="w-screen h-screen snap-start flex items-center justify-center px-12 md:px-24">
      <div className="max-w-sm text-center">
        <p className="uppercase italic tracking-wide text-2xl mb-8">
          About
        </p>

        <p className="leading-relaxed font-light mb-6">
          This is a personal archive of places I’ve visited that felt worth holding onto. 
          I am self-taught and began photographing in 2020.
        </p>

        <p className="leading-relaxed font-light">
          All the photos you see are captured with a Sony Alpha a6000
          under natural light and left unaltered. You can reach me at{" "}
          <a 
            href="mailto:justinamiller1023@gmail.com" 
            className="italic hover:underline"
          >
            justinamiller1023@gmail.com
          </a>.
        </p>
      </div>
    </section>
  );
}

export default About;
