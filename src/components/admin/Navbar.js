import { Link } from 'react-router-dom';
import img from '../../images/admin.png';
import Modal from './Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/newUsers').then((r) => setUsers(r.data)).catch((e) => console.error(e));
        axios.get('http://127.0.0.1:8000/api/newPapers').then((r) => setPapers(r.data)).catch((e) => console.error(e));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h5 style={{ color: '#ffffff' }}>
                        Notifications
                    </h5>
                    <ul>
                        {papers.slice(0, 5).map((paper) => {
                            return (<li className='-1' style={{border:'1px solid #ffffff' , padding:'10px'}}>
                                <Link className='notification-link' to='/papers'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg>
                                    <span className='ps-1'>{paper.auteurName} has uploded a new paper </span>
                                </Link>
                            </li>)
                        })}
                    </ul>
                </Modal>
            </div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to='/' style={{
                        textDecoration: 'none'
                    }} className="navbar-brand" >
                        <img src={img} alt="admin-logo" height={'40px'} width={'100px'} />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active"></Link>
                            </li>
                        </ul>
                        <form className="d-flex m-1">
                            <button onClick={(isModalOpen) ? closeModal : openModal} type="button" className="icon-button me-4">
                                <span className="material-icons">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg>
                                </span>
                                <span className="icon-button__badge bg-danger">2</span>
                            </button>
                            <button className="btn btn-danger" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
