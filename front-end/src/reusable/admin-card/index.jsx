import React from 'react'
import PropTypes from 'prop-types'
import Image from '../html/image'
import { Link } from 'react-router-dom'

const Card = ({ src, alt, paragraph, header, onClick }) => {
  return (
    <div className='col-xs-12 col-sm-6 col-lg-4'>
      <Link to='#' onClick={onClick}>
        <div className='card-flyer'>
          <div className='text-box'>
            <div className='image-box'>
              <Image src={src} alt={alt} />
            </div>
            <div className='text-container'>
              <h6>{header}</h6>
              <p>{paragraph}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Card
