import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'

const Modal = ({ id, title, text }) => {
  return (
    <div
      className='modal fade'
      id={`exampleModal${id}`}
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header bg-light'>
            <h5 className='modal-title' id='exampleModalLabel'>
              {title}
            </h5>

            <Button
              type={'button'}
              className={'btn-close'}
              data-bs-dismiss={'modal'}
              aria-label={'Close'}
            />
          </div>
          <div className='modal-body'>{text}</div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Modal
