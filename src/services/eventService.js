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

export {createEvent}
