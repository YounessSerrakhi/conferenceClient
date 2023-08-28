import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import Cookies from 'js-cookie';

export default function SpeakerCarts() {

    const [speakers, setSpeakers] = useState([]);

	const {api} = useAuth();
	

	useEffect(() => {
        // Fetch the list of activities from the server
		console.log('test');
				api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
                api.get('/api/speakers').then(response=>{
					setSpeakers(response.data);
					console.log("speakers fetshed");
				}

				).catch (error =>{
                console.error('Error fetching speakers:', error);
            });
		},[]);

  return (
    <div class="box container" id="speakers">
    <section>
    <header>
		<h3>Event Speakers</h3>
	</header>
    <div class="row row-cols-1 row-cols-md-3 g-4">
    {speakers.map(speaker => (
  <div class="col">
    <div class="card">
      <img class="card-img-top" height={'300px'} src={`http://127.0.0.1:8000/storage/${speaker.image}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
      <div class="card-body">
        <h5 class="card-title">{`${speaker.firstname} ${speaker.lastname}`}</h5>
        <p class="card-text text-center">{speaker.bio}</p>
      </div>
    </div>
  </div>))}
</div>
</section>
</div>
  )
}
