import { combineReducers } from '@reduxjs/toolkit'
import voterReducer from './voters'
import proposalReducer from './proposals'

export default combineReducers({
  voters: voterReducer,
  proposals: proposalReducer,
})
