import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/main.css'
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
  const navigate = useNavigate();


  const handleLogout =(event) => {
    event.preventDefault();
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.post('api/logout').then(response => {
      console.log(response);
      logout();
      alert(response.data.message);
      navigate('/');
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
            <Link className="nav-link" to="/">
              conference
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            programme
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Speakers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Reference
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            Team
            </Link>
          </li>
          
        </ul>
        <ul className="navbar-nav d-flex flex-row">
  {/* Check if token is here */}
  {Cookies.get('token') === undefined ? ( // If token is not set
    <>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </>
  ) : (
    // If token is set
    <>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          {Cookies.get('userName')}
        </Link>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={handleLogout}>
          Logout

        </button>
      </li>
    </>
  )}
</ul>
      </div>
    </div>
  </nav>
  )
}
