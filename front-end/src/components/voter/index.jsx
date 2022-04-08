import React from 'react'
import SideBarVoter from './sidebar'
import VoterDashboard from './dashboard'
import Instructions from './instructions'
import ProposalsDetails from './proposals'
import Logout from '../logout'
import ToggleProvider from '../../context/ToggleContext'
import Toggle from '../../reusable/toggle'
import Footer from '../../reusable/footer'
import NotFound from '../../reusable/error/404'
import { Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/css/app.css'
import './styles.css'

const Voter = () => {
  const uri = '/auth/voter'

  return (
    <ToggleProvider>
      <div className='wrapper'>
        <SideBarVoter />
        <div className='main'>
          <Toggle />
          <main className='content'>
            <div className='container-fluid p-0'>
              <Switch>
                <Route
                  path={uri + '/proposals/vote'}
                  component={ProposalsDetails}
                />
                <Route path={uri + '/instructions'} component={Instructions} />
                <Route path={uri + '/logout'} component={Logout} />
                <Route exact path={uri} component={VoterDashboard} />
                <Route path='/not-found' component={NotFound} />
                <Redirect to='/not-found' />
              </Switch>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </ToggleProvider>
  )
}

export default Voter
