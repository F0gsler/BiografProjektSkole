import '../App.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'

const PRICE = 100
const TIMES = ['14:00', '17:00', '19:30', '21:45']
const HALL = 'Sal 1'
const STATUS = ['', 'Taken', 'Selected'] // 0 = ledig, 1 = optaget, 2 = valgt

export default function Payment() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [time, setTime] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [hall, setHall] = useState([
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ])

  useEffect(() => {
    fetch('/api/Movie/GetAllMovies')
      .then(res => res.json())
      .then(data => setMovie(data.find(m => m.movieId == movieId)))
  }, [movieId])

  const selected = hall.flatMap((row, r) =>
    row.flatMap((seat, c) => (seat === 2 ? `Row ${r + 1} Seat ${c + 1}` : []))
  )
  const total = selected.length * PRICE

  const pickTime = t => { setTime(t); setReceipt(null) }

  const toggleSeat = (r, c) => {
    setHall(hall.map((row, i) => row.map((s, j) =>
      i === r && j === c && s !== 1 ? (s === 2 ? 0 : 2) : s
    )))
    setReceipt(null)
  }

  const pay = () => {
    setHall(hall.map(row => row.map(s => (s === 2 ? 1 : s))))
    setReceipt({ seats: selected.join(', '), total })
  }

  return (
    <>
      <Navbar />
      <div className="CommonContent">
        <h1>{movie?.movieName}</h1>

        {TIMES.map(t => (
          <button key={t} className={`Time ${t === time ? 'Selected' : ''}`} onClick={() => pickTime(t)}>
            {t}
          </button>
        ))}

        {time && (
          <>
            {hall.map((row, r) => (
              <div key={r}>
                {row.map((seat, c) => (
                  <button key={c} className={`Seat ${STATUS[seat]}`} onClick={() => toggleSeat(r, c)}>
                    {c + 1}
                  </button>
                ))}
              </div>
            ))}
            <p className="SelectedText">Selected: {selected.join(', ')}</p>
            <p className="Total">Total: {total} kr.</p>
            <button id="CommonButton" disabled={!selected.length} onClick={pay}>Pay</button>
          </>
        )}

        {receipt && (
          <div className="Receipt">
            <h2>Receipt</h2>
            <p>Movie: {movie?.movieName}</p>
            <p>Time: {time}</p>
            <p>Hall: {HALL}</p>
            <p>Seats: {receipt.seats}</p>
            <p>Total: {receipt.total} kr.</p>
          </div>
        )}
      </div>
    </>
  )
}