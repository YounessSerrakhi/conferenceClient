import React from 'react'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ListUser from '../components/ListUser'

export default function Home() {
  return (
    <div>
        <Header/>
        <ListUser/>
        <Main/>
        <Footer/>
    </div>
  )
}
