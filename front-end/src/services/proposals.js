import http from './http'
import authToken from '../utils/authToken'

const endPoint = '/proposals'

/* Create new proposal */
const createProposal = (proposal = {}) => {
  const options = {
    headers: {
      'x-auth-token': authToken.getToken()?.address,
    },
  }

  const url = endPoint
  return http.post(url, proposal, options)
}

const proposal = {
  createProposal,
}

export default proposal
