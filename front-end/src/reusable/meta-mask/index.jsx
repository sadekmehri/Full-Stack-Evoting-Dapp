import authToken from '../../utils/authToken'
import Roles from '../../utils/roles'
import Auth from '../../services/voters'
import { Component } from 'react'
import { toastify } from '../../utils/toast'

class MetaMask extends Component {
  componentDidMount = async () => {
    if (!this.isMetaMaskInstalled())
      return toastify('error', 'Please install MetaMask!')

    const { ethereum } = window
    ethereum.on('accountsChanged', this.handleAccountsChanged)
    ethereum.on('connect', this.handleAccountsChanged)
    ethereum.on('disconnect', this.handleAccountsChanged)
  }

  /* Release listeners */
  componentWillUnmount = () => {
    const { ethereum } = window
    ethereum.removeListener('accountsChanged', this.handleAccountsChanged)
    ethereum.removeListener('connect', this.handleAccountsChanged)
    ethereum.removeListener('disconnect', this.handleAccountsChanged)
  }

  /* Check if the meta mask is installed and supported */
  isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask)
  }

  /* Loading Meta Mask */
  handleLoadWeb3 = () => {
    const { ethereum } = window

    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(this.handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) return toastify('warning', err.message)
      })
  }

  /* User changes  Meta Mask account */
  handleAccountsChanged = async (accounts = []) => {
    authToken.clearToken()

    if (accounts['chainId'] !== undefined) return
    if (accounts.length === 0) return

    try {
      const { data } = await Auth.login(accounts[0])
      authToken.setToken(data.message)
      this.redirectTo(data.message)
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        return console.log(ex.response.data.message)
    }
  }

  /* Redirect to specific path */
  redirectTo = (auth = {}) => {
    let url = ''
    switch (auth.role) {
      case Roles.Admin:
        url = '/auth/administrator'
        break
      case Roles.Voter:
        url = '/auth/voter'
        break
      case Roles.Other:
        url = '/auth/not-registered'
        break
      default:
        url = '/not-found'
        break
    }
    this.props.history.replace(url)
  }
}

export default MetaMask
