import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useAuth } from '../Contexts/AuthContext';
import Cookies from 'js-cookie';


export default function Profile() {
  const [verified,setVerified]=useState(false);
  const [resumerFile, setResumerFile] = useState(null);
  const [userData, setUserData] = useState({
    id:'',
    prenom: '',
    nom: '',
    email: '',
    tel: '',
    resumerFile: '',
  });
  const {api} = useAuth(); 

  const fetchUserData = () => {
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.get('/api/user')
      .then(response => {
        setUserData({
          id: response.data.userData.id || '',
          prenom: response.data.userData.prenom || '',
          nom: response.data.userData.nom || '',
          email: response.data.userData.email || '',
          tel: response.data.userData.tel || '',
        });
        setVerified(response.data.userData.email_verified_at==null?false:true);

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
    if (window.location.pathname === '/apply') {
      alert("fill all the empty values to get your badge."); 
  }
  }, []);

  const handleSaveChanges = () => {
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.post('/api/users/update', userData)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });


      //for paper
      const paperData = new FormData();
      paperData.append('resumer', resumerFile);
      paperData.append('auteurId', userData.id );
      api.post('/api/papers', paperData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      }).then(response => {
          console.log(response.data);
      })
          .catch(error => {
              console.error('Error uploding paper', error);
          });    
  };

  const handleCancel = () => {
    fetchUserData();
  };

  const handleEmailVerification = () => {
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.post('/api/email/verification-notification')
      .then(response => {
        console.log("A link was resent");
      })
      .catch(error => {
        console.error(error);
      });

  }

  const handleResumerChange = (event) => {
    const file = event.target.files[0];
    setResumerFile(file);
};


  return (
    <div className="wrapper bg-white">
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
      <label htmlFor="city">City of Residence</label>
      <input
        type="text"
        className="bg-light form-control"
        placeholder="Your city of residence"
        value={userData.city}
        onChange={event =>
          setUserData(prevData => ({
            ...prevData,
            city: event.target.value,
          }))
        }
      />
    </div>
    <div className="col-md-6 ">
      <label htmlFor="university">University/Institution Name</label>
      <input
        type="text"
        className="bg-light form-control"
        placeholder="Your university or institution"
        value={userData.university}
        onChange={event =>
          setUserData(prevData => ({
            ...prevData,
            university: event.target.value,
          }))
        }
      />
    </div>
  </div>

  {/* Educational Background */}
  <div className="row py-2">
    <div className="col-md-6">
      <label htmlFor="currentDegree">Current Degree</label>
      <input
        type="text"
        className="bg-light form-control"
        placeholder="e.g., PhD in Computer Science"
        value={userData.currentDegree}
        onChange={event =>
          setUserData(prevData => ({
            ...prevData,
            currentDegree: event.target.value,
          }))
        }
      />
    </div>
    <div className="col-md-6 ">
      <label htmlFor="previousDegrees">Previous Degrees</label>
      <input
        type="text"
        className="bg-light form-control"
        placeholder="e.g., Master's in Engineering"
        value={userData.previousDegrees}
        onChange={event =>
          setUserData(prevData => ({
            ...prevData,
            previousDegrees: event.target.value,
          }))
        }
      />
    </div>
  </div>

  {/* Research Interests */}
  <div className="row py-2">
    <div className="col-md-12">
      <label htmlFor="researchInterests">Research Interests</label>
      <textarea
        className="bg-light form-control"
        rows="3"
        placeholder="Briefly describe your research interests"
        value={userData.researchInterests}
        onChange={event =>
          setUserData(prevData => ({
            ...prevData,
            researchInterests: event.target.value,
          }))
        }
      ></textarea>
    </div>
  </div>

  {/* Project Experience */}
  <div className="row py-2">
    <div className="col-md-12">
      <label htmlFor="projectExperience">Project Experience</label>
      <textarea
        className="bg-light form-control"
        rows="3"
        placeholder="Briefly describe your previous research projects or publications"
        value={userData.projectExperience}
        onChange={event =>
          setUserData(prevData => ({
            ...prevData,
            projectExperience: event.target.value,
          }))
        }
      ></textarea>
    </div>
  </div>


        <div className="d-flex align-items-center py-3">
        <div className="pl-sm-4 pl-2" id="img-section">
          <b style={{ fontSize: '1.2rem' }}>Paper</b>
          <p style={{ fontSize: '0.8rem' }}>
              Put your cin, phd-cart-student,.. in one pdf and <b>upload it</b>
          </p>
        </div>
        <input
              type="file"
              className='form-control'
              id="resumer"
              accept=".pdf"
              onChange={handleResumerChange}
            />
      </div>

        <div className="py-3 pb-4 border-bottom">
          <button className="btn btn-primary mr-3" onClick={handleSaveChanges}>Save Changes</button>
          <button className="btn border button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
  <div className='row py-2'>
  <div className="col-md-6">
    <label>Email Verified? :<b>{verified?"yes":"no"}</b></label>
  </div>
  <div className="col-md-6 d-flex justify-content-end align-items-center">
    {!verified && (
      <button className="btn btn-success" onClick={handleEmailVerification}>
        Verify Your Email
      </button>
    )}
  </div>
</div>


    </div>
  );
}
