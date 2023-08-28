import { Link } from 'react-router-dom';
import img from '../../images/admin.png';
import Modal from './Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [papers, setPapers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/newPapers',{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        }).then((r) => setPapers(r.data)).catch((e) => console.error(e));
        axios.get('http://127.0.0.1:8000/api/Unchecked',{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        }).then((r) => setMessages(r.data)).catch((e) => console.error(e));
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
                        New papers
                    </h5>
                    <ul>
                        {papers.slice(0, 2).map((paper) => {
                            return (<li className='' style={{ border: '1px solid #ffffff', padding: '10px' }}>
                                <div className='notification-link' to='/papers'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg>
                                    <span className='ps-1'>{paper.auteurName}  has uploded a new paper </span>
                                </div>
                            </li>)
                        })}
                        <div className='text-center'>
                            <Link onClick={closeModal} className='notification-link' to={'/papers'}>
                                see more
                            </Link>
                        </div>
                    </ul>

                    <h5 style={{ color: '#ffffff' }}>
                        New messages
                    </h5>
                    <ul>
                        {messages.slice(0, 3).map((paper) => {
                            return (<li className='' style={{ border: '1px solid #ffffff', padding: '10px' }}>
                                <div className='notification-link' >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                    </svg>
                                    <span className='ps-1'>{paper.email}  send new message </span>
                                </div>

                            </li>)
                        })}
                        <div className='text-center'>
                            <Link onClick={closeModal} className='notification-link' to={'/messages'}>
                                see more
                            </Link>
                        </div>
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
                                <span className="icon-button__badge bg-danger">{papers.length + messages.length}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
