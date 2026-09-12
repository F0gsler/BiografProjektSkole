import '../App.css'
import { useNavigate } from 'react-router-dom'


export default function Error() {
  const navigate = useNavigate()

  return (
    <div className="ErrorPage">
        <h1 id="errorHeader">404 - Page Not Found</h1>
        <button id="CommonButton" onClick={() => navigate('/program')}>Return to Program</button>
    </div>
  )
}