import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './components/home'
import Voter from './components/voter'
import Statistics from './components/statistics'
import Administrator from './components/administrator'
import NotRegistered from './components/not-registered'
import MetaMask from './reusable/meta-mask'
import ScrollToTop from './reusable/scroll-to-top'
import NotFound from './reusable/error/404'
import Authenticated from './reusable/protected-route'
import Public from './reusable/public-route'
import Roles from './utils/roles'
import BadRequest from './reusable/error/500'

class App extends MetaMask {
  render() {
    return (
      <>
        <Switch>
          <Authenticated
            path='/auth/administrator'
            role={Roles.Admin}
            render={(props) => <Administrator {...props} />}
          />

          <Authenticated
            path='/auth/voter'
            role={Roles.Voter}
            render={(props) => <Voter {...props} />}
          />

          <Authenticated
            path='/auth/not-registered'
            role={Roles.Other}
            render={(props) => <NotRegistered {...props} />}
          />

          <Public exact path='/' component={Home} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/bad-request' component={BadRequest} />
          <Route path='/not-found' component={NotFound} />
          <Redirect to='/not-found' />
        </Switch>

        <ScrollToTop height={300} />
        <ToastContainer />
      </>
    )
  }
}

export default withRouter(App)
