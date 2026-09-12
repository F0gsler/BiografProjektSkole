import './App.css'
import { Route, Routes } from 'react-router-dom'
import Program from './Page/program.jsx'
import Price from './Page/price.jsx'
import About from './Page/About.jsx'
import Login from './Page/Login.jsx'
import Error from './Page/404ErrorPage.jsx'
import Home from './Page/Home.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/program" element={<Program />} />
      <Route path="/priser" element={<Price />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App