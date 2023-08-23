import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const [search, setSearch] = useState('');
    function prevPage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1);
        }
        
    }

    function nextPage() {
        if (currentPage < lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }

    function changePage(id) {
        setCurrentPage(id);
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className='childDiv'>
            <h2>User List</h2>
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
                            <th><b>Name</b></th>
                            <th><b>Email</b></th>
                            <th><b>Phone</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.nom.toLowerCase().includes(search.toLowerCase());
                        }).map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom} {user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.tel}</td>
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
}

export default ListUsers;
