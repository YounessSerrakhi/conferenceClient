import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalResponse from '../admin/ModalResponse';
function StorePaper() {
    const [resumerFile, setResumerFile] = useState(null);
    const [auteurId, setAuteurId] = useState(''); // Populate this based on your authentication logic
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [msgStyle, setMsgStyle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleResumerChange = (event) => {
        const file = event.target.files[0];
        setResumerFile(file);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
    };

    const handleAuteurId = (event) => {
        setAuteurId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('resumer', resumerFile);
        formData.append('status', status);
        formData.append('auteurId', auteurId);

        axios.post('http://127.0.0.1:8000/api/papers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log(response.data);
            setMsg(response.data);
            setMsgStyle('green');
            openModal();
        })
            .catch(error => {
                console.error('Error uploding paper', error);
                setMsg(error.message);
                setMsgStyle('red');
                openModal();
            });

    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getList = () => {
        navigate('/papers')
    }

    return (
        <div className='childDiv'>
            <div>
                <ModalResponse button={(msgStyle === 'green')?'Continue':'Try again'}
                    isOpen={isModalOpen}
                    onClose={(msgStyle === 'green') ? () => getList() : () => closeModal()}>
                    <div style={{ color: msgStyle }}>
                        <p>
                            {msg}
                        </p>
                    </div>
                </ModalResponse>
            </div>
            <h2>Create Paper</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                    <label htmlFor="resumer">Resumer (PDF)</label>
                    <input
                        type="file"
                        className='form-control'
                        id="resumer"
                        accept=".pdf"
                        onChange={handleResumerChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Status:</label>
                    <select className='form-control' value={status} onChange={handleSelectChange}>
                        <option value="">Select a Status</option>
                        <option value="accepted">accepted</option>
                        <option value="refuesed">refuesed</option>
                    </select>
                </div>
                <div className='form-group mb-2'>
                    <label>Auteur:</label>
                    <select
                        className='form-control'
                        name="auteurId"
                        value={auteurId}
                        onChange={handleAuteurId}
                    >
                        <option value="">Select Auteur</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nom} {user.prenom}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='btn btn-dark m-1' type="submit">save</button>
                <button className='btn btn-danger m-1' type="reset">reset</button>
            </form>
        </div>
    );
}

export default StorePaper;
