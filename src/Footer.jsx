export default function Footer() {
  return (
    <footer className="w-full h-screen opacity-80 flex items-end">
      <div className="max-w-8xl mx-auto p-4 w-full relative">

        <div className="relative md:absolute md:bottom-4 md:left-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 flex flex-col items-center md:items-start pb-6 md:pb-0">
          <h1 className="text-5xl font-bold leading-none select-none">
            JM Photos
          </h1>
        </div>

        <div className="relative md:absolute md:bottom-4 md:right-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 text-sm md:text-base tracking-widest text-center md:text-right">
          <p>
            Reach me at{" "}
            <a
              href="mailto:justinamiller1023@gmail.com"
              className="transition hover:border-b border-white/50 pb-1"
            >
              justinamiller1023@gmail.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
