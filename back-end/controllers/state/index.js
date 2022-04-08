const _ = require('lodash')
const State = require('../../models/state')
const voterService = require('../../services/voter')
const stateService = require('../../services/state')
const getWeb3 = require('../../connection/getWeb3')

// @desc    Get state by id
// @route   GET /api/states/:id
// @access  Public

const getState = async (req, res) => {
  /* Check if there are state records */
  const contract = await getWeb3()

  const nbrStates = +(await contract.methods.nbrStates().call())
  if (nbrStates === 0)
    return res
      .status(404)
      .send({ status: 'error', message: 'There are no state records' })

  /* Check if the given state id exists */
  try {
    const { id, name } = await contract.methods.states(req.params.id).call()
    return res.status(200).send({ status: 'success', message: { id, name } })
  } catch (ex) {
    return res.status(404).send({
      status: 'error',
      message: 'This is no such state with this given id',
    })
  }
}

// @desc    Get list of states
// @route   GET /api/states/
// @access  Public

const getStates = async (_req, res) => {
  /* Check if there is a state record */
  const contract = await getWeb3()

  const nbrStates = +(await contract.methods.nbrStates().call())
  if (nbrStates === 0)
    return res
      .status(404)
      .send({ status: 'error', message: 'There are no state records' })

  /* Transform the response to a suitable state structure */
  const { transformStates } = State
  const response = await contract.methods.getStatesTuple().call()
  const states = await transformStates(response)

  return res.status(200).send({ status: 'success', message: states })
}

// @desc    Get voters' list in a given state
// @route   GET /api/states/:id/voters
// @access  Public

const getVotersByState = async (req, res) => {
  /* Get the state  */
  let state = null
  try {
    const { data } = await stateService.getState(req.params.id)
    state = data.message
  } catch (ex) {
    return res
      .status(ex.response.status)
      .send({ status: 'error', message: ex.response.data.message })
  }

  /* Get the voters */
  let voters = null
  try {
    const { data } = await voterService.getVoters()
    voters = data.message
  } catch (ex) {
    return res
      .status(ex.response.status)
      .send({ status: 'error', message: ex.response.data.message })
  }

  /* Transformation */
  const newVoters = voters.filter((voter) => {
    return voter.state.id === state.id
  })

  /* Check if there is a voter in a given state */
  if (newVoters.length === 0)
    return res.status(404).send({
      status: 'error',
      message: 'There are no voters in the given state',
    })

  return res.status(200).send({ status: 'success', message: newVoters })
}

module.exports = {
  getStates,
  getState,
  getVotersByState,
}
