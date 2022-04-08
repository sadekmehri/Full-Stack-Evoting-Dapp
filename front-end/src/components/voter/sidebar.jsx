import React from 'react'
import SideItem from '../../reusable/sidebar-item'
import SideBar from '../../reusable/sidebar'

const SideBarVoter = () => {
  const uri = '/auth/voter'

  return (
    <SideBar uri={uri}>
      <SideItem
        url={uri + '/proposals/vote'}
        value={'Proposals'}
        icon={'fas fa-person-sign'}
      />

      <SideItem
        url={uri + '/instructions'}
        value={'Instructions'}
        icon={'fas fa-info'}
      />

      <SideItem
        url={uri + '/logout'}
        value={'Logout'}
        icon={'fas fa-sign-out'}
      />
    </SideBar>
  )
}

export default SideBarVoter
