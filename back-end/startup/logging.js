const winston = require('winston')
require('express-async-errors')

module.exports = () => {
  const options = {
    file: {
      level: 'info',
      handleExceptions: true,
      format: winston.format.json(),
      filename: 'logs/logger.log',
      timestamp: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      format: winston.format.simple(),
      colorize: true,
      prettyPrint: true,
    },
  }

  process.on('unhandledRejection', (err) => {
    winston.info(err, 'Unhandled Rejection at Promise !')
    process.exit(1)
  })

  process.on('uncaughtException', (err) => {
    winston.info(err, 'Uncaught Exception thrown !')
    process.exit(1)
  })

  winston.add(new winston.transports.Console(options.console))
  winston.add(new winston.transports.File(options.file))
}
