// npm modules
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'





// components



// services
import * as eventService from '../../services/eventService'


// styles
import styles from './Landing.module.css'

const Landing = ({ user, location, kikis }) => {
  const navigate = useNavigate()
  const lat = location.lat
  const lng = location.lng

  console.log(location, "location prop")

  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 10
  })

  const [selectedKiki, setSelectedKiki] = useState(null)


  const handleRequestClick = async (id) => {
    console.log(id)
    await eventService.requestInvite(id)
    navigate(`/events/my-events`)
  }

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
                <button
                onClick={() => handleRequestClick(selectedKiki._id)}
                >
                  Request Invite
                </button>
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
