require('dotenv').config()
const Web3 = require('web3')

module.exports = new Web3(
  new Web3.providers.HttpProvider(process.env.TRUFFLE_HTTP_PROVIDER)
)
