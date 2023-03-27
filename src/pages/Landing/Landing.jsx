import styles from './Landing.module.css'
import { Map, Marker } from 'react-map-gl'
import { useState, useEffect } from 'react'
import * as eventService from '../../services/eventService'

const Landing = ({ user, location }) => {
  const [viewState, setViewState] = useState({
    latitude: location.lat,
    longitude: location.lng,
    zoom: 10
  })

  const [kikis, setKikis] = useState([])

  useEffect(() => {
    const getAllKikis = async () => {
      const kikis = await eventService.getAllEvents()
      setKikis(kikis)
    }
    getAllKikis()
  }, [])


  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}, let's have a kiki!</h1>
      <Map
        initialViewState={viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: 800, height: 800 }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {/* {kikis.map((kiki) => 
          <Marker 
          key={kiki._id}
          latitude={kiki.geoLocation[1]}
          longitude={kiki.geoLocation[0]}
          />
        )} */}
      </Map>
    </main>
  )
}

export default Landing
