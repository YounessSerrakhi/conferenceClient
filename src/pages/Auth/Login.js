import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import Cookies from 'js-cookie';

function Login() {
  
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const {login,api} = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);


    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.post('api/login', formData, {
    })
      .then(response => {
        login(response);
        alert(response.data.message);
        setEmail("");
        setPassword("");
      })
      .catch(error => {
        console.log(error);
            });
      
  };



 

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="form-label">Email addresse</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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

    <div className="d-flex justify-content-between mb-4">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Remember me
        </label>
      </div>
      <a href="!#" className="text-decoration-none">Mot de passe oublié?</a>
    </div>

    <button className="btn btn-primary mb-4" type="submit">
      S'identifier
    </button>
  </form>

  <div className="text-center">
    <p>
      vous ête pas enregistrer? <Link to='/register'>Register</Link>
    </p>
    <p>
      <Link to='/'>Aller à la page principale! </Link>
    </p>
  </div>
</div>

  );
}

export default Login;
