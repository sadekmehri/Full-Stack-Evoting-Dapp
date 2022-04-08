const Web3 = require('web3')

module.exports = async (address = '') => {
  return await Web3.utils.isAddress(address)
}
