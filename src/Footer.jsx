function Footer() {
  return (
    <footer className="w-screen flex justify-center text-xs pb-2">
        <p className="font-light">
        Made by{" "}
        <a
        href="https://samoontha.com/"
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-400 hover:underline transition-all duration-200"
        >
          Sam Cabrera
        </a>
        </p>
      <p className="pl-1 font-light tracking-wide">©2026</p>
    </footer>
  );
}

export default Footer;
