import http from './http'
import authToken from '../utils/authToken'

const endPoint = '/workflows'

/* Get current election phase */
const getCurrentPhase = () => {
  const url = endPoint
  return http.get(url)
}

/* Setting the next election phase */
const nextPhase = (phase = 0) => {
  const options = {
    headers: {
      'x-auth-token': authToken.getToken()?.address,
    },
  }

  const url = endPoint
  return http.post(url, { phase }, options)
}

const workflow = {
  getCurrentPhase,
  nextPhase,
}

export default workflow
