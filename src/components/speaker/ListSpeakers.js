import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ListSpeakers = () => {
    const [speakers, setSpeakers] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = speakers.slice(firstIndex, lastIndex);
    const npage = Math.ceil(speakers.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const [search, setSearch] = useState('');
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
        // Fetch the list of speakers from the server
        const fetchSpeakers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/speakers', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const speakersData = response.data;
                setSpeakers(speakersData);
            } catch (error) {
                console.error('Error fetching speakers:', error);
            }
        };
        fetchSpeakers();
    }, []);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/speakers', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const speakersData = response.data;

                setSpeakers(speakersData);
            } catch (error) {
                console.error('Error fetching speakers:', error);
            }
        };
        fetchSpeakers();
    }, [render])

    const deleteSpeaker = (id) => {
        try {
            axios.delete(`http://127.0.0.1:8000/api/speakers/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const fetchSpeakers = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/speakers', {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    const speakersData = response.data;

                    setSpeakers(speakersData);
                } catch (error) {
                    console.error('Error fetching speakers:', error);
                }
            };
            setRender(!render);
            fetchSpeakers();
        } catch (error) {
            console.error('Error fetching speakers:', error);
        }
    }



    return (
        <div className='childDiv'>
            <div>
                <Link className='btn btn-primary' to="/speaker/create">
                    create speaker
                </Link>
            </div>
            <h2>List of Speakers</h2>
            <div>
                <form>
                    <input placeholder='Search By Lastname...' type="text" className='form-control' onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>
            <div className='m-2'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th><b>ID</b></th>
                            <th><b>Full Name</b></th>
                            <th><b>Subject</b></th>
                            <th><b>bio</b></th>
                            <th><b>Image</b></th>
                            <th><b>Actions</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.lastname.toLowerCase().includes(search.toLowerCase());
                        }).map((speaker) => (
                            <tr key={speaker.id}>
                                <td>{speaker.id}</td>
                                <td>{`${speaker.firstname} ${speaker.lastname}`}</td>
                                <td>{speaker.subject}</td>
                                <td>{speaker.bio}</td>
                                <td><img style={{ border: "1px solid #000", borderRadius: "12px" }} height={"100px"} width={"90px"} src={`http://127.0.0.1:8000/storage/${speaker.image}`} alt={`${speaker.firstname} ${speaker.lastname}`} /></td>
                                <td>
                                    <button className='btn btn-warning m-1' onClick={() => navigate(`/speaker/update/${speaker.id}`)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </button>
                                    <button className='btn btn-danger m-1' onClick={() => deleteSpeaker(speaker.id)}>
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
                        <li className='page-item'>
                            <a onClick={prevPage} href='#' className='page-link'>
                                prev
                            </a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item  ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a onClick={() => changePage(n)} className='page-link' href='#' >
                                        {n}
                                    </a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a onClick={nextPage} href='#' className='page-link'>
                                next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ListSpeakers;
