import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/main.css';
import { useAuth } from '../Contexts/AuthContext';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyNavbar() {
  const [showModal, setShowModal] = useState(false);
  const [transparence, setTransparance] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleLogout = (event) => {
    event.preventDefault();
    logout(event);
    setShowModal(false);
    navigate('/');
    window.location.reload(false);
  };

  const handleScroll = () => {
    setTransparance(window.scrollY / 500);
  };

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    } else {
      setTransparance(1);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setTransparance(0);
    };
  }, [window.location.pathname]);

  const myStyle = {
    backgroundColor: `rgba(0, 0, 0, ${transparence})`
  };

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
        navigate('/');
        //scrollToSection(sectionId)  i dont know why it does not work!!!!    
    } else {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

  return (
    <div id="navbar">
      <Navbar expand="lg" className="navbar navbar-light fixed-top shadow-0" style={myStyle}>
        <div className="container">
          <Navbar.Brand onClick={() => scrollToSection('header')}>
            <span style={{ color: '#0e1ec0' }}>FSTg</span>
            <span style={{ color: '#fff' }}>   Conference</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" onClick={()=>setTransparance(window.location.pathname === '/'?transparence<1?1:window.scrollY / 500:1)}>
            <i className="fas fa-bars" style={{color :'#ffffff' }}></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link onClick={() => scrollToSection('about')}>
                About
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection('speakers')}>
                Speakers
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection('program')}>
                Program
              </Nav.Link>
              <Nav.Link as={Link} to="/apply">
                Apply
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection('contact')}>
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="d-flex flex-row">
              {Cookies.get('token') === undefined ? (
                <>
                  <Nav.Link as={Link} to="/login">
                    <button className='btn btn-primary m-1'>
                      Login
                    </button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                      <button className='btn btn-primary m-1'>
                      Register
                      </button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className='m-1 p-1'  as={Link} to="/profile">
                    {Cookies.get('userName')}
                  </Nav.Link>
                  <Nav.Link className='m-1 p-1' href="#" onClick={handleShow}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <p>Are you sure you want to log out?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
