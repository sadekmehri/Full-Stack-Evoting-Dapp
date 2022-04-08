const _ = require('lodash')
const Workflow = require('../../models/workflow')
const getWeb3 = require('../../connection/getWeb3')
const workflowService = require('../../services/workflow')
const validateSchema = require('../../utils/validateSchema')
const eliminateSpecialChars = require('../../utils/eliminateSpecialChars')

// @desc    Get the current election workflow phase
// @route   GET /api/workflows/
// @access  Public

const getWorkflow = async (_req, res) => {
  /* Get current workflow */
  const contract = await getWeb3()
  const id = +(await contract.methods.getWorkflowStatus().call())
  const name = Workflow.getCurrentWorkflow(Workflow.Phase, id)

  return res.status(200).send({ status: 'success', message: { id, name } })
}

// @desc    Pass to the next election workflow
// @route   POST /api/workflows
// @access  Private

const nextWorkflow = async (req, res) => {
  /* Validating workflow structure */
  try {
    await validateSchema(Workflow.createSchema, req.body)
  } catch (ex) {
    return res
      .status(400)
      .send({ status: 'error', message: eliminateSpecialChars(ex.message) })
  }

  /* Emit next election workflow phase */
  const contract = await getWeb3()
  const options = { from: req.user, gas: 3000000 }

  try {
    switch (+req.body.phase) {
      case 1:
        await contract.methods.startProposalsRegistration().send(options)
        break
      case 2:
        await contract.methods.endProposalsRegistration().send(options)
        break
      case 3:
        await contract.methods.startVotingSession().send(options)
        break
      case 4:
        await contract.methods.endVotingSession().send(options)
        break
      case 5:
        await contract.methods.tallyVotes().send(options)
        break
    }

    const { data } = await workflowService.getWorkFlow()
    return res.status(200).send({
      status: 'success',
      message: data.message,
    })
  } catch (err) {
    return res.status(400).send({
      status: 'error',
      message: "You can't apply this action",
    })
  }
}

module.exports = {
  getWorkflow,
  nextWorkflow,
}
