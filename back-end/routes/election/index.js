const express = require('express')
const router = express.Router()
const methods = require('../../controllers/election')

router.get('/', methods.getElectionResult)
router.post('/', methods.vote)

module.exports = router
