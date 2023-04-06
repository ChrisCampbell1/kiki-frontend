// npm modules
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'




// components



// services
import * as eventService from '../../services/eventService'

// styles
import styles from './ProfileCard.module.css'


export default function ProfileCard({ guest, type, user, kiki, setKikis, kikis, setKiki }) {
  const navigate = useNavigate()

  const handleApproveClick = async (kikiId, guestId) => {
    const event = await eventService.approveInvite(kikiId, guestId)
    setKikis(kikis.filter((el) => el._id !== event._id))
    setKikis([...kikis, event])
    setKiki(event)
    navigate(`/events/${kiki._id}`)
  }

  const handleRemoveClick = async (kikiId, guestId) => {
    const event = await eventService.removeInvite(kikiId, guestId)
    setKikis(kikis.filter((el) => el._id !== event._id))
    setKikis([...kikis, event])
    setKiki(event)
    navigate(`/events/${kiki._id}`)
  }

  return (
    <div className={styles.container}>
      <img src={guest.photo} alt="guest avatar" />
      <p>{guest.name}</p>
      {type === "pending" && user.profile === kiki.host._id &&
        <button
          onClick={() => handleApproveClick(kiki._id, guest._id)}
        >
          Approve Invite
        </button>
      }
      {type === "approved" && guest._id !== user.profile && user.profile === kiki.host._id &&
        <button
          onClick={() => handleRemoveClick(kiki._id, guest._id)}
        >
          Remove Invite
        </button>
      }
    </div>
  )
}
