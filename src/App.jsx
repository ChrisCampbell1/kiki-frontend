// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProfile } from './features/profile/profileSlice'


// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CreateEvent from './pages/CreateEvent/CreateEvent'
import EventDetails from './pages/EventDetails/EventDetails'
import MyEvents from './pages/MyEvents/MyEvents'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as eventService from './services/eventService'


// styles
import './App.css'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  })

  //sets state on the app level for all kikis
  const [kikis, setKikis] = useState([])

  useEffect(() => {
    const getAllKikis = async () => {
      const kikis = await eventService.getAllEvents()
      setKikis(kikis)
    }
    getAllKikis()
  }, [])

  //functions from hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //stores profile in redux store
  useEffect(() => {
    dispatch(setProfile())
  }, [user])

  //updates location state on app component
  useEffect(() => {
    const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
  
        function success(pos) {
          const crd = pos.coords;
          console.log("Your current position is:");
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
          console.log(crd, "crd")
          setLocation({
            lat: crd.latitude,
            lng: crd.longitude
          })
        }
  
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
  
        navigator.geolocation.getCurrentPosition(success, error, options);
  }, [user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} location={location} kikis={kikis}/>} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/new"
          element={
            <ProtectedRoute user={user}>
              <CreateEvent location={location} setKikis={setKikis} kikis={kikis}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute user={user}>
              <EventDetails user={user} kikis={kikis} setKikis={setKikis}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/my-events"
          element={
            <ProtectedRoute user={user}>
              <MyEvents user={user} kikis={kikis} setKikis={setKikis}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
