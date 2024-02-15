import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
