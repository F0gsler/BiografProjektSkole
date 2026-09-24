import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'


export default function Program() {

  const navigate = useNavigate()
  const [moviesData, setMoviesData] = useState([]);

 useEffect(() => {
  const getData = async () => {
  const response = await fetch('/api/Movie/GetAllMovies');
  const data = await response.json();
  console.log(data);
  setMoviesData(Array.isArray(data) ? data : []);
};

    getData();
}, []);

  return (
    <>
    <Navbar />

    <div className="ProgramContent">
      {moviesData.map((movie) => (
    <div key={movie.movieId} className="MovieCard">
    <h2>{movie.movieName}</h2>
    <p>{movie.movieDuration} min</p>
    <button id="CommonButton" onClick={() => navigate(`/payment/${movie.movieId}`)}>
      Se film
    </button>
          <div>
      </div>
  </div>
))}
</div>
  </>
  )
}