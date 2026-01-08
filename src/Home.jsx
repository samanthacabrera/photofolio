import Header from "./Header";
import Hero from "./Hero";
import Featured from "./Featured";
import Gallery from "./Gallery";
import About from "./About";

function Home() {

  return (
    <section className="flex flex-col min-h-screen">
        <Hero />
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Featured />
        <Gallery />
        <About />
    </section>
  );
}

export default Home;
