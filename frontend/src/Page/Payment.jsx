import '../App.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'

useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/Movie/GetAllMovies')
      const data = await response.json()
      setMovie(Array.isArray(data) ? data.find(item => item.movieId == movieId) : null)
    }

    getData()
  }, [movieId])

const PRICE = 100

// 0 = ledig, 1 = optaget, 2 = valgt
const START_SEATS = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
]
const SEAT_CLASS = ['', 'Taken', 'Selected']

export default function Payment() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [time, setTime] = useState(null)
  const [seats, setSeats] = useState(START_SEATS)
  const [receipt, setReceipt] = useState(null)


  // Find alle valgte sæder
  const selected = []
  for (let r = 0; r < seats.length; r++) {
    for (let s = 0; s < seats[r].length; s++) {
      if (seats[r][s] === 2) {
        selected.push(`Row ${r + 1} Seat ${s + 1}`)
      }
    }
  }

  // Skift et sæde mellem ledigt (0) og valgt (2)
  function toggleSeat(r, s) {
    const newSeats = seats.map(row => [...row])
    newSeats[r][s] = seats[r][s] === 0 ? 2 : 0
    setSeats(newSeats)
  }

  // Gem kvittering og gør valgte sæder optagede
  function pay() {
    setReceipt({
      seats: selected.join(', '),
      total: selected.length * PRICE,
    })
    setSeats(seats.map(row => row.map(seat => seat === 2 ? 1 : seat)))
  }

  return (
    <>
      <Navbar />
      <div className="CommonContent">
        <h1>{movie?.movieName}</h1>

        {/* Tidspunkter */}
        <button className={time === '14:00' ? 'Time Selected' : 'Time'} onClick={() => setTime('14:00')}>14:00</button>
        <button className={time === '17:00' ? 'Time Selected' : 'Time'} onClick={() => setTime('17:00')}>17:00</button>
        <button className={time === '19:30' ? 'Time Selected' : 'Time'} onClick={() => setTime('19:30')}>19:30</button>
        <button className={time === '21:45' ? 'Time Selected' : 'Time'} onClick={() => setTime('21:45')}>21:45</button>

        {/* Sædeplan og betaling */}
        {time && (
          <>
            {seats.map((row, r) => (
              <div key={r}>
                {row.map((seat, s) => (
                  <button key={s} className={`Seat ${SEAT_CLASS[seat]}`} disabled={seat === 1} onClick={() => toggleSeat(r, s)}>
                    {s + 1}
                  </button>
                ))}
              </div>
            ))}

            <p className="SelectedText">Selected: {selected.join(', ')}</p>
            <p className="Total">Total: {selected.length * PRICE} kr.</p>
            <button id="CommonButton" disabled={!selected.length} onClick={pay}>Pay</button>
          </>
        )}

        {/* Kvittering */}
        {receipt && (
          <div className="Receipt">
            <h2>Receipt</h2>
            <p>Movie: {movie?.movieName}</p>
            <p>Time: {time}</p>
            <p>Hall: Sal 1</p>
            <p>Seats: {receipt.seats}</p>
            <p>Total: {receipt.total} kr.</p>
          </div>
        )}
      </div>
    </>
  )
}