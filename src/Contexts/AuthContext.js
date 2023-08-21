import React, { createContext, useContext, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
    withCredentials: true,
  });

  const login = (response) => {
    Cookies.set('token', `${response.data.token}`, { secure: true, sameSite: 'strict',expires: 7 });
    setIsAuthenticated(true);
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.get("api/user").then(response=>{
      Cookies.set('userName', `${response.data.userData.nom} ${response.data.userData.prenom}`, { expires: 7 });
      Cookies.set('userEmail', `${response.data.userData.email}`, { expires: 7 });
      Cookies.set('id', `${response.data.userData.id}`, { expires: 7 });
      Cookies.set('role', `${response.data.userData.userType}`, { expires: 7 });
      }).catch(error => {
      alert(error);
    });
  };

  const logout = () => {
    api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    api.post('api/logout').then(response => {
      alert(response.data.message); }).catch(err=>{
        alert(err);
      });     
    setIsAuthenticated(false);
    Cookies.remove('token');
    Cookies.set('role', 'user', { expires: 7 });
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    Cookies.remove('id');

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
}
