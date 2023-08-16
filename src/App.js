import logo from './logo.svg';
import './App.css';
import Movies from './components/Movies';
import { Route, Routes } from 'react-router-dom';
import MovieDetailsPage from './components/MovieDetailsPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='route'>
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/details" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
