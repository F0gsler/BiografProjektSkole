import '../App.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'

const PRICE = 100

const START_SEATS = [
  ['Free', 'Free', 'Taken', 'Free', 'Free'],
  ['Free', 'Taken', 'Taken', 'Free', 'Free'],
  ['Free', 'Free', 'Free', 'Free', 'Taken'],
  ['Free', 'Free', 'Free', 'Free', 'Taken'],
]

export default function Payment() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [time, setTime] = useState(null)
  const [seats, setSeats] = useState(START_SEATS)
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/Movie/GetAllMovies')
      const data = await response.json()
      setMovie(Array.isArray(data) ? data.find(item => item.movieId == movieId) : null)
    }

    getData()
  }, [movieId])

  // Find alle valgte sæder
  const selected = []
  seats.forEach((row, r) => {
    row.forEach((seat, s) => {
      if (seat === 'Selected') selected.push(`Row ${r + 1} Seat ${s + 1}`)
    })
  })

  // Skift et sæde mellem ledigt og valgt
  function toggleSeat(r, s) {
    const newSeats = seats.map(row => [...row])
    newSeats[r][s] = seats[r][s] === 'Free' ? 'Selected' : 'Free'
    setSeats(newSeats)
  }

  // Gem kvittering og gør valgte sæder optagede
  function pay() {
    setReceipt({ seats: selected.join(', '), total: selected.length * PRICE })
    setSeats(seats.map(row => row.map(seat => seat === 'Selected' ? 'Taken' : seat)))
  }

  return (
    <>
      <Navbar />
      <div className="CommonContent">
        <h1>{movie?.movieName}</h1>

        <button onClick={() => setTime('14:00')}>14:00</button>
        <button onClick={() => setTime('15:30')}>15:30</button>
        <button onClick={() => setTime('18:30')}>18:15</button>
        <button onClick={() => setTime('20:15')}>20:15</button>


        {time && (
          <>
            {seats.map((row, r) => (
              <div key={r}>
                {row.map((seat, s) => (
                  <button key={s} className={`Seat ${seat}`} disabled={seat === 'Taken'} onClick={() => toggleSeat(r, s)}>
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