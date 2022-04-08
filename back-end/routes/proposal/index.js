const express = require('express')
const router = express.Router()
const methods = require('../../controllers/proposal')
const auth = require('../../middleware/auth')

router.post('/', auth, methods.createProposal)
router.get('/:id', methods.getProposal)
router.get('/', methods.getProposals)

module.exports = router
