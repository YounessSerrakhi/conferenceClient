import React from 'react'
import '../assets/css/main.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Layout from '../pages/Layout';
import Profile from '../components/Profile';

export default function UserSide() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
