const Joi = require('joi')

const Phase = {
  RegisteringVoters: 0,
  ProposalsRegistrationStarted: 1,
  ProposalsRegistrationEnded: 2,
  VotingSessionStarted: 3,
  VotingSessionEnded: 4,
  VotesRallied: 5,
}

Object.freeze(Phase)

const getCurrentWorkflow = (object = {}, index = 0) => {
  const keys = Object.keys(object)
  if (index >= keys.length || index < 0) index = 0
  return keys[index].toLowerCase()
}

const createSchema = Joi.object({
  phase: Joi.number()
    .integer()
    .min(1)
    .max(Object.keys(Phase).length - 1)
    .required()
    .label('Phase'),
})

module.exports = {
  Phase,
  createSchema,
  getCurrentWorkflow,
}
