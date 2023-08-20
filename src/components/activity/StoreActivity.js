import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoreActivity = () => {
    const [presenters, setPresenters] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        time: '', // Use datetime for the date and time input
        presenterId: '',
    });
    const navigate = useNavigate();
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
            navigate('/activities');
        } catch (error) {
            console.error('Error storing activity:', error);
        }
    };

    return (
        <div className='childDiv'>
            <h2>Store Activity</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        className='form-control'
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        className='form-control'
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Time:</label>
                    <input
                        type="time" // Use datetime-local for date and time input
                        name="time"
                        className='form-control'
                        value={formData.datetime}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>Presenter:</label>
                    <select
                        name="presenterId"
                        className='form-control'
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
                <button className='btn btn-dark m-1' type="submit">Store</button>
                <button className='btn btn-danger m-1' type="reset">Reset</button>
            </form>
        </div>
    );
};

export default StoreActivity;
