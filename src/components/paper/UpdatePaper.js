import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ModalResponse from '../admin/ModalResponse';
import Cookies from 'js-cookie';
function UpdatePaper() {
    const [formData, setFormData] = useState({
        auteurId: '',
        status: '',
        resumer: null
    });
    const navigate = useNavigate();
    const [resumerFile, setResumerFile] = useState(null);
    const [auteurId, setAuteurId] = useState('');
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState('');
    const [pdfPath, setPdfPath] = useState('');
    const { id } = useParams();
    const [msg, setMsg] = useState('');
    const [msgStyle, setMsgStyle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users', {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
        })
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        // Fetch speaker data based on the speakerId and populate the form
        const fetchPaperData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/papers/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
                });
                const paperData = response.data;
                setAuteurId(paperData.auteurId);
                setPdfPath(paperData.resumer);
                setStatus(paperData.status);
            } catch (error) {
                console.error('Error fetching speaker data:', error);
            }
        };

        fetchPaperData();
    }, [])

    const handleResumerChange = (event) => {
        const file = event.target.files[0];
        setResumerFile(file);
    };

    const handleAuteurId = (event) => {
        setAuteurId(event.target.value);
    };

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (resumerFile !== null) {
            formData.resumer = resumerFile;
        }
        formData.auteurId = auteurId;
        formData.status = status;
        console.log(formData);
        axios.post(`http://127.0.0.1:8000/api/papers/${id}`, formData, {
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
            console.log(error);
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
                <ModalResponse button={(msgStyle === 'green') ? 'Continue' : 'Try again'}
                    isOpen={isModalOpen}
                    onClose={(msgStyle === 'green') ? () => getList() : () => closeModal()}>
                    <div style={{ color: msgStyle }}>
                        <p>
                            {msg}
                        </p>
                    </div>
                </ModalResponse>
            </div>
            <h2>Update Paper</h2>
            <center>
                <embed src={`http://127.0.0.1:8000/storage/${pdfPath}`} width="800px" height="300px" />
            </center>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                    <label htmlFor="resumer">Change resumer (PDF)</label>
                    <input
                        type="file"
                        className='form-control'
                        id="resumer"
                        accept=".pdf"
                        onChange={handleResumerChange}
                    />
                </div>
                <div className='form-group mb-2'>
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
                <button className='btn btn-dark m-1' type="submit">save changes</button>
                <button className='btn btn-danger m-1' type="reset">reset</button>
            </form>
        </div>
    );
}

export default UpdatePaper;
