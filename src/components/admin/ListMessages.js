import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const ListMessages = () => {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = messages.slice(firstIndex, lastIndex);
    const npage = Math.ceil(messages.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const { api } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
            const response = await api.get('/api/contact');
            const messagesData = response.data;
            setMessages(messagesData);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const toggleMessage = async (messageId) => {
        try {
            api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
            await api.put(`/api/contact/${messageId}/check-seen`);
            // Update the seen status locally
            setMessages(prevMessages =>
                prevMessages.map(message =>
                    message.id === messageId ? { ...message, seen: !message.seen } : message
                )
            );
        } catch (error) {
            console.error('Error toggling message seen status:', error);
        }
    };

    const changePage = (id) => {
        setCurrentPage(id);
    };

    return (
        <div className='childDiv'>
            <h2>List of Contact Messages</h2>
            <div className='m-1'>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th><b>ID</b></th>
                        <th><b>Email</b></th>
                        <th><b>Name</b></th>
                        <th><b>Message</b></th>
                        <th><b>seen</b></th>
                    </tr>
                    </thead>
                    <tbody>
                        {records.map((message) => (
                            <tr key={message.id}>
                                <td scope="row"> {message.id} </td>
                                <td> {message.email}</td>
                                <td> {message.name}</td>
                                <td> {message.message}</td>
                                <td>
                                    <button
                                        className='btn'
                                        id={message.seen ? 'seen-message' : 'unseen-message'}
                                        onClick={() => toggleMessage(message.id)}
                                    />
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

export default ListMessages;
