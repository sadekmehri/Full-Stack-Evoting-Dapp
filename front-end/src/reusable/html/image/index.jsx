import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ src, alt, ...rest }) => {
  return <img src={src} alt={alt} {...rest} />
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  rest: PropTypes.object,
}

export default Image
