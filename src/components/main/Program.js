import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import Cookies from 'js-cookie';

export default function Program() {
  const [activities, setActivities] = useState([]);
  const { api } = useAuth();
  const [numberOfDays, setNumberOfDays] = useState(1); // Initialize with 1 day
  const [selectedDay, setSelectedDay] = useState(1); // Default to the first day

  useEffect(() => {
    // Fetch the list of activities from the server
    console.log('test');
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.get('/api/activities')
      .then((response) => {
        setActivities(response.data);
        console.log("activity fetched");

        const maxDay = response.data.reduce((max, activity) => {
          return activity.day > max ? activity.day : max;
        }, 0);

        console.log("Maximum day:", maxDay);

        setNumberOfDays(maxDay); // Update the number of days based on the fetched data
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
      });
  }, []);

  return (
    <div className="box container" id='program'>
      <section>
        <header>
          <h3>Event Schedule</h3>
        </header>
        <div className="day-toggle">
          <div className="container">
            <div className="row">
              <div className="col-lg-11">
                <div className="properties__button mb-40">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      {Array.from({ length: numberOfDays }, (_, index) => (
                        <a
                          key={index + 1}
                          onClick={() => setSelectedDay(index + 1)}
                          className={`nav-item nav-link ${
                            selectedDay === index + 1 ? 'active' : ''
                          }`}
                          id={`nav-day-${index + 1}-tab`}
                          role="tab"
                          aria-controls={`nav-day-${index + 1}`}
                          aria-selected="true"
                        >
                          Day - 0{index + 1}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="default">
            <thead>
              <tr>
                <th>Horaire</th>
                <th>title</th>
                <th>Description</th>
                <th>Speakers</th>
              </tr>
            </thead>
            <tbody>
              {activities
                .filter((activity) => activity.day == selectedDay) // Filter activities based on selected day
                .map((activity) => (
                  <tr key={activity.id}>
                    <td scope="row">{activity.time}</td>
                    <td>{activity.title}</td>
                    <td>{activity.description}</td>
                    <td>{activity.presenterName}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">19:00 END</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
