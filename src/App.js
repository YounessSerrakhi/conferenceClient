import './assets/css/main.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthProvider } from './Contexts/AuthContext';
import StoreSpeaker from './components/speaker/StoreSpeaker';
import ListSpeakers from './components/speaker/ListSpeakers';


function App() {
  return (
    <div className="App">
    <ListSpeakers/>
      <BrowserRouter>
      <AuthProvider>
    <Routes>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
    </Routes>
      </AuthProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;