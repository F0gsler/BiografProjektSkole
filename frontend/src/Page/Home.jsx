import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Popup from '../Components/popup'


export default function Home() {

  const navigate = useNavigate()
  const AdminLevel = 0
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
        <Navbar />
        
        <div className="HomeContent">
            <h2 id="homeHeader">Velkommen til Marius Bio</h2>
            <p id="homeText">Se alle de fantasiske film vi har på programmet</p>
            <button id="CommonButton" onClick={() => navigate('/program')}>Se program</button>
            <button id="CommonButton" onClick={() => setShowPopup(!showPopup)}>Kontakt Info</button>
            <div>
            {AdminLevel === 0 && <button id="CommonButton" onClick={() => navigate('/admin')}>Admin Page</button>}
            {showPopup === true && <Popup />  }


            </div>
        </div>
    </>
  )
}