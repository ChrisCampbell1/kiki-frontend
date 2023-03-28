// npm modules



// components
import EventCard from '../EventCard/EventCard'


// services


// styles
import styles from './EventContainer.module.css'


export default function EventContainer({ kikis }) {
  return (
    <div className={styles.container}>
      {kikis.map((kiki) => 
      <EventCard key={kiki._id} kiki={kiki}/>
      )}
    </div>
  )
}
