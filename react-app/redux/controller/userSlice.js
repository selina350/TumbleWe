import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = () => async (dispatch) => {
  const response = await axios('/api/users/me')
  dispatch(fetchUserRequest())
  dispatch(fetchUserSuccess({id: 1, name: 'demo'}))
}

const userSlice = createSlice({
  name: 'user',
  initialState: { fetchPending: true },
  reducers: {
    fetchUserRequest (state, action) {
      state.fetchPending = true
    },
    fetchUserSuccess (state, action) {
      state.fetchPending = false
      state.id = action.payload.id
      state.name = action.payload.name
    },
  },
})

export const { fetchUserRequest, fetchUserSuccess } = userSlice.actions
export default userSlice.reducer