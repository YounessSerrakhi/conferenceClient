import React, { useState } from 'react';
import axios from 'axios';

const StoreSpeaker = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        bio: '',
        image: null, // This will store the selected image file
    });

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
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/speakers', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <div>
            <h2>Upload Data</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default StoreSpeaker;