import './assets/css/main.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import StoreSpeaker from './components/speaker/StoreSpeaker';
import ListSpeakers from './components/speaker/ListSpeakers';

function App() {
  return (
    <div className="App">
      <Header />
      <ListSpeakers/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;