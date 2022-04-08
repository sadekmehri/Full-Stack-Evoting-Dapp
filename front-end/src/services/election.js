import http from './http'
import authToken from '../utils/authToken'

const endPoint = '/election'

/* Submit the vote */
const vote = (choice = -1) => {
  const voter = {
    address: authToken.getToken()?.address,
    choice,
  }

  const url = endPoint
  return http.post(url, voter)
}

/* Get the winner */
const getWinner = () => {
  const url = endPoint
  return http.get(url)
}

const election = {
  vote,
  getWinner,
}

export default election
