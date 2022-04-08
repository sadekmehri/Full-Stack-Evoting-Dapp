const Http = require('./http')

const endPoint = '/states'

const getStates = () => {
  const url = endPoint + ''
  return Http.get(url)
}

const getState = (id) => {
  const url = `${endPoint}/${id}`
  return Http.get(url)
}
module.exports = {
  getStates,
  getState,
}
