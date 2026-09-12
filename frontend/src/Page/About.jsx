import '../App.css'
import { useNavigate } from 'react-router-dom'


export default function About() {
  const navigate = useNavigate()

  return (
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
  )
}