import Header from "./Header"
import Gallery from "./Gallery"
import About from "./About"
import Contact from "./Contact"

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <Gallery />
      <About />
      <Contact />
    </div>
  )
}

export default App
