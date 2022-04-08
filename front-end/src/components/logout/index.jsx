import { useEffect } from 'react'
import authToken from '../../utils/authToken'

const Logout = (props) => {
  useEffect(() => {
    authToken.clearToken()
    props.history.replace('/')
  })
  return ''
}

export default Logout
