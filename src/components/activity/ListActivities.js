import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch the list of activities from the server
        const fetchActivities = async () => {
            try {
                const response = await axios.get('/api/activities');
                const activitiesData = response.data;

                setActivities(activitiesData);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div>
            <h2>List of Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <p>Title: {activity.title}</p>
                        <p>Description: {activity.description}</p>
                        <p>Datetime: {activity.datetime}</p>
                        <p>Presenter: {activity.presenter.name}</p> {/* Assuming presenter object has a 'name' property */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListActivities;
