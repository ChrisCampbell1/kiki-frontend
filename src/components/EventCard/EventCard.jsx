// npm modules
import { Link } from 'react-router-dom'


// components


// services


// styles
import styles from './EventCard.module.css'

export default function EventCard({ kiki }) {
  return (
    <div>
      <Link to={`/events/${kiki._id}`} state={kiki}><h3>{kiki.title}</h3></Link>
    </div>
  )
}
