const Http = require('./http')

const endPoint = '/voters'

const getVoters = () => {
  const url = endPoint + ''
  return Http.get(url)
}

module.exports = {
  getVoters,
}
