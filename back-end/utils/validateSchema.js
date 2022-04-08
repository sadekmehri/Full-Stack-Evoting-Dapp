const Joi = require('joi')

module.exports = (schema = {}, object = {}) => {
  const option = { abortEarly: true }
  return schema.validateAsync(object, option)
}
