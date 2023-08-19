import { AuthProvider} from './Contexts/AuthContext';
import AdminSide from './sides/AdminSide';
import UserSide from './sides/UserSide';
import Cookies from 'js-cookie';



function App() {
  return (
    <AuthProvider>
      {Cookies.get('role')==='admin'?<AdminSide/>:<UserSide/>}
    </AuthProvider>
  );
}

export default App;