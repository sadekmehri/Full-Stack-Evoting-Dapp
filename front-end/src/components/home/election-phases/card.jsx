import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
  const { span, h3, p } = props
  return (
    <div className='carding bkg2-bg'>
      <span className='h3 accent3 bkg2-bg'>{span}</span>
      <h3>{h3}</h3>
      <p>{p}</p>
    </div>
  )
}

Card.propTypes = {
  span: PropTypes.string.isRequired,
  h3: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
}

export default Card
