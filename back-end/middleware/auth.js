require('dotenv').config()
const getWeb3 = require('../connection/getWeb3')
const isAddress = require('../utils/ethereumAddress')

module.exports = async (req, res, next) => {
  const address = req.header('x-auth-token')
  if (!address)
    return res.status(401).send({
      status: 'error',
      message: 'Access denied !',
    })

  try {
    const contract = await getWeb3()
    const validAddress = await isAddress(address)
    if (!validAddress)
      return res
        .status(400)
        .send({ status: 'error', message: 'Invalid ethereum address !' })

    const isAdmin = await contract.methods.isAdministrator(address).call()
    if (!isAdmin)
      return res
        .status(401)
        .send({ status: 'error', message: 'Unauthorized action !' })

    req.user = address
    next()
  } catch (ex) {
    res.status(400).send({ status: 'error', message: 'Invalid action !' })
  }
}
