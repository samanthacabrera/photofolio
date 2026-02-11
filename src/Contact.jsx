function Contact() {
  return (
    <section
      id="contact"
      data-title="Contact"
      className="relative w-screen min-h-screen flex items-center px-8 md:px-20"
    >
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right translate-x-4 pr-12 py-12 border-r border-white/40">
                <p className="text-sm md:text-base lg:text-xl leading-relaxed max-w-sm ml-auto">
                You can reach me via email for project inquiries or collaborations. 
                </p>
            </div>

            <div className="text-center md:text-left mt-8 md:mt-0 mr-auto">
                <p className="text-white/70">
                    Email
                </p>
                <a
                    href="mailto:justinamiller1023@gmail.com"
                    className="inline-block text-xl tracking-[0.05em] relative group"
                >
                    justinamiller1023@gmail.com
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
                </a>
            </div>
        </div>
        <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs tracking-widest opacity-80 pb-2 text-center">
        This site was made by{" "}
        <a
          href="https://samoontha.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block relative group mx-1"
        >
          Sam Cabrera
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
        </a>
      </p>
    </section>
  );
}

export default Contact;


