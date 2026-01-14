import Gallery from "./Gallery";
import Hero from "./Hero";
import Transition from "./Transition";

function Home ({ layoutValue }) {

  return (
    <Transition>
      <div className="flex flex-col space-y-6">
        <Hero layoutValue={layoutValue} />
        <Gallery layoutValue={layoutValue} />
      </div>
    </Transition>
  );
}

export default Home;
