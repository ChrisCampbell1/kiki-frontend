import styles from './Landing.module.css'
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import { useState, useEffect } from 'react'
import * as eventService from '../../services/eventService'
import { Link } from 'react-router-dom'

const Landing = ({ user, location }) => {

  const lat = location.lat
  const lng = location.lng

  console.log(location, "location prop")

  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 10
  })

  const [selectedKiki, setSelectedKiki] = useState(null)



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
      {user ?
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
                  if (selectedKiki === null) {
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
        :
        <>
          <h1>logged out landng page</h1>
        </>
      }
    </main>
  )
}

export default Landing
