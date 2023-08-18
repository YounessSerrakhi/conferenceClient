import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from '../pages/AdminHome';
import Sidebar from '../components/admin/Sidebar';
import ListSpeakers from '../components/speaker/ListSpeakers';
import '../assets/css/admin.css';
export default function AdminSide() {
  return (
    <div className="parentDiv">
      <Router>
        <Sidebar className="childDiv" />
        <Routes>
          <Route path="/" element={<AdminHome />}>
            <Route index element={<AdminHome />} />
          </Route>
          <Route path="/speakers" element={<ListSpeakers />} />
        </Routes>
      </Router>
    </div>
  )
}
