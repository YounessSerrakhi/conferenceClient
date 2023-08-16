import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreActivity = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        datetime: '', // Use datetime for the date and time input
        presenterId: '',
    });

    useEffect(() => {
        // Fetch the list of presenters (speakers) to populate the dropdown
        const fetchPresenters = async () => {
            try {
                const response = await axios.get('/api/presenters'); // Adjust the endpoint as needed
                const presentersData = response.data;

                // Set presenters data in the state
                // Assuming presentersData is an array of presenter objects with properties id and name
                // Replace "id" and "name" with the actual properties in your data
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
            const response = await axios.post('/api/activities', formData);
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
                        type="datetime-local" // Use datetime-local for date and time input
                        name="datetime"
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
                                {presenter.name}
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
