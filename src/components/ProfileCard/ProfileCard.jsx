// npm modules






// components



// services


// styles
import styles from './ProfileCard.module.css'


export default function ProfileCard({ guest }) {
  return (
    <div className={styles.container}>
      <img src={guest.photo} alt="guest avatar" />
      <p>{guest.name}</p>
    </div>
  )
}
