const web3 = require('./web3Provider')
const ElectionContract = require('../truffle/build/contracts/Election.json')

module.exports = async () => {
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = ElectionContract.networks[networkId]
  return new web3.eth.Contract(
    ElectionContract.abi,
    deployedNetwork && deployedNetwork.address
  )
}
