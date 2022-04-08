require('dotenv').config()
const axios = require('axios')

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
})

instance.interceptors.response.use(null, (err) => {
  const { response } = err
  const expectedError =
    response && response.status >= 400 && response.status < 500
  if (!expectedError) console.log('Unexpected Error Happened')

  return Promise.reject(err)
})

module.exports = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
}
