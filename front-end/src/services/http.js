import axios from 'axios'
import authToken from '../utils/authToken'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
    'x-auth-token': authToken.getToken()?.address,
  },
})

instance.interceptors.response.use(null, (err) => {
  const { response } = err
  const expectedError =
    response && response.status >= 400 && response.status < 500
  if (!expectedError) console.log('Oupps! Something wrong happened')

  return Promise.reject(err)
})

const Http = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
}

export default Http
