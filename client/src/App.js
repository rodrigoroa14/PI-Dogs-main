import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path ='/home' element={<Home />}/>
        <Route path='/dog' element={<DogCreate />}/>
        <Route path='/dogs/:id' element={<Detail />}/>
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
