const Migrations = artifacts.require('./Migrations.sol')

const doDeploy = async (deployer) => {
  await deployer.deploy(Migrations)
}

module.exports = (deployer) => {
  deployer.then(async () => {
    await doDeploy(deployer)
  })
}
