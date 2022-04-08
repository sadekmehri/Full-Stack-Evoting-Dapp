const _ = require('lodash')
const Workflow = require('../../models/workflow')
const Election = require('../../models/election')
const isEthereumAddress = require('../../utils/ethereumAddress')
const validateSchema = require('../../utils/validateSchema')
const getWeb3 = require('../../connection/getWeb3')
const proposalService = require('../../services/proposal')
const eliminateSpecialChars = require('../../utils/eliminateSpecialChars')

// @desc    Get the election's winner
// @route   GET /api/election
// @access  Public

const getElectionResult = async (_req, res) => {
  /* Check the current election phase */
  const contract = await getWeb3()

  const workflowPhase = +(await contract.methods.getWorkflowStatus().call())
  if (workflowPhase !== Workflow.Phase.VotesRallied)
    return res.status(400).send({
      status: 'error',
      message: "You can't see the final election result",
    })

  const winnerId = +(await contract.methods.getWinningProposalId().call())

  /* Check if the given proposal id exists */
  try {
    const { data } = await proposalService.getProposal(winnerId)
    return res.status(200).send({
      status: 'success',
      message: data.message,
    })
  } catch (ex) {
    return res.status(ex.response.status).send({
      status: 'error',
      message: ex.response.data.message,
    })
  }
}

// @desc    Voter submit his choice during the voting session
// @route   POST /api/election
// @access  Public

const vote = async (req, res) => {
  /* Check the current election phase */
  const contract = await getWeb3()

  const workflowPhase = +(await contract.methods.getWorkflowStatus().call())
  if (workflowPhase !== Workflow.Phase.VotingSessionStarted)
    return res.status(400).send({
      status: 'error',
      message: "You can't vote in the current phase",
    })

  /* Validating election structure */
  try {
    await validateSchema(Election.createSchema, req.body)
  } catch (ex) {
    return res
      .status(400)
      .send({ status: 'error', message: eliminateSpecialChars(ex.message) })
  }

  const { address, choice } = req.body

  /* Check if the given ethereum is valid  */
  const validAddress = await isEthereumAddress(address)
  if (!validAddress)
    return res
      .status(400)
      .send({ status: 'error', message: 'Invalid ethereum address' })

  /* Check if the voter is registered  */
  const isRegistered = await contract.methods.isRegisteredVoter(address).call()
  if (!isRegistered)
    return res.status(400).send({
      status: 'error',
      message: 'The current voter is not registered',
    })

  /* Check if the given proposal id exists */
  try {
    await proposalService.getProposal(choice)
  } catch (ex) {
    return res.status(ex.response.status).send({
      status: 'error',
      message: ex.response.data.message,
    })
  }

  /* Voting proccess */
  try {
    const options = { from: address, gas: 3000000 }
    await contract.methods.vote(choice).send(options)
  } catch (ex) {
    return res.status(400).send({
      status: 'error',
      message: 'You have already submitted your vote',
    })
  }

  return res.status(200).send({
    status: 'success',
    message: 'You have successfully submitted your vote',
  })
}

module.exports = {
  vote,
  getElectionResult,
}
