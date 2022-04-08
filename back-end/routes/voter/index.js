const express = require('express')
const router = express.Router()
const methods = require('../../controllers/voter')
const auth = require('../../middleware/auth')

router.get('/me', methods.authenticate)
router.get('/', methods.getVoters)
router.get('/:address', methods.getVoter)
router.post('/', auth, methods.createVoter)

module.exports = router
