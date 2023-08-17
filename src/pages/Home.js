import React from 'react'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ListPapers from '../components/paper/ListPapers'

export default function Home() {
  return (
    <div>
        <Header/>
        <ListPapers/>
        <Main/>
        <Footer/>
    </div>
  )
}
