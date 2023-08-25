import React from 'react'
import Header from './main/Header'
import Program from './main/Program'
import Footer from './main/Apply'
import Contact from './main/Contact'
import SpeakerCarts from './main/SpeakerCarts'

export default function Main() {
  return (
    <div id="main">
      <section>
      <Header />
      <SpeakerCarts/>
      <Program />
      <Footer />
      </section>
      <Contact/>
      
    </div>
  )
}
