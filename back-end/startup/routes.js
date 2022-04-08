require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const state = require('../routes/state')
const voter = require('../routes/voter')
const proposal = require('../routes/proposal')
const workflow = require('../routes/workflow')
const election = require('../routes/election')
const http = require('../routes/http/404')
const error = require('../middleware/error')

const corsOptions = {
  origin: process.env.APP_URI,
  methods: ['GET', 'POST'],
  allowedHeaders: [
    'Content-Type',
    'Access-Control-Allow-Headers',
    'Authorization',
    'Accept',
    'x-auth-token',
    'X-Requested-With',
  ],
}

module.exports = (app) => {
  app.disable('x-powered-by')
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('tiny'))
  app.use('/api/states', state)
  app.use('/api/voters', voter)
  app.use('/api/proposals', proposal)
  app.use('/api/workflows', workflow)
  app.use('/api/election', election)
  app.use(http)
  app.use(error)
}
