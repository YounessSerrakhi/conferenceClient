import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';


export default function Layout() {
  return (
    <div>
      <MyNavbar/>
      <Outlet />
      <Footer />
    </div>
  )
}
