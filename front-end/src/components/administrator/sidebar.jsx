import React from 'react'
import SideItem from '../../reusable/sidebar-item'
import SideBar from '../../reusable/sidebar'

const SideBarAdmin = () => {
  const uri = '/auth/administrator'

  return (
    <SideBar uri={uri}>
      <SideItem
        url={uri + '/voters'}
        value={'Voters'}
        icon={'fas fa-user-plus'}
      />

      <SideItem
        url={uri + '/proposals'}
        value={'Proposals'}
        icon={'fas fa-plus'}
      />

      <SideItem
        url={uri + '/workflow'}
        value={'Workflow'}
        icon={'fal fa-ballot-check'}
      />

      <SideItem
        url={uri + '/logout'}
        value={'Logout'}
        icon={'fas fa-sign-out'}
      />
    </SideBar>
  )
}

export default SideBarAdmin
