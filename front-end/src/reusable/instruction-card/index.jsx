import React from 'react'
import Image from '../html/image'
import PropTypes from 'prop-types'
import Modal from '../html/modal/index'
import Button from '../html/button/index'

const InstructionCard = ({ id, src, alt, title, text, rest }) => {
  return (
    <>
      <div className='col-sm-4 col-md-6 col-lg-4'>
        <div className='card'>
          <Image
            src={src}
            className='card-img-top img-thumbnail'
            alt={alt}
            {...rest}
          />
          <Button
            type={'button'}
            className={'btn btn-default'}
            data-bs-toggle={'modal'}
            data-bs-target={`#exampleModal${id}`}
            style={{ position: 'absolute', top: '0px', right: '0px' }}
          >
            <i className='fas fa-eye'></i>
          </Button>
        </div>
      </div>
      <Modal text={text} title={title} id={id} />
    </>
  )
}

InstructionCard.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rest: PropTypes.object,
}

export default InstructionCard
