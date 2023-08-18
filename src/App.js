import './assets/css/main.css';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import AdminSide from './sides/AdminSide';
import UserSide from './sides/UserSide';
import Cookies from 'js-cookie';



function App() {
  return (
    <AuthProvider>
      {Cookies.get('role') === 'admin' ? <AdminSide /> : <AdminSide />}
    </AuthProvider>
  );
}

export default App;