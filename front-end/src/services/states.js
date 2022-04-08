import http from './http'

const endPoint = '/states'

/* Get states from server */
const getStates = () => {
  const url = endPoint
  return http.get(url)
}

const state = {
  getStates,
}

export default state
