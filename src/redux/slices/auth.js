import { createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
const initialState = {
  data: [],
  isAuth: false,
  status: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      state.isAuth = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.signIn.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(api.endpoints.signIn.matchFulfilled, (state, { payload }) => {
        state.data = payload
        state.isAuth = true
        state.status = 'fulfilled'
      })
      .addMatcher(api.endpoints.signIn.matchRejected, (state) => {
        state.status = 'rejected'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
