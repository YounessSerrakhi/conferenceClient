import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink,Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';



const Sidebar = () => {

    const {logout} = useAuth();
    
  const navigate = useNavigate();
    const handleLogout =(event) => {
        event.preventDefault();
          logout();
          navigate('/');
      };
      

    return (
        <div style={{ display: 'flex',height: 'calc(100vh)', overflow: 'scroll initial', backgroundColor: '#333' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Admin
                    </a>
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
                            <CDBSidebarMenuItem icon="contact">messages</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">info</CDBSidebarMenuItem>
                        </NavLink>
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