import '../App.css'
import { useNavigate } from 'react-router-dom'


export default function Payment() {
  const navigate = useNavigate()

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
      <h1>Payment Page</h1>
      
    </div>
  </>
  )
}