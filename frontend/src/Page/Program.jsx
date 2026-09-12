import '../App.css'
import { useNavigate } from 'react-router-dom'


export default function Program() {
  const navigate = useNavigate()
  const programList = [
    { tid: '16:30', movies: ['Avengers DoomsDay'] },
    { tid: '18:00', movies: ['Star Wars: Vaders Return'] },
    { tid: '20:00', movies: ['Johnny English: Last Misson'] },
    { tid: '22:00', movies: ['Mission Impossible: The Last Mission'] },
  ]

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

    <div className="ProgramContent">
      <ul className="ProgramList">
        {programList.map((slot) => (
          <li className="ProgramItem" key={slot.tid}>
            <h3>{slot.tid}</h3>
            <ul>
              {slot.movies.map((movie) => (
                <li key={movie}>{movie}</li>
              ))}
            </ul>
            <button id="CommonButton" onClick={() => navigate('/payment')}>Køb Billet</button>
          </li>
        ))}
      </ul>
    </div>
  </>
  )
}