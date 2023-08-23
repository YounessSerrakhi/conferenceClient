import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ModalResponse from '../admin/ModalResponse';

const UpdateSpeaker = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        subject: '',
        bio: '',
        image: null,
    });
    const [imgPath, setImgPath] = useState('');
    const [msg, setMsg] = useState('');
    const [msgStyle, setMsgStyle] = useState('');
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch speaker data based on the speakerId and populate the form
        const fetchSpeakerData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/speakers/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const speakerData = response.data;

                setFormData({
                    firstname: speakerData.firstname,
                    lastname: speakerData.lastname,
                    subject: speakerData.subject,
                    bio: speakerData.bio,
                    image: null, // Image data won't be fetched here, just leave it null
                });
                setImgPath(speakerData.image);
            } catch (error) {
                console.error('Error fetching speaker data:', error);
            }
        };

        fetchSpeakerData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('firstname', formData.firstname);
        formDataToSend.append('lastname', formData.lastname);
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('bio', formData.bio);
        if (formData.image !== null) {
            formDataToSend.append('image', formData.image);
        }

        axios.post(`http://127.0.0.1:8000/api/speakers/${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log(response.data);
            setMsg(response.data);
            setMsgStyle('green');
            openModal();
        }).catch((error) => {
            setMsg(error.message);
            setMsgStyle('red');
            openModal();
            console.log(error.message);
        })
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getList = () => {
        navigate('/speakers')
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
            <h2>Update Speaker</h2>
            <center>
                <img style={{ border: "1px solid #000", borderRadius: "12px" }} height={"200px"} width={"180px"} src={`http://127.0.0.1:8000/storage/${imgPath}`} alt={`currnt speaker`} />
            </center>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                    <label>Change  image:</label>
                    <input className='form-control' type="file" name="image" onChange={handleImageChange} />
                </div>
                <div className='form-group mb-2'>
                    <label>First Name:</label>
                    <input
                        type="text"
                        className='form-control'
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        className='form-control'
                        value={formData.lastname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Last Name:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Bio:</label>
                    <textarea className='form-control' name="bio" value={formData.bio} onChange={handleInputChange} />
                </div>
                <button className='btn btn-dark m-1' type="submit">save</button>
                <button className='btn btn-danger m-1' type="reset">reset</button>
            </form>
        </div>
    );
};

export default UpdateSpeaker;
