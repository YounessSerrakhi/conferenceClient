import React from 'react'
import Header from './main/Header'
import Program from './main/Program'
import Footer from './main/Apply'
import Contact from './main/Contact'
import SpeakerCarts from './main/SpeakerCarts'
import About from './main/About'

export default function Main() {
  return (
    <div id="main">
      <section>
      <Header />
      <About/>
      <SpeakerCarts/>
      <Program />
      <Footer />
      </section>
      <Contact/>
      
    </div>
  )
}
