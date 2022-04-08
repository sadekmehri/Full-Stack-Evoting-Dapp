import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ type, value, children, ...rest }) => {
  return (
    <button type={type} {...rest}>
      {children} {value}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  rest: PropTypes.object,
}

Button.defaultProps = {
  type: 'button',
  value: '',
}

export default Button
