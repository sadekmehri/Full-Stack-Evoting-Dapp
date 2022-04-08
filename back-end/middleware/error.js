const winston = require('winston')

module.exports = (err, req, res, next) => {
  winston.info(err.message)
  return res.status(500).send({
    status: 'error',
    message: 'Something went wrong. Please try again.',
  })
}
