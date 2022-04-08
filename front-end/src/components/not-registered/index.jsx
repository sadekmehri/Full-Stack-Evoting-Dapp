import React, { Component } from 'react'
import authToken from '../../utils/authToken'
import { Link } from 'react-router-dom'
import './styles.css'

class NotRegistered extends Component {
  componentDidMount = () => {
    authToken.clearToken()
  }

  render() {
    return (
      <div id='notfound'>
        <div className='notfound'>
          <div>
            <div className='notfound-404'>
              <h1>!</h1>
            </div>
            <h2>
              Error
              <br />
              Not Allowed
            </h2>
          </div>
          <p>
            You are not allowed to access beacause you haven't registered .
            Please contact the administrator .
            <Link to='/'>Back to homepage</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default NotRegistered
