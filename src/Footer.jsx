// import ScrollToTop from "./ScrollToTop";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center space-y-0 md:space-y-16">
        {/* <ScrollToTop /> */}
        <p className="text-xs tracking-widest opacity-80 pb-2">This site was made by
            <a href="https://samoontha.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white border-b border-transparent hover:border-b-white transition mx-1">Sam Cabrera</a>
        </p>
    </footer>
  );
}

