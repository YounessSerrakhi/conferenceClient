import './assets/css/main.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import StoreSpeaker from './components/speaker/StoreSpeaker';

function App() {
  return (
    <div className="App">
      <Header />

      <Main />
      <Footer />
    </div>
  );
}

export default App;