import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListPapers() {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        // Fetch the list of papers
        axios.get('http://127.0.0.1:8000/api/papers')
            .then(response => {
                setPapers(response.data);
            })
            .catch(error => {
                console.error('Error fetching papers', error);
            });
    }, []);

    return (
        <div>
            <h2>List of Papers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Paper ID</th>
                        <th>Resumer</th>
                        <th>Auteur ID</th>
                    </tr>
                </thead>
                <tbody>
                    {papers.map(paper => (
                        <tr key={paper.id}>
                            <td>{paper.id}</td>
                            <td>{paper.resumer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListPapers;
