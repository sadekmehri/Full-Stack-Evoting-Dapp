import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SideItem = ({ value, url, icon }) => {
  return (
    <li className='sidebar-item'>
      <Link className='sidebar-link' to={url}>
        <i className={icon + ' align-middle'}></i>
        <span className='align-middle'>{value}</span>
      </Link>
    </li>
  )
}

SideItem.propTypes = {
  url: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default SideItem
