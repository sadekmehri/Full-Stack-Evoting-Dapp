const _ = require('lodash')
const Workflow = require('../../models/workflow')
const Proposal = require('../../models/proposal')
const getWeb3 = require('../../connection/getWeb3')
const validateSchema = require('../../utils/validateSchema')
const eliminateSpecialChars = require('../../utils/eliminateSpecialChars')

// @desc    Create new proposal record
// @route   POST /api/proposals
// @access  Private

const createProposal = async (req, res) => {
  /* Check the current election phase */
  const contract = await getWeb3()

  const workflowPhase = +(await contract.methods.getWorkflowStatus().call())
  if (workflowPhase !== Workflow.Phase.ProposalsRegistrationStarted)
    return res.status(400).send({
      status: 'error',
      message: "You can't register a proposal in the current phase",
    })

  /* Check if the caller is registered  */
  const isRegistered = await contract.methods.isRegisteredVoter(req.user).call()
  if (!isRegistered)
    return res.status(400).send({
      status: 'error',
      message: 'The current caller is not registered',
    })

  /* Validating proposal structure */
  try {
    await validateSchema(Proposal.createSchema, req.body)
  } catch (ex) {
    return res
      .status(400)
      .send({ status: 'error', message: eliminateSpecialChars(ex.message) })
  }

  /* Proposal registration proccess */
  const options = { from: req.user, gas: 3000000 }
  const { fullName, image, description } = _.pick(
    req.body,
    'fullName',
    'image',
    'description'
  )

  try {
    await contract.methods
      .registerProposal([0, fullName, image, description, 0])
      .send(options)
    return res.status(201).send({
      status: 'success',
      message: 'Proposal is successfully registered',
    })
  } catch (err) {
    return res
      .status(400)
      .send({ status: 'error', message: 'Proposal is already registered' })
  }
}

// @desc    Get proposal by id
// @route   GET /api/proposals/:id
// @access  Public

const getProposal = async (req, res) => {
  /* Reject if there is no proposals record */
  const contract = await getWeb3()

  const nbrProposals = +(await contract.methods.nbrProposals().call())
  if (nbrProposals === 0)
    return res
      .status(404)
      .send({ status: 'error', message: 'There are no proposal records' })

  /* Get proposals tuple */
  try {
    const proposal = await contract.methods.proposals(req.params.id).call()
    const proposalsObject = _.pick(proposal, [
      'id',
      'fullName',
      'imageUrl',
      'description',
      'voteCount',
    ])
    return res.status(200).send({ status: 'success', message: proposalsObject })
  } catch (err) {
    return res.status(404).send({
      status: 'error',
      message: 'there is no proposal with this given id',
    })
  }
}

// @desc    Get proposals' list
// @route   GET /api/proposals
// @access  Public

const getProposals = async (_req, res) => {
  /* Reject if there is no proposals record */
  const contract = await getWeb3()

  const nbrProposals = +(await contract.methods.nbrProposals().call())
  if (nbrProposals === 0)
    return res
      .status(404)
      .send({ status: 'error', message: 'There are no proposal records' })

  /* Get proposals tuple */
  const proposals = await contract.methods.getProposalsTuple().call()

  /* Transformation */
  const proposalsArray = proposals.map((proposal) =>
    _.pick(proposal, ['id', 'fullName', 'imageUrl', 'description', 'voteCount'])
  )

  return res.status(200).send({ status: 'success', message: proposalsArray })
}

module.exports = {
  createProposal,
  getProposal,
  getProposals,
}
