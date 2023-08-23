import { AuthProvider } from './Contexts/AuthContext';
import AdminSide from './sides/AdminSide';
import UserSide from './sides/UserSide';
import Cookies from 'js-cookie';



function App() {
  return (
    <AuthProvider>
      {Cookies.get('role') === 'admin' ? <UserSide /> : <UserSide />}
    </AuthProvider>
  );
}

export default App;