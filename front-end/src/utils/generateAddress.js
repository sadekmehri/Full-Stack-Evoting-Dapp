const ethers = require('ethers')
const crypto = require('crypto')

export const generateAddress = () => {
  let id = crypto.randomBytes(32).toString('hex')
  let privateKey = '0x' + id
  let wallet = new ethers.Wallet(privateKey)
  return wallet.address
}
