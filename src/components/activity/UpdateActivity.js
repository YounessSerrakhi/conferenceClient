import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ModalResponse from '../admin/ModalResponse';
import Cookies from 'js-cookie';
const UpdateActivity = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startingTime: '',
        endingTime: '',
        day:'',
        presenterId: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgStyle, setMsgStyle] = useState('');
    const [presenters, setPresenters] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        // Fetch the activity data based on the activityId and populate the form
        const fetchActivityData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/activities/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
                });
                const activityData = response.data;

                setFormData({
                    title: activityData.title,
                    description: activityData.description,
                    time: activityData.time,
                    day:activityData.day,
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
                const response = await axios.get('http://127.0.0.1:8000/api/speakers', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
                }); // Adjust the endpoint as needed
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
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('day', formData.day);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('time', formData.startingTime+" - "+formData.endingTime);
        formDataToSend.append('presenterId', formData.presenterId);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/activities/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
            });
            console.log('Response:', response.data);
            setMsg(response.data);
            setMsgStyle('green');
            openModal();
        } catch (error) {
            console.error('Error updating activity:', error);
            setMsg(error.message);
            setMsgStyle('red');
            openModal();
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getList = () => {
        navigate('/activities')
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
            <h2>Update Activity</h2>
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
                <div className='row m-2'>
                    <div className='col-md-4 form-group p-1'>
                        <label>Starting Time:</label>
                        <input
                            type="time" // Use datetime-local for date and time input
                            name="startingTime"
                            className='form-control'
                            value={formData.startingTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-md-4 form-group p-1'>
                        <label>Ending Time:</label>
                        <input
                            type="time"
                            name="endingTime"
                            className='form-control'
                            value={formData.endingTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-md-4 form-group p-1'>
                        <label>Day Number:</label>
                        <input
                            type="number"
                            name="day"
                            className='form-control'
                            value={formData.day}
                            onChange={handleInputChange}
                        />
                    </div>
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
                <button className='btn btn-dark m-1' type="submit">Update</button>
                <button className='btn btn-danger m-1' type="reset">Reset</button>
            </form>
        </div>
    );
};

export default UpdateActivity;
