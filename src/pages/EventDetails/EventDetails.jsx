// npm modules
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'




// components
import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'


// services
import * as eventService from '../../services/eventService'


// styles
import styles from './EventDetails.module.css'

export default function EventDetails({ user, setKikis, kikis }) {
  const navigate = useNavigate()
  const [approved, setApproved] = useState(false)
  const [kiki, setKiki] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchKiki = async () => {
      const kiki = await eventService.fetchEvent(id)
      setKiki(kiki)
      kiki.approvedGuests.forEach((guest) => {
        if (guest._id === user.profile) {
          setApproved(true)
        }
      })
    }
    fetchKiki()
  }, [])

  const handleDeleteClick = async (evt) => {
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

  if (!kiki) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <main>
      <h1>{kiki.title}</h1>
      <h3>Host: {kiki.host.name}</h3>
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
          <ProfileContainer guests={kiki.approvedGuests} type={"approved"} user={user} kiki={kiki} setKikis={setKikis} kikis={kikis} setKiki={setKiki} />
        </>
      }
      {kiki.host._id === user.profile &&
        <>
          <h3>Pending Invites</h3>
          <ProfileContainer guests={kiki.pendingGuests} type={"pending"} user={user} kiki={kiki} setKikis={setKikis} kikis={kikis} setKiki={setKiki} />
        </>
      }
    </main>
  )
}
