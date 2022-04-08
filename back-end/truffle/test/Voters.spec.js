const ElectionContract = artifacts.require('Election')
const truffleAssert = require('truffle-assertions')

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

  describe('Voter Registration', () => {
    let nbrStates = null
    before(async () => {
      nbrStates = await electionContract.nbrStates()
      nbrStates = nbrStates.words[0]
    })

    it('-> Should fail if the caller is not the administrator', async () => {
      await truffleAssert.reverts(
        electionContract.registerVoter(accounts[0], nbrStates - 1, 18, {
          from: accounts[1],
        })
      )
    })

    it('-> Should fail if the age is under 18', async () => {
      await truffleAssert.reverts(
        electionContract.registerVoter(accounts[0], nbrStates - 1, 10)
      )
    })

    it("-> Should fail if the state doesn't exist", async () => {
      await truffleAssert.reverts(
        electionContract.registerVoter(accounts[0], nbrStates, 18)
      )
    })

    it('-> Should pass if there is no error', async () => {
      await truffleAssert.passes(
        electionContract.registerVoter(accounts[0], nbrStates - 1, 18)
      )
    })

    it('-> Should fail if the voter is already registred', async () => {
      await truffleAssert.reverts(
        electionContract.registerVoter(accounts[0], nbrStates - 1, 18)
      )
    })

    it('-> Should fail if the voter tries to register but the registration time exceeded', async () => {
      await electionContract.startProposalsRegistration()
      await truffleAssert.reverts(
        electionContract.registerVoter(accounts[0], nbrStates - 1, 18)
      )
    })

    it('-> Should pass if the voter is registered', async () => {
      const result = await electionContract.isRegisteredVoter(accounts[0])
      expect(result).to.be.true
    })

    it('-> Should fail if the voter is not registered', async () => {
      const result = await electionContract.isRegisteredVoter(accounts[1])
      expect(result).to.be.false
    })
  })
})
