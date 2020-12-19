import React, { useState } from 'react'
import './radio-group.scss'
import MessageBox from '../../message-box/message-box'
import PropTypes from 'prop-types'

function RadioGroup({
  name,
  title,
  selectedValue = '',
  onChange,
  radios,
  children,
  hasError,
  errorMessage,
  errorMessageIcon,
  className = name,
  ...rest
}) {
  return (
    <div className={`form-ctrl-radio-group ${className}`}>
      {title && <h3 className='form-label'>{title}</h3>}
      <div className='radio-container'>
        {radios.map(({ value, label, noLabel, reference, ...rest }, i) => (
          <div key={label + i} className={`form-ctrl-radio ${className}`}>
            <label className={`radio-label`}>
              <input
                id={`form-radio-${name}-${className}`}
                onChange={onChange}
                checked={selectedValue === value}
                className={`form-radio hidden`}
                ref={reference}
                value={value}
                type='radio'
                name={name}
                {...rest}
              />
              <span className='radio-check'></span>
              {label}
            </label>
          </div>
        ))}
      </div>

      {errorMessage && hasError && (
        <MessageBox
          className={`form-ctrl-error-msg noSelect`}
          icon={errorMessageIcon}
          message={errorMessage}
        />
      )}
      {children}
    </div>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
}

export default RadioGroup
