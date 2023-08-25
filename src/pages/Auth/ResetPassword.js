import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  const navigate=useNavigate();

  const {api}=useAuth();

  const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    formData.append('token', token);


  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('api/reset-password', formData, {
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      console.log(error);
          });
    setShowPassword(true);
    navigate('/login');
  };

  return (
    <div className='wrapper'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {showPassword && (
        <div>
          <h3>New Password Details:</h3>
          <p>Email: {email}</p>
          <p>New Password: {password}</p>
        </div>
      )}
    </div>
  );
}
