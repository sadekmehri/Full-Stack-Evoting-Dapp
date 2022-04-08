const express = require('express')
const router = express.Router()
const methods = require('../../controllers/state')

router.get('/', methods.getStates)
router.get('/:id', methods.getState)
router.get('/:id/voters', methods.getVotersByState)

module.exports = router
