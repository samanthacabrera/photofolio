import Header from "./Header";
import Gallery from "./Gallery";
import About from "./About";
import Footer from "./Footer";

function App() {
  return (
    <div className="flex h-screen overflow-x-auto no-scrollbar">
      <div className="flex-shrink-0 w-[25vw] flex flex-col justify-between sticky top-0 left-0 h-screen z-20 p-2">
        <Header />
        <About />
        <Footer />
      </div>

      <div className="flex-1 flex items-center">
        <Gallery />
      </div>
    </div>
  );
}

export default App;
