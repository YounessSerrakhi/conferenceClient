import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import Cookies from 'js-cookie';


export default function Program() {
	const [activities, setActivities] = useState([]);

	const {api} = useAuth();
	

	useEffect(() => {
        // Fetch the list of activities from the server
		console.log('test');
				api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
                api.get('/api/activities').then(response=>{
					setActivities(response.data);
					console.log("activity fetshed");
				}

				).catch (error =>{
                console.error('Error fetching activities:', error);
            });
		},[]);


  return (
	<div class="box container">
  <section>
	
	<div class="table-wrapper">
		<table class="default">
			<thead>
				<tr>
					<th>Horaire</th>
					<th>title</th>
					<th>Description</th>
					<th>Speakers</th>
				</tr>
			</thead>
			<tbody>
                        {activities.map((activity) => (
                            <tr key={activity.id}>
								<td scope="row"> {activity.time} </td>
								<td> {activity.title}</td>
								<td> {activity.description}</td>
								<td> {activity.presenterName}</td>
                            </tr>
                        ))}
						
            </tbody>
			<tfoot>
				<tr>
					<td colspan="0">19:00</td>
					<td>END</td>
				</tr>
			</tfoot>
		</table>
	</div>
</section>
</div>
)}
