import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan } from './apiActions'
import moment from 'moment'

const slice = createSlice({
  name: 'voters',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    votersRequested: (voters, action) => {
      voters.loading = true
    },
    votersReceived: (voters, action) => {
      voters.list = action.payload.message
      voters.loading = false
      voters.lastFetch = Date.now()
    },
    votersRequestFailed: (voters, action) => {
      voters.loading = false
    },
  },
})

export const { votersReceived, votersRequested, votersRequestFailed } =
  slice.actions
export default slice.reducer

//Action creators
const url = '/voters'

//Getting list of voters from server
export const loadVoters = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.voters
 
  const diffInDays = moment().diff(moment(lastFetch), 'days')
  if (diffInDays < 1) return

  return dispatch(
    apiCallBegan({
      url,
      onStart: votersRequested.type,
      onSuccess: votersReceived.type,
      onError: votersRequestFailed.type,
    })
  )
}

//Memoization functions

/* Filters */

const nbrVoterGroupedByState = (voters = []) => {
  return voters.reduce((groupedVoter, voter) => {
    const stateName = voter.state.name
    if (groupedVoter[stateName] == null) groupedVoter[stateName] = 0
    groupedVoter[stateName]++
    return groupedVoter
  }, {})
}

const nbrVoterGroupedByIsVoted = (voters = []) => {
  return voters.reduce((groupedVoter, voter) => {
    const stateName = voter.state.name
    if (groupedVoter[stateName] == null) groupedVoter[stateName] = 0
    if (voter.hasVoted) groupedVoter[stateName]++
    return groupedVoter
  }, {})
}

const nbrVoterGroupedByAge = (voters = []) => {
  let voterAge = 0
  let range = ''

  return voters.reduce((groupedVoter, voter) => {
    voterAge = +voter.age

    if (voterAge <= 30) range = '18 - 30'
    else if (voterAge <= 40) range = '31 - 40'
    else if (voterAge <= 50) range = '41 - 50'
    else if (voterAge <= 60) range = '51 - 60'
    else range = '> 60'

    if (groupedVoter[range] == null) groupedVoter[range] = 0
    groupedVoter[range]++

    return groupedVoter
  }, {})
}

const nbrVoterDidntVoteGroupedByAge = (voters = []) => {
  let voterAge = 0
  let range = ''

  return voters.reduce((groupedVoter, voter) => {
    if (voter.hasVoted) return groupedVoter

    voterAge = +voter.age

    if (voterAge <= 30) range = '18 - 30'
    else if (voterAge <= 40) range = '31 - 40'
    else if (voterAge <= 50) range = '41 - 50'
    else if (voterAge <= 60) range = '51 - 60'
    else range = '> 60'

    if (groupedVoter[range] == null) groupedVoter[range] = 0
    if (!voter.hasVoted) groupedVoter[range]++

    return groupedVoter
  }, {})
}

//Memoization functions

export const getRegisteredVotersByState = createSelector(
  (state) => state.entities.voters.list,
  (voters) => nbrVoterGroupedByState(voters)
)

export const getRegisteredVotersByIsVoted = createSelector(
  (state) => state.entities.voters.list,
  (voters) => nbrVoterGroupedByIsVoted(voters)
)

export const getRegisteredVotersByAge = createSelector(
  (state) => state.entities.voters.list,
  (voters) => nbrVoterGroupedByAge(voters)
)

export const getVotersDidntVoteByAge = createSelector(
  (state) => state.entities.voters.list,
  (voters) => nbrVoterDidntVoteGroupedByAge(voters)
)
