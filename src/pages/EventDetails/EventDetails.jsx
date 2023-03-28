import styles from './EventDetails.module.css'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function EventDetails({ user }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    if(kiki.approvedGuests.includes(user.profile)) {
      setApproved(true)
    }
  },[])

  console.log(location)

  const kiki = location.state
  
  return (
    <div>
      <h1>{kiki.title}</h1>
      <p>{kiki.description}</p>
      <p>Confirmed Guests: {kiki.approvedGuests.length}</p>
      <button>
        Request Invite
      </button>
    </div>
  )
}
