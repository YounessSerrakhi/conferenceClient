import React from 'react'
import '../assets/css/main.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ResetPassword from '../pages/Auth/ResetPassword';
import Layout from '../pages/Layout';
import Profile from '../pages/Profile';
import ResetPasswordrequest from '../pages/Auth/ResetPasswordRequest';
import PrivateRoute from '../components/PrivateRoute';
import ApplyForm from '../components/ApplyForm';



export default function UserSide() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/conferenceClient" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/apply' element={<ApplyForm/>}/>
          </Route>
          <Route path='reset-password/:token' element={<ResetPassword />} />
          <Route path='reset-password-request' element={<ResetPasswordrequest />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
