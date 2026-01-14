import Gallery from "./Gallery";
import Hero from "./Hero";

function Home ({ layoutValue }) {

return (
    <div className="flex flex-col space-y-6">
      <Hero layoutValue={layoutValue} />
      <Gallery layoutValue={layoutValue} />
    </div>
  );
}

export default Home;
