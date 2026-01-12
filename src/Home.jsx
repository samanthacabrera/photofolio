import Gallery from "./Gallery";
import Hero from "./Hero";

function Home ({ darkMode, setDarkMode }) {

return (
    <div>
        <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
        <Gallery darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default Home;
