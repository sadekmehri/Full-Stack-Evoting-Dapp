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

  describe('Proposal Registration', () => {
    let nbrStates = null
    before(async () => {
      nbrStates = await electionContract.nbrStates()
      nbrStates = nbrStates.words[0]
    })

    it('-> Should fail if he caller must be a registered voter ', async () => {
      await truffleAssert.reverts(
        electionContract.registerProposal(
          [
            0,
            'XXXX',
            'Hello from the otherside',
            'Hello from the otherside',
            0,
          ],
          { from: accounts[0] }
        )
      )
    })

    it('-> Should fail if the proposal registration session is not ready yet ', async () => {
      electionContract.registerVoter(accounts[0], nbrStates - 1, 18)
      await truffleAssert.reverts(
        electionContract.registerProposal(
          [
            0,
            'XXXX',
            'Hello from the otherside',
            'Hello from the otherside',
            0,
          ],
          { from: accounts[0] }
        )
      )
    })

    it('-> Should pass if the proposal registration is active ', async () => {
      await electionContract.startProposalsRegistration()

      const expected = [
        '0',
        'XXXX',
        'Hello from the otherside',
        'Hello from the otherside',
        '0',
      ]
      await electionContract.registerProposal(expected, { from: accounts[0] })
      const proposals = await electionContract.getProposalsTuple()
      const length = await electionContract.nbrProposals()
      expect(proposals[length - 1]).to.include.members(expected)
    })

    it('-> Should fail if the proposal is already registered ', async () => {
      const data = [
        '0',
        'XXXX',
        'Hello from the otherside',
        'Hello from the otherside',
        '0',
      ]
      await truffleAssert.reverts(
        electionContract.registerProposal(data, { from: accounts[0] })
      )
    })

    it('-> Should fail if the proposal registration time exceeded', async () => {
      await electionContract.endProposalsRegistration()
      const data = [
        '0',
        'XXXX',
        'Hello from the otherside',
        'Hello from the otherside',
        '0',
      ]
      await truffleAssert.reverts(
        electionContract.registerProposal(data, { from: accounts[0] })
      )
    })
  })
})
