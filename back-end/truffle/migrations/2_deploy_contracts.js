const String = artifacts.require('./String.sol')
const Election = artifacts.require('./Election.sol')

const doDeploy = async (deployer) => {
  await deployer.deploy(String)
  await deployer.link(String, Election)
  await deployer.deploy(Election)
}

module.exports = (deployer) => {
  deployer.then(async () => {
    await doDeploy(deployer)
  })
}
