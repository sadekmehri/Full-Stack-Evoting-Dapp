import React, { useContext } from 'react'
import { ToggleContext } from '../../context/ToggleContext'

const Toggle = () => {
  const { handleToggle } = useContext(ToggleContext)

  return (
    <nav className='navbar navbar-expand navbar-light navbar-bg'>
      <i
        className='sidebar-toggle js-sidebar-toggle'
        onClick={() => handleToggle()}
      >
        <i className='hamburger align-self-center' />
      </i>
    </nav>
  )
}

export default Toggle
