import Gallery from "./Gallery";
import Hero from "./Hero";

function Home ({ darkMode, setDarkMode }) {

return (
    <div className="flex flex-col space-y-6">
        <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
        <Gallery darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default Home;
