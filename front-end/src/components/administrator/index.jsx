import React from 'react'
import RegisterVoter from './registerVoter'
import AdminDashboard from './dashboard'
import SideBarAdmin from './sidebar'
import Workflow from './workflow'
import RegisterProposal from './registerProposal'
import Logout from '../logout'
import ToggleProvider from '../../context/ToggleContext'
import Toggle from '../../reusable/toggle'
import Footer from '../../reusable/footer'
import NotFound from '../../reusable/error/404'
import { Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/css/app.css'

const Administrator = () => {
  const uri = '/auth/administrator'

  return (
    <ToggleProvider>
      <div className='wrapper'>
        <SideBarAdmin />
        <div className='main'>
          <Toggle />
          <main className='content'>
            <div className='container-fluid p-0'>
              <Switch>
                <Route path={uri + '/voters'} component={RegisterVoter} />
                <Route path={uri + '/proposals'} component={RegisterProposal} />
                <Route path={uri + '/workflow'} component={Workflow} />
                <Route path={uri + '/logout'} component={Logout} />
                <Route exact path={uri} component={AdminDashboard} />
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

export default Administrator
