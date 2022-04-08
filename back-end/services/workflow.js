const Http = require('./http')

const endPoint = '/workflows'

const getWorkFlow = () => {
  const url = endPoint + ''
  return Http.get(url)
}

module.exports = {
  getWorkFlow,
}
