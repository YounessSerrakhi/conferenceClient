import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSpeaker = ({ speakerId }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        bio: '',
        image: null,
    });

    useEffect(() => {
        // Fetch speaker data based on the speakerId and populate the form
        const fetchSpeakerData = async () => {
            try {
                const response = await axios.get(`/api/speakers/${speakerId}`);
                const speakerData = response.data;

                setFormData({
                    firstname: speakerData.firstname,
                    lastname: speakerData.lastname,
                    bio: speakerData.bio,
                    image: null, // Image data won't be fetched here, just leave it null
                });
            } catch (error) {
                console.error('Error fetching speaker data:', error);
            }
        };

        fetchSpeakerData();
    }, [speakerId]);

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
            const response = await axios.put(`http://127.0.0.1:8000/api/speakers/${speakerId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error updating speaker data:', error);
        }
    };

    return (
        <div>
            <h2>Update Speaker</h2>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateSpeaker;
