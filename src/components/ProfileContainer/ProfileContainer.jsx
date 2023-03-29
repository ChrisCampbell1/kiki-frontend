// npm modules




// components
import ProfileCard from '../ProfileCard/ProfileCard'


// services


// styles
import styles from './ProfileContainer.module.css'


export default function ProfileContainer({ guests, type, user, kiki }) {
  return (
    <div className={styles.ProfileContainer}>
      {guests.map((guest) => 
        <ProfileCard key={guest._id} guest={guest} type={type} user={user} kiki={kiki}/>
      )}
    </div>
  )
}
