// npm modules
import { useState, useEffect } from 'react'





// components
import EventContainer from '../../components/EventContainer/EventContainer'


// services
import * as eventService from '../../services/eventService'

// styles
import styles from './MyEvents.module.css'





export default function MyEvents({ user, kikis, setKikis }) {
  const [hostedKikis, setHostedKikis] = useState([])
  const [acceptedKikis, setAcceptedKikis] = useState([])
  const [pendingKikis, setPendingKikis] = useState([])


  useEffect(() => {
    const getHostedKikis = async () => {
      // const kikis = await eventService.getAllEvents()
      // console.log(kikis, "all kikis")
      const hostedKikis = kikis.filter((kiki) => kiki.host._id === user.profile)
      setHostedKikis(hostedKikis)
      // console.log(hostedKikis, "hostedKikis")
    }
    getHostedKikis()
  }, [])

  useEffect(() => {
    const getAcceptedKikis = async () => {
      // const kikis = await eventService.getAllEvents()
      const acceptedKikis = []
      kikis.forEach((kiki) => {
        kiki.approvedGuests.forEach((guest) => {
          if(guest._id === user.profile && guest._id !== kiki.host._id) {
            acceptedKikis.push(kiki)
          }
        })
      })
      setAcceptedKikis(acceptedKikis)
      // console.log(acceptedKikis, "acceptedKikis")
    }
    getAcceptedKikis()
  }, [])

  useEffect(() => {
    const getPendingKikis = async () => {
      // const kikis = await eventService.getAllEvents()
      const pendingKikis = []
      kikis.forEach((kiki) => {
        kiki.pendingGuests.forEach((guest) => {
          if(guest._id === user.profile) {
            pendingKikis.push(kiki)
          }
        })
      })
      setPendingKikis(pendingKikis)
      // console.log(pendingKikis, "pendingKikis")
    }
    getPendingKikis()
  }, [])
  
  return (
    <main>
      <h1>My Kikis</h1>
      <h2>Kiki's I'm hosting</h2>
      <EventContainer kikis={hostedKikis}/>
      <h2>Accepted Invites</h2>
      <EventContainer kikis={acceptedKikis}/>
      <h2>Pending Invites</h2>
      <EventContainer kikis={pendingKikis}/>
    </main>
  )
}
