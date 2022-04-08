const Joi = require('joi')

const createSchema = Joi.object({
  address: Joi.string().required().label('Address'),
  age: Joi.number().integer().min(18).required().label('Age'),
  state: Joi.number().integer().min(0).required().label('State'),
})

module.exports = {
  createSchema,
}
