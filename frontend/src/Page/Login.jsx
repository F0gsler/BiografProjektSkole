import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [createUserState, setcreateUserState] = useState(false)
  const [besked, setBesked] = useState('')

  // Samme funktion til login og opret - kun endpoint og data er forskellig
  async function handleSend() {
    if (!username || !password) return setBesked('Udfyld brugernavn og password')

    const action = createUserState ? 'Register' : 'Login'
    const data = createUserState
      ? { username, password, email: email || null, age: Number(age) || 0 }
      : { username, password }

    try {
      const res = await fetch(`/api/Login/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) return setBesked((await res.text()) || 'Noget gik galt')

      const bruger = await res.json() // { personId, username, email, age }
      localStorage.setItem('bruger', JSON.stringify(bruger)) // husk hvem der er logget ind
      navigate('/') // logget ind -> forsiden
    } catch (err) {
      setBesked(`Fejl: ${err.message}`)
    }
  }

  function handleClick() {
    setcreateUserState(!createUserState)
    setBesked('')
  }

  return (
   <>
    <Navbar />

    {createUserState === false &&
    <div>
      <h1>Login</h1>
      <input id="inputContent" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
      <input id="inputContent" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      <button id="CommonButton" onClick={handleSend}>Login</button>
      <button id="CommonButton" onClick={handleClick}>Create User</button>
    </div>
    }
    {createUserState === true &&
    <div>
      <h1>Create User</h1>
        <input id="inputContent" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input id="inputContent" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input id="inputContent" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input id="inputContent" type="number" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
        <button id="CommonButton" onClick={handleSend}>Create User</button>
    </div>
    }

    {besked && <p>{besked}</p>}
   </>
  )
}