
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AdminHome() {
    const [users, setUsers] = useState([]);
    const [papers, setPapers] = useState([]);
    const [speakers, setSpeakers] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users').then((r) => console.log(r.data)).catch((e) => console.error(e));
        axios.get('http://127.0.0.1:8000/api/papers').then((r) => console.log(r.data)).catch((e) => console.error(e));
        axios.get('http://127.0.0.1:8000/api/speakers').then((r) => console.log(r.data)).catch((e) => console.error(e));
        axios.get('http://127.0.0.1:8000/api/activities').then((r) => console.log(r.data)).catch((e) => console.error(e));
    });

    return (
        <div className=' childDiv'>
            <div className='m-2'>
                <div className='text-center'>
                    <h2>
                        DashBoard
                    </h2>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <div class="card  bg-light mb-3" style={{ maxWidth: "18rem;" }}>
                            <div class="card-header text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                </svg>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Users</h5>
                                <p class="card-text">
                                    {users.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div class="card bg-light mb-3" style={{ maxWidth: "18rem;" }}>
                            <div class="card-header text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
                                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                                </svg>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Speakers</h5>
                                <p class="card-text">
                                    {speakers.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div class="card bg-light mb-3" style={{ maxWidth: "18rem;" }}>
                            <div class="card-header text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-ppt-fill" viewBox="0 0 16 16">
                                    <path d="M8.188 10H7V6.5h1.188a1.75 1.75 0 1 1 0 3.5z" />
                                    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM7 5.5a1 1 0 0 0-1 1V13a.5.5 0 0 0 1 0v-2h1.188a2.75 2.75 0 0 0 0-5.5H7z" />
                                </svg>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Papers</h5>
                                <p class="card-text">
                                    {papers.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div class="card bg-light mb-3" style={{ maxWidth: "18rem;" }}>
                            <div class="card-header text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-plus-fill" viewBox="0 0 16 16">
                                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM8.5 8.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5a.5.5 0 0 1 1 0z" />
                                </svg>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Activities</h5>
                                <p class="card-text">
                                    {activities.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminHome