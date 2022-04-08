import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ToggleContext } from '../../context/ToggleContext'

const SideBar = ({ children, uri }) => {
  const { getSidebarCss } = useContext(ToggleContext)

  return (
    <nav id='sidebar' className={getSidebarCss()}>
      <div className='sidebar-content js-simplebar'>
        <Link to={uri} className={'sidebar-brand'}>
          <span className='align-middle'>Election</span>
        </Link>

        <ul className='sidebar-nav'>
          <li className='sidebar-header'>Pages</li>
          {children}
        </ul>
      </div>
    </nav>
  )
}

SideBar.propTypes = {
  uri: PropTypes.string.isRequired,
}

export default SideBar
