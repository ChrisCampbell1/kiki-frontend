// npm modules
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'




// components
import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'


// services
import * as eventService from '../../services/eventService'


// styles
import styles from './EventDetails.module.css'

export default function EventDetails({ user, setKikis, kikis }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    kiki.approvedGuests.forEach((guest) => {
      if(guest._id === user.profile) {
        setApproved(true)
      }
    })
  },[])


  const kiki = location.state

  console.log(kiki, "kiki from location")

  const handleDeleteClick = async(evt) => {
    const event = await eventService.deleteEvent(kiki._id)
    setKikis(kikis.filter((kiki) => kiki._id !== event._id))
    navigate('/')
  } 
  
  const handleRequestClick = async (id) => {
    const event = await eventService.requestInvite(id)
    let updatedKikis = kikis.filter((kiki) => kiki._id !== event._id)
    setKikis([...updatedKikis, event])
    navigate(`/events/my-events`)
  }

  return (
    <main>
      <h1>{kiki.title}</h1>
      <p>{kiki.description}</p>
      <p>Confirmed Guests: {kiki.approvedGuests.length}</p>
      {kiki.host._id !== user.profile &&
        <button
          onClick={() => handleRequestClick(kiki._id)}
        >
          Request Invite
        </button>
      }
      {kiki.host._id === user.profile &&
        <button
          onClick={() => handleDeleteClick()}
        >
          Delete Kiki
        </button>
      }

      {approved &&
        <>
          <h3>Attendees</h3>
          <ProfileContainer guests={kiki.approvedGuests} type={"approved"} user={user} kiki={kiki} setKikis={setKikis} kikis={kikis}/>
        </>
      }
      {kiki.host._id === user.profile &&
        <>
          <h3>Pending Invites</h3>
          <ProfileContainer guests={kiki.pendingGuests} type={"pending"} user={user} kiki={kiki} setKikis={setKikis} kikis={kikis}/>
        </>
      }
    </main>
  )
}
