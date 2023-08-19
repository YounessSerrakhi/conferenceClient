import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateActivity = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        datetime: '',
        presenterId: '',
    });

    const [presenters, setPresenters] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // Fetch the activity data based on the activityId and populate the form
        const fetchActivityData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/activities/${id}`);
                const activityData = response.data;

                setFormData({
                    title: activityData.title,
                    description: activityData.description,
                    datetime: activityData.datetime,
                    presenterId: activityData.presenterId,
                });
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        fetchActivityData();
    }, [id]);

    useEffect(() => {
        // Fetch the list of presenters (speakers) to populate the dropdown
        const fetchPresenters = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/speakers'); // Adjust the endpoint as needed
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
            const response = await axios.put(`http://127.0.0.1:8000/api/activities/${id}`, formData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    return (
        <div>
            <h2>Update Activity</h2>
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
                                {presenter.firstname} {presenter.lastname}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateActivity;
