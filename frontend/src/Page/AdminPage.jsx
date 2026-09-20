import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Admin() {
  const navigate = useNavigate()
  const [besked, setBesked] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [adminLevel, setAdminLevel] = useState(0)

  // Create Admin User
  const CAUCALL = "createAdminUser"
  const createAdminUser = async () => {
    try {
      const res = await fetch(`/api/Admin/${CAUCALL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          adminLevel: adminLevel,
        }),
      })

      const data = await res.json()
      setBesked(`Oprettet: ${data.username}`)
    } catch (err) {
      setBesked(`Fejl: ${err.message}`)
    }
  }

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
        <button id="CommonButton" onClick={createAdminUser}>Opret admin</button>
        <input id="inputContent" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input id="inputContent" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input id="inputContent" type="number" value={adminLevel} onChange={(e) => setAdminLevel(e.target.value)} placeholder="Admin Level" />
        <p>{besked}</p>
      </div>
    </>
  )
}