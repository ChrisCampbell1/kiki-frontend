// npm modules
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// page components


// components


// services
import * as eventService from '../../services/eventService'

// styles
import styles from './CreateEventForm.module.css'

export default function CreateEventForm() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: null,
    geoLocation: [],
    address: "",
    accessNotes: "",
  })

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }
  
  async function handleSubmit(evt) {
    evt.preventDefault()
    try {
      const kiki = await eventService.createEvent(formData)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form 
      autoComplete='off'
      onSubmit={handleSubmit}
      className={styles.container}
      >
        <div className="inputContainer">
          <label htmlFor="title-input">Title</label>
          <input type="text" id='title-input' name='title' onChange={handleChange}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="description-input">Description</label>
          <textarea name="description" id="description-input" cols="30" rows="5" onChange={handleChange}></textarea>
        </div>
        <div className="inputContainer">
          <label htmlFor="category-input">Category</label>
          <select name="category" id="category-input" onChange={handleChange}>
            <option value="Other">Select Category</option>
            <option value="Arts">Arts</option>
            <option value="Food">Food</option>
            <option value="Fitness">Fitness</option>
            <option value="Gaming">Gaming</option>
            <option value="Media">Media</option>
            <option value="Party">Party</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="date-input">Date</label>
          <input type='datetime-local' id="date-input" name="date" onChange={handleChange}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="geoLocation-input">Location</label>
          <input type="text" name="geoLocation" id="geoLocation-input" onChange={handleChange}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="address-input">Address</label>
          <input type="text" name="address" id="address-input" onChange={handleChange}/>
        </div>
        <div className="inputContainer">
          <label htmlFor="instructions-input">Entry Instructions</label>
          <textarea name="accessNotes" id="instructions-input" cols="30" rows="5"onChange={handleChange}></textarea>
        </div>
        <button type="submit">Save Kiki</button>
      </form>
    </div>
  )
}
