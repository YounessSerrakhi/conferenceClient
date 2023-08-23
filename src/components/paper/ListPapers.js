import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../images/pdf.png';
import { Link, useNavigate } from 'react-router-dom';
import ModalResponse from '../admin/ModalResponse';
function ListPapers() {
    const [papers, setPapers] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [render, setRender] = useState(false);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = papers.slice(firstIndex, lastIndex);
    const npage = Math.ceil(papers.length / recordsPerPage);
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
        // Fetch the list of papers
        axios.get('http://127.0.0.1:8000/api/papers', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setPapers(response.data);
            })
            .catch(error => {
                console.error('Error fetching papers', error);
            });
    }, []);

    useEffect(() => {
        // Fetch the list of papers
        axios.get('http://127.0.0.1:8000/api/papers', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setPapers(response.data);
            })
            .catch(error => {
                console.error('Error fetching papers', error);
            });
    }, [render]);


    const deletePaper = (id) => {
        try {
            axios.delete(`http://127.0.0.1:8000/api/papers/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                console.log(response.data);
                setMsg(response.data);
                setMsgStyle('green');
                openModal();
            }).catch((error) => {
                console.log(error);
                setMsg(error.message);
                setMsgStyle('red');
                openModal();
            });
            const fetchPapers = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/papers', {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    const PapersData = response.data;
                    setPapers(PapersData);
                } catch (error) {
                    console.error('Error fetching papers:', error);
                }
            };
            setRender(!render);
            fetchPapers();
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    }

    function acceptPaper(id) {
        let formData = new FormData();
        formData.append('status', 'accepted');
        axios.post(`http://127.0.0.1:8000/api/status/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log(response.data);
            setRender(!render);
        })
            .catch(error => {
                console.error('Error uploding paper', error);
            });
    }

    function refusePaper(id) {
        let formData = new FormData();
        formData.append('status', 'refuesed');
        axios.post(`http://127.0.0.1:8000/api/status/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log(response.data);
            setRender(!render);
        })
            .catch(error => {
                console.error('Error uploding paper', error);
            });
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



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
                <Link className='btn btn-primary' to="/paper/create">
                    create paper
                </Link>
            </div>
            <h2>List of Papers</h2>
            <div>
                <form>
                    <input placeholder='Search By Auteur Name...' type="text" className='form-control' onChange={(e) => setSearch(e.target.value)} />
                </form>
            </div>
            <div className='m-1'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th><b>ID</b></th>
                            <th><b>Auteur</b></th>
                            <th><b>Resumer</b></th>
                            <th><b>status</b></th>
                            <th><b>seen</b></th>
                            <th><b>Actions</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.auteurName.toLowerCase().includes(search.toLowerCase());
                        }).map(paper => (
                            <tr key={paper.id}>
                                <td>{paper.id}</td>
                                <td>{paper.auteurName}</td>
                                <td>
                                    <a href={`http://127.0.0.1:8000/storage/${paper.resumer}`}>
                                        <img height={'50px'} width={'40px'} src={img} alt={paper.id} />
                                    </a>
                                </td>
                                <td style={{ color: (paper.status === 'accepted') ? 'green' : 'red', }}>
                                    {paper.status}
                                </td>
                                <td>
                                    {
                                        (paper.status === 'accepted' || paper.status === 'refuesed') ?
                                            'seen' : <div>
                                                <button onClick={() => acceptPaper(paper.id)} className='btn m-1 btn-success'>
                                                    Accept
                                                </button>
                                                <button onClick={() => refusePaper(paper.id)} className='btn m-1 btn-danger'>
                                                    refuese
                                                </button>
                                            </div>
                                    }
                                </td>
                                <td>
                                    <button className='btn btn-warning m-1' onClick={() => navigate(`/paper/update/${paper.id}`)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </button>
                                    <button className='btn btn-danger m-1' onClick={() => deletePaper(paper.id)}>
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
        </div >
    );
}

export default ListPapers;
