// npm modules
import { useState } from 'react'





// components



// services
import * as eventService from '../../services/eventService'

// styles
import styles from './ProfileCard.module.css'


export default function ProfileCard({ guest, type, user, kiki }) {
  const [approveClick, setApproveClick] = useState(0)

  const handleApproveClick = async (kikiId, guestId) => {
    await eventService.approveInvite(kikiId, guestId)
    setApproveClick(approveClick + 1)
  }

  return (
    <div className={styles.container}>
      <img src={guest.photo} alt="guest avatar" />
      <p>{guest.name}</p>
      {type === "pending" &&
        <button
          onClick={() => handleApproveClick(kiki._id, guest._id)}
        >
          Approve Invite
        </button>
      }
      {type === "approved" && guest._id !== user.profile &&
        <button>
          Remove Invite
        </button>
      }
    </div>
  )
}
