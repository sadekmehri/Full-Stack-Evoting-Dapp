import React, { Component } from 'react'
import authToken from '../../utils/authToken'
import NotFound from './../error/404';
import { Route, Redirect } from 'react-router-dom'

class Authenticated extends Component {
  render() {
    const { component: Component, path, render, role, ...rest } = this.props
    return (
      <Route
        {...rest}
        path={path}
        render={(props) => {
          const auth = authToken.getToken()

          if (!auth) return <Redirect to='/' />

          if (auth.role !== role) return <NotFound {...props} />

          return Component ? <Component {...props} /> : render(props)
        }}
      />
    )
  }
}

export default Authenticated
