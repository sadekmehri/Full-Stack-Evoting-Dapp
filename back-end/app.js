const winston = require('winston')
const app = require('express')()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/config')()

const port = process.env.APP_PORT || 4000

app.listen(port, () => {
  winston.info(`Listening on port ${port}...`)
})
