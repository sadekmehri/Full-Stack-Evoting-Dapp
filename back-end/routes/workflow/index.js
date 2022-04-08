const express = require('express')
const router = express.Router()
const methods = require('../../controllers/workflow')
const auth = require('../../middleware/auth')

router.get('/', methods.getWorkflow)
router.post('/', auth, methods.nextWorkflow)

module.exports = router
