import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../Components/Navbar'

 
export default function Login() {
  const navigate = useNavigate()
   
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [createUserState, setcreateUserState] = useState(false)


  const CPCALL = "CreatePerson"
  const createPerson = async () => {
    try {
        const res = await fetch(`/api/Person/${CPCALL}`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          age: age,
        }),
      })

      const data = await res.json()
      setBesked(`Oprettet: ${data.username}`)
    } catch (err) {
      setBesked(`Fejl: ${err.message}`)
    }
  }
  
  
  function handleClick(){
    createPerson()
    setcreateUserState(!createUserState)
    window.location.reload();
  }

  return (
   <>
    <Navbar />

    {createUserState === false &&
    <div>
      <h1>Login</h1>
      <input id="inputContent" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
      <input id="inputContent" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      <button id="CommonButton" onClick={() => setcreateUserState(!createUserState)}>Create User</button>
    </div>
    }
    {createUserState === true && 
    <div>
      <h1>Create User</h1>
        <input id="inputContent" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input id="inputContent" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input id="inputContent" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input id="inputContent" type="number" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
        <button id="CommonButton" onClick={handleClick}>Create User</button>
    </div>
    }
    
   </>
  )
}