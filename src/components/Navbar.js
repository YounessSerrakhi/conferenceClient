import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
        <li className="nav-item">
            <a className="nav-link" href="#!">
              register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              login
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
