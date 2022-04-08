const Joi = require('joi')

const createSchema = Joi.object({
  fullName: Joi.string().required().label('Full Name'),
  image: Joi.string().min(3).max(255).required().label('Image'),
  description: Joi.string()
    .min(3)
    .max(255)
    .required()
    .required()
    .label('Description'),
})

module.exports = {
  createSchema,
}
