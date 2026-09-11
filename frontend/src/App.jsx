// import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // const [drivers, setDrivers] = useState([])

  // useEffect(() => {
  //   fetch('https://api.openf1.org/v1/drivers')
  //     .then(res => res.json())
  //     .then(setDrivers)
  //     .catch(console.error)
  // }, [])


  return (
    <div className="HeaderBar">
      <div className="HeaderLeft">
        <h1 id="header">Marius Biograf</h1>
      </div>
      <div className="HeaderRight">
        <button id="headerButton">Login</button>
      </div>

    </div>
  )
}

export default App