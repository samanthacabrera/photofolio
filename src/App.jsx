import Header from "./Header";
import Gallery from "./Gallery";
import About from "./About";
import Footer from "./Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        <Header />
        <Gallery />
        <About />
        <Footer />
    </div>
  );
}

export default App;
