// npm modules


// page components


// components
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm'

// services


// styles
import styles from './CreateEvent.module.css'

export default function CreateEvent({ location, setKikis, kikis }) {


  return (
    <div>
      <h1>This is a Create Event Page</h1>
      <CreateEventForm location={location} setKikis={setKikis} kikis={kikis} />
    </div>
  )
}
