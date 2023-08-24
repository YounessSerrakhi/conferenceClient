import React from 'react'
import Header from './main/Header'
import Program from './main/Program'
import Footer from './main/Footer'
import Contact from './main/Contact'
import SpeakerCarts from './main/SpeakerCarts'

export default function Main() {
  return (
    <div id="main">
      <Header />
      <SpeakerCarts/>
      <Program />
      <Footer />
      <Contact/>
    </div>
  )
}
