import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function Payment() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    fetch(`/api/Movies/GetMovieByid/${MovieId}`)
    .then(response => response.json())
    .then(data => setMovies(data.message))
  },[movieId])

  return (
    <>
    <div className="CommonHeaderBar">
      <div className="CommonHeaderLeft">
        <h1 id="CommonheaderText">Marius Bio</h1>
      </div>
      <div className="CommonHeaderRight">
        <button id="CommonButton" onClick={() => navigate('/program')}>Program</button>
        <button id="CommonButton" onClick={() => navigate('/about')}>Om Biografen</button>
        <button id="CommonButton" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
     <div className="CommonContent">
        {movies.map((movie) => (
          <h1 key={movie.id}>{movie.MovieName}</h1>
        ))}
      </div>
  </>
  )
}