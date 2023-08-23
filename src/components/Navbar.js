import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/main.css'
import { useAuth } from '../Contexts/AuthContext';

export default function Navbar() {
  const [transparence, setTransparance] = useState(0);

  const handleScroll = () => {
    setTransparance(window.scrollY/500);
    
  };

  useEffect(() => {
    if(window.location.pathname === '/'){
    window.addEventListener('scroll', handleScroll);
    }
    else {setTransparance(1);}
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setTransparance(0)
    };
  }, [window.location.pathname]);
  const myStyle = {
    backgroundColor: `rgba(0, 0, 0, ${transparence})`
  };



  const {logout} = useAuth();
  const navigate = useNavigate();


  const handleLogout =(event) => {
    event.preventDefault();  
      logout(event);
      navigate('/');
  };

  return (
    <div id="navbar">
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-0" style={myStyle}>
    <div className="container">
      <a className="navbar-brand" href="#!">
        <span style={{ color: '#0e1ec0' }}>FSTg</span>
        <span style={{ color: '#fff' }}>   Conference</span>
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
        <Link to="#" className="nav-link" onClick={handleLogout}>
          Logout

        </Link>
      </li>
    </>
  )}
</ul>
      </div>
    </div>
  </nav>
  </div>
  )
}
