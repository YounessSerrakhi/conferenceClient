import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoreSpeaker = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        subject: '',
        bio: '',
        image: null,
    });
    const navigate = useNavigate();
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
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/speakers', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);
            setFormData({
                firstname: '',
                lastname: '',
                subject: '',
                bio: '',
                image: null,
            });
            navigate('/speakers');
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <div className='childDiv'>
            <h2>Upload Data</h2>
            <form onSubmit={handleSubmit}>
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
                        className='form-control'
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>subject:</label>
                    <input
                        type="text"
                        className='form-control'
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Bio:</label>
                    <textarea className='form-control' name="bio" value={formData.bio} onChange={handleInputChange} />
                </div>
                <div className='form-group mb-2'>
                    <label>Image:</label>
                    <input className='form-control' type="file" name="image" onChange={handleImageChange} />
                </div>
                <button className='btn btn-dark m-1' type="submit">save</button>
                <button className='btn btn-danger m-1' type="reset">reset</button>
            </form>
        </div>
    );
};

export default StoreSpeaker;