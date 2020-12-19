import React from 'react'
import PropTypes from 'prop-types'
import MessageBox from '../../message-box/message-box'
import './input.scss'

function input({
  className = '',
  label,
  name,
  value,
  reference,
  noLabel,
  children,
  hasError,
  errorMessage,
  errorMessageIcon,
  ...rest
}) {
  return (
    <div className={`form-ctrl-input ${className}`}>
      <label
        className={`form-label ${noLabel && 'hidden'}`}
        htmlFor={`form-input-${name}-${className}`}
      >
        {label}
      </label>
      <div className='form-input-container'>
        <input
          id={`form-input-${name}-${className}`}
          className={`form-input ${hasError && 'hasError'}`}
          name={name}
          value={value}
          ref={reference}
          {...rest}
        />

        {errorMessage && hasError && (
          <MessageBox
            className={`form-ctrl-error-msg noSelect`}
            icon={errorMessageIcon}
            message={errorMessage}
          />
        )}

        {children}
      </div>
    </div>
  )
}

input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default input
