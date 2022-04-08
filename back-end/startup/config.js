require('dotenv').config()

module.exports = () => {
  if (!process.env.APP_SECRET)
    throw new Error('FATAL ERROR: App Secret is not defined.')

  if (!process.env.TRUFFLE_HTTP_PROVIDER)
    throw new Error('FATAL ERROR: Truffle http provider is not defined.')

  if (!process.env.BASE_URL)
    throw new Error('FATAL ERROR: Axios base url is not defined.')
}
