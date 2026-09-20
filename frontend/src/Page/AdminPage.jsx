import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Admin() {
  const navigate = useNavigate()
  const [besked, setBesked] = useState('')

  const createAdminUser = async () => {
    try {
      const res = await fetch('/api/Admin/CreateAdminUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'marius',
          password: 'hemmeligt123',
          adminLevel: 1,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

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
      <div>
        <button id="CommonButton" onClick={createAdminUser}>Opret admin</button>
        <p>{besked}</p>
      </div>
    </>
  )
}