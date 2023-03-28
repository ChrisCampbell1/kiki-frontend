import styles from './Landing.module.css'
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import { useState, useEffect } from 'react'
import * as eventService from '../../services/eventService'
import { Link } from 'react-router-dom'

const Landing = ({ user, location }) => {
  const [viewState, setViewState] = useState({
    latitude: location.lat,
    longitude: location.lng,
    zoom: 10
  })

  const [selectedKiki, setSelectedKiki] = useState(null)

  useEffect(() => {
    setViewState({
      latitude: location.lat,
      longitude: location.lng,
      zoom: 10
    })
  }, [])

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
        <GeolocateControl position='top-left' />
        {kikis.map((kiki) =>
          <Marker
            key={kiki._id}
            latitude={kiki.geoLocation[1]}
            longitude={kiki.geoLocation[0]}
          >
            <button 
            className={styles.detailsBtn}
            onClick={(e) => {
              e.stopPropagation()
              if(selectedKiki === null) {
                setSelectedKiki(kiki)
              } else {
                setSelectedKiki(null)
              }
              console.log(selectedKiki)
            }}>
              {kiki.category}
            </button>
          </Marker>
        )}

        {
          selectedKiki &&
          (<Popup
            latitude={selectedKiki.geoLocation[1]}
            longitude={selectedKiki.geoLocation[0]}
            onClose={() => setSelectedKiki(null)}
            closeOnClick
          // latitude={`${selectedKiki.geoLocation[1]}`}
          // longitude={`${selectedKiki.geoLocation[0]}`}
          >
            <div className={styles.popup}>
              <Link to={`/events/${selectedKiki._id}`} state={selectedKiki}>
                <h3>{selectedKiki.title}</h3>
              </Link>
              <p>{selectedKiki.description}</p>
              <p>Confirmed Guests: {selectedKiki.approvedGuests.length}</p>
              <button>Request Invite</button>
              {user.profile === selectedKiki.host._id &&
                <p>
                  <Link to={`/events/${selectedKiki._id}/edit`}>
                    Edit Kiki
                  </Link>
                </p>
              }
              <h3>Hosted By:</h3>
              <Link to={`/profiles/${selectedKiki.host._id}`}>
                <img src={selectedKiki.host.photo} alt="host's avatar" />
                <p>{selectedKiki.host.name}</p>
              </Link>
            </div>
          </Popup>)

        }

      </Map>
    </main>
  )
}

export default Landing
