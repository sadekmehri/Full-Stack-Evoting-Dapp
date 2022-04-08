const ElectionContract = artifacts.require('Election')

contract('Election Contract', (accounts) => {
  let electionContract = null
  before(async () => {
    electionContract = await ElectionContract.deployed()
  })

  describe('Deploy Contract', () => {
    it('-> Should properly deploy smart contract', () => {
      expect(electionContract.address).to.not.equal('')
    })
  })

  describe('Administrator', () => {
    it('-> Should pass if the caller is an administrator', async () => {
      const result = await electionContract.isAdministrator(accounts[0])
      expect(result).to.be.true
    })

    it('-> Should fail if the caller is not an administrator', async () => {
      const result = await electionContract.isAdministrator(accounts[1])
      expect(result).to.be.false
    })
  })
})
