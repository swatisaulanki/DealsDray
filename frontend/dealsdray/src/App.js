import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import CreateEmployee from './Pages/CreateEmployee';
import Routing from './Routing';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routing/>
    </div>
  );
}

export default App;
