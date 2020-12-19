import React, { useState } from 'react'
import { Select } from '@digitalvilla/components'

export const SelectControl = ({
  name,
  label,
  className,
  onChangedValue,
  required = true,
  placeholder = '',
  processOnChange = null,
  errorMessage = `Select a ${label.split(':')[0]}`,
  children,
  ...rest
}) => {
  const [state, setState] = useState('idle')
  const [value, setValue] = useState('')

  const handleChange = ({ target }) => {
    setValue(processOnChange ? processOnChange(target) : target.value)
    setState('writing')
  }

  const handleBlur = ({ target }) => {
    setState('idle')
    if (!value.length && state !== 'idle') return setState('error')
    return onChangedValue(target.name, target.value)
  }

  return (
    <Select
      className={`select-control ${className}`}
      name={name}
      label={label}
      value={value}
      onBlur={handleBlur}
      hasError={state === 'error'}
      onChange={handleChange}
      errorMessage={errorMessage}
      errorMessageIcon='warning'
      placeholder={placeholder}
      required
      {...rest}
    >
      {children}
    </Select>
  )
}
