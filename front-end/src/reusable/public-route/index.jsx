import React from 'react'
import authToken from '../../utils/authToken'
import Roles from '../../utils/roles'
import { Route, Redirect } from 'react-router-dom'

const Public = (props) => {
  const { component: Component, path, render, ...rest } = props
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => {
        const auth = authToken.getToken()
        
        if (!auth) return Component ? <Component {...props} /> : render(props)
        if (auth.role === Roles.Admin) return <Redirect to={'/auth/administrator'} />
        if (auth.role === Roles.Voter) return <Redirect to={'/auth/voter'} />
        if (auth.role === Roles.Other) return <Redirect to={'/auth/not-registered'} />
      }}
    />
  )
}

export default Public
