import { AuthProvider } from './Contexts/AuthContext';
import AdminSide from './sides/AdminSide';
import UserSide from './sides/UserSide';
import Cookies from 'js-cookie';
import { useEffect , useState} from 'react';



function App() {
const [alertShown, setAlertShown] = useState(false);
  useEffect(() => {
    if (!alertShown) {
      alert("This is a static version of my app for visualization purposes. you can't login or register or access the admin panel, you can contact me or view the docs in my portfolio for for more information.\n\nhttps://younessserrakhi.github.io/portfolio/");
      setAlertShown(true);
    }
  }, []);
  return (
    <AuthProvider>
      {Cookies.get('role') === 'admin' ? <AdminSide /> : <UserSide /> }
    </AuthProvider>
  );
}

export default App;