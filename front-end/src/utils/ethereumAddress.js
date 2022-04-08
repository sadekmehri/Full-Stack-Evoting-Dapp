import Web3 from 'web3'

export const isValidEthereumAddress = (value, helpers) => {
  const validAddress = Web3.utils.isAddress(value)
  if (!validAddress) throw new Error('Invalid Ethereum Address')
  return value
}
