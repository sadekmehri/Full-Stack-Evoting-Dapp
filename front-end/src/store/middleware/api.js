import * as actions from '../apiActions'
import axios from 'axios'

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action)

    const { url, method, data, headers, onStart, onSuccess, onError } =
      action.payload

    if (onStart) dispatch({ type: onStart })
    next(action)

    try {
      const response = await axios.request({
        baseURL: 'http://localhost:5000/api',
        timeout: 10000,
        url,
        method,
        data,
        headers,
      })

      if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
      // Catch unexpected error
      const { response } = error
      const expectedError =
        response && response.status >= 400 && response.status < 500

      if (!expectedError) window.location.replace('/bad-request')

      if (onError) dispatch({ type: onError, payload: response.data.message })
    }
  }

export default api
