import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from '../Contexts/AuthContext';

export default function Navbar() {
  const [transparence, setTransparance] = useState(0);

  const handleScroll = () => {
    setTransparance(window.scrollY/500);
    
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const myStyle = {
    backgroundColor: `rgba(0, 0, 0, ${transparence})`
  };



  const {logout,api} = useAuth();
  const handleLogout =(event) => {
    event.preventDefault();
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.post('api/logout').then(response => {
      console.log(response);
      logout();
      alert(response.data.message);
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-0" style={myStyle}>
    <div className="container">
      <a className="navbar-brand" href="#!">
        <span style={{ color: '#5e9693' }}>Psycho</span>
        <span style={{ color: '#fff' }}>logist</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Offer
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Portfolio
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Reference
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Team
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              Contact
            </a>
          </li>
        </ul>
        <ul className="navbar-nav d-flex flex-row">
        {!(Cookies.get('token')!==undefined) && ( // Render login and register links if not authenticated
              <>
                <li className="nav-item">
                  <Link to='/login' className="nav-link" >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                <Link to='/register' className="nav-link" >
                    Register
                  </Link>
                </li>
              </>
            )}
            {(Cookies.get('token')!==undefined) && (
              <>
              <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdownMenuButton">
                {Cookies.get('userName')}
              </Dropdown.Toggle>
              <Dropdown.Menu className="form">
                  <a href="http://127.0.0.1:8000/logout" onClick={handleLogout}>Logout</a>
              </Dropdown.Menu>
            </Dropdown>
            </>
            )}
        </ul>
      </div>
    </div>
  </nav>
  )
}
