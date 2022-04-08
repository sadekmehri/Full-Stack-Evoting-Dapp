const express = require('express')
const router = express.Router()

router.all('*', async (_req, res) => {
  return res.status(404).send({ status: 'error', message: 'Not found' })
})

module.exports = router
