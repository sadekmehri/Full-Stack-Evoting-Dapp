import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const Spinner = ({ hidden }) => {
  return <div hidden={hidden} id='spinner'></div>
}

Spinner.propTypes = {
  hidden: PropTypes.bool.isRequired,
}

export default Spinner
