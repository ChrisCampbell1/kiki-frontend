import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as profileService from '../../services/profileService.js'
import * as authService from '../../services/authService.js'


const initialState = {
  profile: {},
  isLoading: true
}

export const setProfile = createAsyncThunk('profile/setProfile', async (name, thunkAPI) => {
  const profiles = await profileService.getAllProfiles()
  const user = await authService.getUser()
  const profile = profiles.filter((profile) => profile._id === user.profile)
  return profile[0]
})

// setProfile: async (state) => {
//   const user = await authService.getUser()
//   const profiles = await profileService.getAllProfiles()
//   console.log(profiles)
// }

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => { //these are all chained togehter with .
    builder
    .addCase(setProfile.pending, (state) => {
      state.isLoading = true
    })
    .addCase(setProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.profile = action.payload
    })
    .addCase(setProfile.rejected, (state) => {
      state.isLoading = false
    })
  },
})


export default profileSlice.reducer
