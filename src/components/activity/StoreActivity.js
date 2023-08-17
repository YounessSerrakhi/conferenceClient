import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreActivity = () => {
    const [presenters, setPresenters] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        time: '', // Use datetime for the date and time input
        presenterId: '',
    });

    useEffect(() => {
        // Fetch the list of presenters (speakers) to populate the dropdown
        const fetchPresenters = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/speakers'); // Adjust the endpoint as needed
                const presentersData = response.data;
                setPresenters(presentersData);
            } catch (error) {
                console.error('Error fetching presenters:', error);
            }
        };

        fetchPresenters();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/activities', formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error storing activity:', error);
        }
    };

    return (
        <div>
            <h2>Store Activity</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Datetime:</label>
                    <input
                        type="time" // Use datetime-local for date and time input
                        name="time"
                        value={formData.datetime}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Presenter:</label>
                    <select
                        name="presenterId"
                        value={formData.presenterId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Presenter</option>
                        {presenters.map((presenter) => (
                            <option key={presenter.id} value={presenter.id}>
                                {presenter.firstname} {presenter.lastname}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Store</button>
            </form>
        </div>
    );
};

export default StoreActivity;
