import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';


const Sidebar = () => {

    const { logout } = useAuth();

    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate('/');
        window.location.reload(false);
    };


    return (
        <div style={{ borderRadius: '0', display: 'flex', height: '150vh', overflow: 'scroll initial', backgroundColor: '#343a40' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#343a40">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <Link to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                        </svg>
                    </Link>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/users" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="th">users</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/speakers" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">speakers</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/papers" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="book">papers</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/activities" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">activities</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/messages" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="sticky-note">messages</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">info</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <Link to="#" className="nav-link" onClick={handleLogout}>
                        Logout
                    </Link>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        FSTg Conference
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;
