const Http = require('./http')

const endPoint = '/proposals'

const getProposal = (id) => {
  const url = `${endPoint}/${id}`
  return Http.get(url)
}

module.exports = {
  getProposal,
}
