import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <div className='mb-3'>
      {label && (
        <label htmlFor={id} className='form-label'>
          {label}
        </label>
      )}
      <input
        type={type}
        className={error ? 'form-control is-invalid' : 'form-control'}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={'off'}
        value={value}
        onChange={onChange}
        autoFocus
        required
      />
      {error && (
        <div className='invalid-feedback'>
          <span className='form-text text-danger'>{error}</span>
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default Input
