const _ = require('lodash')
const Voter = require('../../models/voter')
const Workflow = require('../../models/workflow')
const eliminateSpecialChars = require('../../utils/eliminateSpecialChars')
const isEthereumAddress = require('../../utils/ethereumAddress')
const validateSchema = require('../../utils/validateSchema')
const stateService = require('../../services/state')
const getWeb3 = require('../../connection/getWeb3')
const Roles = require('../../utils/roles')

// @desc    Get the voter type
// @route   GET /api/voters/me
// @access  Public

const authenticate = async (req, res) => {
  const contract = await getWeb3()
  const address = req.header('x-auth-token')

  const validAddress = await isEthereumAddress(address)
  if (!validAddress)
    return res
      .status(400)
      .send({ status: 'error', message: 'Invalid ethereum address' })

  const isAdmin = await contract.methods.isAdministrator(address).call()
  if (isAdmin)
    return res
      .status(200)
      .send({ status: 'success', message: { address, role: Roles.Admin } })

  const isRegistered = await contract.methods.isRegisteredVoter(address).call()
  const voterType = isRegistered ? Roles.Voter : Roles.Other
  return res.status(200).send({
    status: 'success',
    message: { address, role: voterType },
  })
}

// @desc    Create new voter record
// @route   POST /api/voters/
// @access  Private

const createVoter = async (req, res) => {
  /* Check if the election is in voting session */
  const contract = await getWeb3()

  /* Check the current election phase */
  const workflowPhase = +(await contract.methods.getWorkflowStatus().call())
  if (workflowPhase !== Workflow.Phase.RegisteringVoters)
    return res.status(400).send({
      status: 'error',
      message: "You can't register a voter in the current phase",
    })

  /* Validating voter structure */
  try {
    await validateSchema(Voter.createSchema, req.body)
  } catch (ex) {
    return res
      .status(400)
      .send({ status: 'error', message: eliminateSpecialChars(ex.message) })
  }

  const { address, state, age } = req.body

  /* Check if the given ethereum is valid  */
  const validAddress = await isEthereumAddress(address)
  if (!validAddress)
    return res
      .status(400)
      .send({ status: 'error', message: 'Invalid ethereum address' })

  /* Check if the current user is already registered  */
  const isRegistered = await contract.methods.isRegisteredVoter(address).call()
  if (isRegistered)
    return res.status(400).send({
      status: 'error',
      message: 'The current voter is already registered',
    })

  /* Check if the given state id exists */
  try {
    await stateService.getState(state)
  } catch (ex) {
    return res.status(ex.response.status).send({
      status: 'error',
      message: ex.response.data.message,
    })
  }

  /* Register voter */
  await contract.methods
    .registerVoter(address, state, age)
    .send({ from: req.user, gas: 3000000 })

  return res.status(201).send({
    status: 'success',
    message: 'The voter is successfully registered',
  })
}

// @desc    Get voters' list
// @route   GET /api/voters/
// @access  Public

const getVoters = async (_req, res) => {
  /* Reject if there are no voters records */
  const contract = await getWeb3()

  const nbrVoters = +(await contract.methods.nbrVoters().call())
  if (nbrVoters === 0)
    return res
      .status(404)
      .send({ status: 'error', message: 'There are no voters records' })

  let states = null
  try {
    const { data } = await stateService.getStates()
    states = data.message
  } catch (ex) {
    return res
      .status(ex.response.status)
      .send({ status: 'error', message: ex.response.data.message })
  }

  /* Voters data transformation */
  const voters = await contract.methods.getVotersTuple().call()
  const votersArray = voters.map((voter) => {
    const voterObject = _.pick(voter, ['isRegistered', 'hasVoted', 'age'])
    voterObject.state = states[voter.stateId]
    return voterObject
  })

  return res.status(200).send({ status: 'success', message: votersArray })
}

// @desc    Get voter record by his ethereum address
// @route   GET /api/voters/:address
// @access  Public

const getVoter = async (req, res) => {
  /* Check if the given ethereum address is valid  */
  const { address } = req.params

  const validAddress = await isEthereumAddress(address)
  if (!validAddress)
    return res
      .status(400)
      .send({ status: 'error', message: 'Invalid ethereum address' })

  const contract = await getWeb3()

  /* Check if the given ethereum address is registered  */
  const registeredVoter = await contract.methods
    .isRegisteredVoter(address)
    .call()

  if (!registeredVoter)
    return res
      .status(400)
      .send({ status: 'error', message: 'Voter is not registered' })

  /* Structuring voter object  */
  const voter = await contract.methods.voters(address).call()

  let state = null
  try {
    const { data } = await stateService.getState(voter.stateId)
    state = data.message
  } catch (ex) {
    return res
      .status(ex.response.status)
      .send({ status: 'error', message: ex.response.data.message })
  }

  const newVoter = _.pick(voter, ['isRegistered', 'hasVoted', 'age'])
  newVoter.state = _.pick(state, ['id', 'name'])

  return res.status(200).send({ status: 'success', message: newVoter })
}

module.exports = {
  authenticate,
  createVoter,
  getVoters,
  getVoter,
}
