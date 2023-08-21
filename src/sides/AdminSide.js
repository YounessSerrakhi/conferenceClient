import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../assets/css/admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from '../pages/AdminHome';
import Sidebar from '../components/admin/Sidebar';
import ListSpeakers from '../components/speaker/ListSpeakers';
import UpdateSpeaker from '../components/speaker/UpdateSpeaker';
import StoreSpeaker from '../components/speaker/StoreSpeaker';
import ListPapers from '../components/paper/ListPapers';
import StorePaper from '../components/paper/StorePaper';
import UpdatePaper from '../components/paper/UpdatePaper';
import StoreActivity from '../components/activity/StoreActivity';
import ListActivities from '../components/activity/ListActivities';
import UpdateActivity from '../components/activity/UpdateActivity';
import ListUsers from '../components/user/ListUsers';
import Navbar from '../components/admin/Navbar';
import ListMessages from '../components/admin/ListMessages';

export default function AdminSide() {
  return (
    <div>
      <Router>
        <Navbar/>
        <div className="parentDiv">
        <Sidebar className="childDiv" />
        <Routes>
          <Route path="/" element={<AdminHome />}>
            <Route index element={<AdminHome />} />
          </Route>
          <Route path="/speakers" element={<ListSpeakers />} />
          <Route path="/speaker/create" element={<StoreSpeaker />} />
          <Route path="/speaker/update/:id" element={<UpdateSpeaker />} />
          <Route path="/papers" element={<ListPapers />} />
          <Route path="/paper/create" element={<StorePaper />} />
          <Route path="/paper/update/:id" element={<UpdatePaper />} />
          <Route path="/activities" element={<ListActivities />} />
          <Route path="/activity/create" element={<StoreActivity />} />
          <Route path="/activity/update/:id" element={<UpdateActivity />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/messages" element={<ListMessages/>} />
        </Routes>
        </div>
      </Router>
    </div>
  )
}
