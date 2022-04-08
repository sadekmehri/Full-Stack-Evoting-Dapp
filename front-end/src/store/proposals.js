import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './apiActions'
import moment from 'moment'

const slice = createSlice({
  name: 'proposals',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    proposalsRequested: (proposals, action) => {
      proposals.loading = true
    },
    proposalsReceived: (proposals, action) => {
      proposals.list = action.payload.message
      proposals.loading = false
      proposals.lastFetch = Date.now()
    },
    proposalsRequestFailed: (proposals, action) => {
      proposals.loading = false
    },
  },
})

export const { proposalsReceived, proposalsRequested, proposalsRequestFailed } =
  slice.actions
export default slice.reducer

//Action creators
const url = '/proposals'

//Getting list of proposals from server
export const loadProposals = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.proposals

  const diffInDays = moment().diff(moment(lastFetch), 'days')
  if (diffInDays < 1) return

  return dispatch(
    apiCallBegan({
      url,
      onStart: proposalsRequested.type,
      onSuccess: proposalsReceived.type,
      onError: proposalsRequestFailed.type,
    })
  )
}



