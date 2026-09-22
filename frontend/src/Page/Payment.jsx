import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'


export default function Payment() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])

   useEffect(() => {
    fetch(`/api/Movies/GetMovieByid/${MovieId}`)
    .then(response => response.json())
    .then(data => setMovies(data.message))
  },[movieId])

  return (
    <>
    <Navbar />
     <div className="CommonContent">
        {movies.map((movie) => (
          <h1 key={movie.id}>{movie.MovieName}</h1>
        ))}
      </div>
  </>
  )
}