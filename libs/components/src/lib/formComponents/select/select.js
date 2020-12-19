import React from 'react'
import PropTypes from 'prop-types'
import { SVGIcon } from '../../svg/svg'
import MessageBox from '../../message-box/message-box'
import './select.scss'

function select({
  className = '',
  label,
  name,
  value,
  reference,
  noLabel,
  children,
  hasError,
  placeholder,
  errorMessage,
  errorMessageIcon,
  ...rest
}) {
  return (
    <div className={`form-ctrl-select ${className}`}>
      <label
        className={`form-label ${noLabel && 'hidden'}`}
        htmlFor={`form-select-${name}-${className}`}
      >
        {label}
      </label>
      <div className='form-select-container'>
        <SVGIcon className='select-chevron-down' icon='chevronDown' />
        <select
          id={`form-select-${name}-${className}`}
          className={`form-select ${placeholder && !value && 'placeholder'} ${
            hasError && 'hasError'
          }`}
          name={name}
          value={value}
          ref={reference}
          {...rest}
        >
          {placeholder && (
            <option value='' className='select-placeholder'>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {errorMessage && hasError && (
          <MessageBox
            className={`form-ctrl-error-msg noSelect`}
            icon={errorMessageIcon}
            message={errorMessage}
          />
        )}
      </div>
    </div>
  )
}

select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default select
