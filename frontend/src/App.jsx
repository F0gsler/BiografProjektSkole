import './App.css'
import { Route, Routes } from 'react-router-dom'
import Program from './Page/Program.jsx'
import Payment from './Page/Payment.jsx'
import About from './Page/About.jsx'
import Login from './Page/Login.jsx'
import Error from './Page/404Error.jsx'
import Home from './Page/Home.jsx'
import Admin from './Page/Admin.jsx'
import { RequireLogin } from './Components/AuthContext.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      <Route path="/program" element={<Program />} />
      <Route path="/payment" element={<RequireLogin><Payment /></RequireLogin>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App