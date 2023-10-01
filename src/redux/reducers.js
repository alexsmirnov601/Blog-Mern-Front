import { combineReducers } from '@reduxjs/toolkit'
import { api } from './api'
import auth from './slices/auth'

export default combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
})
