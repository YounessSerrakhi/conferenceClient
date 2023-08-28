import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,useNavigate} from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';


function Register(){

  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [moreData,setMoreData]=useState({city:"",university:"",currentDegree:"",previousDegrees:"",researchInterests:"",projectExperience:""});
  const [error, setError] = useState(null);
  const {api} = useAuth();
  const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('nom', name);
    formData.append('prenom', firstName);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);


    api.post('api/register', formData, {
    })
      .then(response => {
        console.log(response.data.message);
        setEmail('');
        setTel('');
        setPassword('');
        setFirstName('');
        setName('');
        setPassword_confirmation('');
        navigate('/login');


      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          const validationErrors = error.response.data.errors;
          setError(Object.values(validationErrors).flat().join(' \n'));
        } else {
          setError('An error occurred. Please try again later.');
        }
      });
  };


    return(
      <div className="wrapper my-5 d-flex flex-column">
  <form onSubmit={handleSubmit}>
    <div className="text-center mb-3">
      <h4>Inscription</h4>
    </div>
    <div className="mb-4 row">
      <div className="col">
        <label htmlFor="name" className="form-label">Nom</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col">
        <label htmlFor="firstName" className="form-label">Prénom</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
    </div>
    <div className="mb-4 row">
      <div className="col">
      <label htmlFor="email" className="form-label">Adresse e-mail</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div className="col">
        <label htmlFor="firstTel" className="form-label">GSM</label>
        <input
          type="text"
          className="form-control"
          id="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="form-label">Mot de passe</label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password_confirmation" className="form-label">Répéter le mot de passe</label>
      <input
        type="password"
        className="form-control"
        id="password_confirmation"
        value={password_confirmation}
        onChange={(e) => setPassword_confirmation(e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="city">City of Residence</label>
      <input
        type="text"
        className="bg-light form-control"
        placeholder="Your city of residence"
        value={moreData.city}
        onChange={event =>
          setMoreData(prevData => ({
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
        value={moreData.university}
        onChange={event =>
          setMoreData(prevData => ({
            ...prevData,
            university: event.target.value,
          }))
        }
      />
    </div>

  {/* Educational Background */}
  <div className="row py-2">
    <div className="col-md-6">
      <label htmlFor="currentDegree">Current Degree</label>
      <input
        type="text"
        className="bg-light form-control"
        placeholder="e.g., PhD in Computer Science"
        value={moreData.currentDegree}
        onChange={event =>
          setMoreData(prevData => ({
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
        value={moreData.previousDegrees}
        onChange={event =>
          setMoreData(prevData => ({
            ...prevData,
            previousDegrees: event.target.value,
          }))
        }
      />
    </div>
  </div>

    <div className="form-check d-flex justify-content-center mb-4">
      <input
        className="form-check-input"
        type="checkbox"
        id="formCheck"
        defaultChecked
      />
      <label className="form-check-label" htmlFor="formCheck">
        J'ai lu et j'accepte les termes
      </label>
    </div>

    <button type="submit" className="btn btn-primary mb-4 w-100">
      S'inscrire
    </button>
    <h5 style={{color:'red'}}>{error}</h5>
  </form>
  <div className="text-center">
    <p>
      vous ête déja enregistré? <Link to='/login'>identifier</Link>
    </p>
    <p>
      <Link to='/'>Aller à la page principale! </Link>
    </p>
  </div>
</div>

    
    );
}
export default Register;