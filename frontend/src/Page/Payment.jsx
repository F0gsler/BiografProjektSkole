import '../App.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'

const PRICE = 100
const TIME = '19:30'
const HALL = 'Sal 1'

export default function Payment() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [receipt, setReceipt] = useState(null)

  // 0 = free, 1 = taken, 2 = selected
  const [hall, setHall] = useState([
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ])

  useEffect(() => {
    fetch('/api/Movie/GetAllMovies')
      .then(response => response.json())
      .then(data => setMovie(data.find(m => m.movieId == movieId)))
  }, [movieId])

  function handleClick(r, c) {
    if (hall[r][c] === 1) return
    const newHall = hall.map(row => [...row])
    newHall[r][c] = newHall[r][c] === 2 ? 0 : 2
    setHall(newHall)
    setReceipt(null)
  }


  const selected = []
  hall.forEach((row, r) =>
    row.forEach((seat, c) => { if (seat === 2) selected.push([r, c]) })
  )

  function handlePayment() {
    const newHall = hall.map(row => row.map(seat => seat === 2 ? 1 : seat))
    setHall(newHall)
    setReceipt({
      movie: movie?.movieName,
      time: TIME,
      hall: HALL,
      seats: selected,
      total: selected.length * PRICE,
    })
  }

  return (
    <>
      <Navbar />
      <div className="CommonContent">
        <h1>{movie?.movieName}</h1>

        {hall.map((row, r) => (
          <div key={r}>
            {row.map((seat, c) => (
              <button key={c} className={`Seat ${['', 'Taken', 'Selected'][seat]}`} onClick={() => handleClick(r, c)}>
                {c + 1}
              </button>
            ))}
          </div>
        ))}

        <p className="SelectedText">Selected: {selected.map(([r, c]) => `Row ${r + 1} Seat ${c + 1}`).join(', ')}</p>
        <p className="Total">Total: {selected.length * PRICE} kr.</p>

        <button id="CommonButton" disabled={selected.length === 0} onClick={handlePayment}>
          Pay
        </button>

        {receipt && (
          <div className="Receipt">
            <h2>Receipt</h2>
            <p>Movie: {receipt.movie}</p>
            <p>Time: {receipt.time}</p>
            <p>Hall: {receipt.hall}</p>
            <p>Seats: {receipt.seats.map(([r, c]) => `Row ${r + 1} Seat ${c + 1}`).join(', ')}</p>
            <p>Total: {receipt.total} kr.</p>
          </div>
        )}
      </div>
    </>
  )
}