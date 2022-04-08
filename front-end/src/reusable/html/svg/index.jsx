import React from 'react'

const Svg = ({ width, height, className, children, ...rest }) => {
  return (
    <svg width={width} height={height} className={className} {...rest}>
      {children}
    </svg>
  )
}

export default Svg
