import http from './http'
import authToken from '../utils/authToken'

const endPoint = '/voters'

/* Voter login */
const login = (address = '') => {
  const options = {
    headers: {
      'x-auth-token': address,
    },
  }

  const url = endPoint + '/me'
  return http.get(url, options)
}

/* Voter details */
const voterInfo = () => {
  const address = authToken.getToken()?.address
  const url = `${endPoint}/${address}`
  return http.get(url)
}

/* Administrator create new voter */
const registerVoter = (voter = {}) => {
  const options = {
    headers: {
      'x-auth-token': authToken.getToken()?.address,
    },
  }

  const url = endPoint
  return http.post(url, voter, options)
}

const auth = {
  login,
  registerVoter,
  voterInfo,
}

export default auth
