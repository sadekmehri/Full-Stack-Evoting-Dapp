import React from 'react'
import PropTypes from 'prop-types'

const Path = ({ className, children, ...rest }) => {
  return (
    <path className={className} {...rest}>
      {children}
    </path>
  )
}

Path.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  rest: PropTypes.object,
}

export default Path
