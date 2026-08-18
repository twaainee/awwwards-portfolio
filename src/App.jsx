import React from 'react'
import NavBar from './sections/NavBar'
import Hero from './sections/Hero'
import ServiceSummary from './sections/ServiceSummary'
import Services from './sections/Services'

const App = () => {
  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <ServiceSummary />
      <Services />
    </div>
  )
}

export default App