import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import Cookies from 'js-cookie';


export default function ListUser() {
  const [responseData, setResponseData] = useState('');
  const {api} = useAuth();

  const fetchUsers = async () => {
        api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
        api.get('api/user').then(response=>{
      setResponseData(response.data.email)}).catch (error => {
      console.error('Error fetching users:', error);
      setResponseData('Error fetching users.');
    });
}

  return (
    <div>
      <button onClick={fetchUsers}>email</button>
      <pre>{responseData}</pre>
    </div>
  );
}


