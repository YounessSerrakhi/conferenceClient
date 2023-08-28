import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ModalResponse from '../admin/ModalResponse';
import Cookies from 'js-cookie';
const ListActivities = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [render, setRender] = useState(false);
    const recordsPerPage = 7;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = activities.slice(firstIndex, lastIndex);
    const npage = Math.ceil(activities.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const [search, setSearch] = useState('');
    const [msg, setMsg] = useState('');
    const [msgStyle, setMsgStyle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    function prevPage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }

    function changePage(id) {
        setCurrentPage(id);
    }

    useEffect(() => {
        // Fetch the list of activities from the server
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/activities', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
                });
                const activitiesData = response.data;
                setActivities(activitiesData);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        // Fetch the list of activities from the server
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/activities', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
                });
                const activitiesData = response.data;
                setActivities(activitiesData);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, [render]);

    const deleteActivity = (id) => {
        try {
            axios.delete(`http://127.0.0.1:8000/api/activities/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
            }).then((response) => {
                console.log(response.data);
                setMsg(response.data);
                setMsgStyle('green');
                openModal();
            }).catch((error) => {
                console.error(error);
                setMsg(error.message);
                setMsgStyle('red');
                openModal();
            });
            const fetchActivities = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/activities', {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${Cookies.get('token')}`
                        },
                    });
                    const ActivitiesData = response.data;

                    setActivities(ActivitiesData);
                } catch (error) {
                    console.error('Error fetching Activities:', error);
                }
            };
            setRender(!render);
            fetchActivities();
        } catch (error) {
            console.error('Error fetching Activities:', error);
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getList = () => {
        navigate('/activities')
    }

    return (
        <div className='childDiv'>
            <div>
                <ModalResponse button={'Close'}
                    isOpen={isModalOpen}
                    onClose={closeModal}>
                    <div style={{ color: msgStyle }}>
                        <p>
                            {msg}
                        </p>
                    </div>
                </ModalResponse>
            </div>
            <div>
                <Link className='btn btn-primary' to="/activity/create">
                    create activity
                </Link>
            </div>
            <h2>List of Activities</h2>
            <div>
                <form>
                    <input placeholder='Search By Title...' type="text" className='form-control' onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>
            <div className='m-1'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th><b>ID</b></th>
                            <th><b>Title</b></th>
                            <th><b>Description</b></th>
                            <th><b>Time</b></th>
                            <th><b>Day</b></th>
                            <th><b>Presenter</b></th>
                            <th><b>actions</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.title.toLowerCase().includes(search.toLowerCase());
                        }).map((activity) => (
                            <tr key={activity.id}>
                                <td scope="row"> {activity.id} </td>
                                <td> {activity.title}</td>
                                <td> {activity.description}</td>
                                <td> {activity.time}</td>
                                <td> {activity.day}</td>
                                <td> {activity.presenterName}</td>
                                <td>
                                    <button className='btn btn-warning m-1' onClick={() => navigate(`/activity/update/${activity.id}`)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </button>
                                    <button className='btn btn-danger m-1' onClick={() => deleteActivity(activity.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item  ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a onClick={() => changePage(n)} className='page-link' href='#' >
                                        {n}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ListActivities;
