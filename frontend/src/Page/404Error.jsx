import '../App.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'


export default function Error() {
  const navigate = useNavigate()

  return (
    <>
    <Navbar />
    <div className="ErrorPage">
        <h1 id="errorHeader">404 - Page Not Found</h1>
        <button id="CommonButton" onClick={() => navigate('/')}>Return to Home</button>
    </div>
    </>
  )
}