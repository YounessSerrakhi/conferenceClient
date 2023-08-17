import './assets/css/main.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthProvider } from './Contexts/AuthContext';
import UpdateSpeaker from './components/speaker/UpdateSpeaker';
import UpdateActivity from './components/activity/UpdateActivity';
import UpdatePaper from './components/paper/UpdatePaper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/editspeaker/id' element={<UpdateSpeaker/>}/>
            <Route path='/editactivity/id' element={<UpdateActivity/>}/>
            <Route path='/editspeaker/id' element={<UpdatePaper/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;