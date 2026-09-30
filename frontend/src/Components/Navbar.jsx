import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  // Læs den gemte bruger (null hvis ingen er logget ind)
  const bruger = JSON.parse(localStorage.getItem('bruger') || 'null')

  async function handleLogout() {
    await fetch('/api/Auth/Logout', { method: 'POST' }) // sletter login-cookien i backend
    localStorage.removeItem('bruger')
    navigate('/')
  }

  return (
    <div className="CommonHeaderBar">
      <div className="CommonHeaderLeft">
        <h1 id="CommonheaderText">Marius Bio</h1>
      </div>
      <div className="CommonHeaderRight">
        <button id="CommonButton" onClick={() => navigate('/')}>Home</button>
        <button id="CommonButton" onClick={() => navigate('/program')}>Program</button>
        <button id="CommonButton" onClick={() => navigate('/about')}>Om Biografen</button>
        {bruger ? (
          <>
            <button id="CommonButton" onClick={handleLogout}>Log ud</button>
            <span>Hej {bruger.username}</span>
          </>
        ) : (
          <button id="CommonButton" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </div>
  )
}