import NavBar from './sections/NavBar'
import Hero from './sections/Hero'
import ServiceSummary from './sections/ServiceSummary'
import Services from './sections/Services'
import ReactLenis from "lenis/react";
import About from './sections/About'
import Works from './sections/Works'

const App = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative w-screen min-h-screen overflow-x-clip">
        <NavBar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
      </div>
    </ReactLenis>
  )
}

export default App
