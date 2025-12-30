import Header from "./Header"
import Gallery from "./Gallery"
import About from "./About"
import Footer from "./Footer"

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <Gallery />
      <About />
      <Footer />
    </div>
  )
}

export default App
