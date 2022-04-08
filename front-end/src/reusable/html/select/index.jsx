import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ label, id, error, name, options, onChange }) => {
  return (
    <div className='mb-3'>
      {label && (
        <label htmlFor={id} className='form-label'>
          {label}
        </label>
      )}

      <select
        className={error ? 'form-control is-invalid' : 'form-control'}
        defaultValue={''}
        name={name}
        id={id}
        onChange={onChange}
        autoFocus
        required
      >
        <option value={''} disabled>
          Choose an option
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && (
        <div className='invalid-feedback'>
          <span className='form-text text-danger'>{error}</span>
        </div>
      )}
    </div>
  )
}

Select.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default Select
