import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useAuth } from '../Contexts/AuthContext';
import Cookies from 'js-cookie';


export default function Profile() {
  const [userData, setUserData] = useState({
    prenom: '',
    nom: '',
    email: '',
    tel: '',
  });
  const {api} = useAuth(); 

  const fetchUserData = () => {
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.get('/api/user')
      .then(response => {
        setUserData({
          prenom: response.data.userData.prenom || '',
          nom: response.data.userData.nom || '',
          email: response.data.userData.email || '',
          tel: response.data.userData.tel || '',
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSaveChanges = () => {
    api.post('/api/users/update', userData)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const handleCancel = () => {
    fetchUserData();
  };

  return (
    <div className="wrapper bg-white mt-sm-5">
      <h4 className="pb-4 border-bottom">Profile settings</h4>
      <div className="d-flex align-items-start py-3 border-bottom">
        <img
          src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="img"
          alt=""
          style={{ maxWidth: '100px', borderRadius: '50%' }}
        />
        <div className="pl-sm-4 pl-2" id="img-section">
          <b style={{ fontSize: '1.2rem' }}>Profile Photo</b>
          <p style={{ fontSize: '0.9rem' }}>
            Accepted file type: .png, Less than 1MB
          </p>
          <button className="btn button border" style={{ fontSize: '1rem' }}>
            <b>Upload</b>
          </button>
        </div>
      </div>

      <div className="py-2">
        <div className="row py-2">
          <div className="col-md-6">
            <label htmlFor="prenom">prenom</label>
            <input
              type="text"
              className="bg-light form-control"
              placeholder="votre prenom"
              value={userData.prenom}
              onChange={event =>
                setUserData(prevData => ({
                  ...prevData,
                  prenom: event.target.value,
                }))
              }
            />
          </div>
          <div className="col-md-6 ">
            <label htmlFor="lastname">nom</label>
            <input
              type="text"
              className="bg-light form-control"
              placeholder="votre nom"
              value={userData.nom}
              onChange={event =>
                setUserData(prevData => ({
                  ...prevData,
                  nom: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-md-6 ">
            <label htmlFor="email">Email Addresse</label>
            <input
              type="text"
              className="bg-light form-control"
              placeholder="votre email"
              value={userData.email}
              onChange={event =>
                setUserData(prevData => ({
                  ...prevData,
                  email: event.target.value,
                }))
              }
            />
          </div>
          <div className="col-md-6 ">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="bg-light form-control"
              placeholder="+212000000000"
              value={userData.tel}
              onChange={event =>
                setUserData(prevData => ({
                  ...prevData,
                  tel: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="row py-2">
          <div className="col-md-6">
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              className="bg-light"
              value={userData.country}
              onChange={event =>
                setUserData(prevData => ({
                  ...prevData,
                  country: event.target.value,
                }))
              }
            >
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
              <option value="uae">UAE</option>
            </select>
          </div>
          <div className="col-md-6" id="lang">
            <label htmlFor="language">Language</label>
            <div className="arrow">
              <select
                name="language"
                id="language"
                className="bg-light"
                value={userData.language}
                onChange={event =>
                  setUserData(prevData => ({
                    ...prevData,
                    language: event.target.value,
                  }))
                }
              >
                <option value="english">English</option>
                <option value="english_us">English (United States)</option>
                <option value="enguk">Frensh</option>
                <option value="arab">Arabic</option>
              </select>
            </div>
          </div>
        </div>
        <div className="py-3 pb-4 border-bottom">
          <button className="btn btn-primary mr-3" onClick={handleSaveChanges}>Save Changes</button>
          <button className="btn border button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
