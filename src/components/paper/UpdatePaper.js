import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StorePaper() {
    const [resumerFile, setResumerFile] = useState(null);
    const [auteurId, setAuteurId] = useState(''); // Populate this based on your authentication logic
    const [pdfPath, setPdfPath] = useState('');
    const { id } = useParams();
    useEffect(() => {
        // Fetch speaker data based on the speakerId and populate the form
        const fetchPaperData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/papers/${id}`);
                const paperData = response.data;
                setAuteurId(paperData.auteurId);
                setPdfPath(paperData.pdfPath);
            } catch (error) {
                console.error('Error fetching speaker data:', error);
            }
        };

        fetchPaperData();
    }, [])

    const handleResumerChange = (event) => {
        const file = event.target.files[0];
        setResumerFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('resumer', resumerFile);
        formData.append('auteurId', auteurId);

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/papers/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                // Paper created successfully, handle accordingly
                console.log('Paper created successfully');
            } else {
                // Handle error case
                console.error('Error creating paper');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error', error);
        }
    };

    return (
        <div>
            <h2>Create Paper</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="resumer">Resumer (PDF)</label>
                    <input
                        type="file"
                        id="resumer"
                        accept=".pdf"
                        onChange={handleResumerChange}
                    />
                </div>
                <div>
                    <label htmlFor="auteurId">Auteur ID</label>
                    <input
                        type="text"
                        id="auteurId"
                        value={auteurId}
                        onChange={(event) => setAuteurId(event.target.value)}
                    />
                </div>
                <button type="submit">Create Paper</button>
            </form>
        </div>
    );
}

export default StorePaper;
