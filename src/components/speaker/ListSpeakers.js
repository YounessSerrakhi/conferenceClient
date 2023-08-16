import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListSpeakers = () => {
    const [speakers, setSpeakers] = useState([]);

    useEffect(() => {
        // Fetch the list of speakers from the server
        const fetchSpeakers = async () => {
            try {
                const response = await axios.get('/api/speakers');
                const speakersData = response.data;

                setSpeakers(speakersData);
            } catch (error) {
                console.error('Error fetching speakers:', error);
            }
        };

        fetchSpeakers();
    }, []);

    return (
        <div>
            <h2>List of Speakers</h2>
            <ul>
                {speakers.map((speaker) => (
                    <li key={speaker.id}>
                        <p>Name: {`${speaker.firstname} ${speaker.lastname}`}</p>
                        <p>Bio: {speaker.bio}</p>
                        <img src={`/path/to/images/${speaker.image}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListSpeakers;
