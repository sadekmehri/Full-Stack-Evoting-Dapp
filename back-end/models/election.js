const Joi = require('joi')

const createSchema = Joi.object({
  address: Joi.string().required().label('Address'),
  choice: Joi.number().integer().min(0).max(100).required().label('Choice'),
})

module.exports = {
  createSchema,
}
