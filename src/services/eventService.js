import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/events`

const createEvent = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}` },
      body: JSON.stringify(formData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
  
}

const getAllEvents = async () => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'GET'
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteEvent = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const requestInvite = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/requestInvite`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {createEvent, getAllEvents, deleteEvent, requestInvite}
