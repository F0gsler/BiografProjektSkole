import '../App.css'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  const navigate = useNavigate()

  return (
    <>
        <div className="CommonHeaderBar">
          <div className="CommonHeaderLeft">
              <h1 id="CommonheaderText">Marius Bio</h1>
          </div>
          <div className="CommonHeaderRight">
              <button id="CommonButton" onClick={() => navigate('/program')}>Program</button>
              <button id="CommonButton" onClick={() => navigate('/priser')}>Priser</button>
              <button id="CommonButton" onClick={() => navigate('/about')}>Om Biografen</button>
              <button id="CommonButton" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
        
        <div className="HomeContent">
            <h2 id="homeHeader">Velkommen til Marius Bio</h2>
            <p id="homeText">Se alle de fantasiske film vi har på programmet</p>
            <button className="homeButton" onClick={() => navigate('/program')}>Se program</button>
        </div>
    </>
  )
}