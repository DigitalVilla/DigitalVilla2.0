import React, { useState, useRef } from 'react'
import { validateFields } from '@digitalvilla/utils'
import { Input } from '@digitalvilla/components'

export const InputControl = ({
  name,
  label,
  className,
  onChangedValue,
  required = true,
  processOnClick = null,
  processOnChange = null,
  maxLength = 20,
  errorMessage = `Enter a valid ${label.split(':')[0]}`,
  regex,
  ...rest
}) => {
  const [state, setState] = useState('idle')
  const [value, setValue] = useState('')

  const store = useRef({
    errorMessage,
  })

  const handleChange = ({ target }) => {
    setValue(processOnChange ? processOnChange(target) : target.value)
    setState('writing')
  }

  const handleClick = (e) => {
    if (processOnClick) processOnClick(e)
    setState('writing')
  }

  const handleBlur = ({ target }) => {
    let value = target.value
    if (value.length) {
      const { isValid, message } = validateFields(target, regex)
      if (!isValid) {
        if (message.length) store.current.errorMessage = message
        value = ''
        setState('error')
      }
    } else if (value.length > 0) {
      store.current.errorMessage = errorMessage
      value = ''
      setState('error')
    }

    return target.value.length > 0 ? onChangedValue(target.name, value) : null
  }

  return (
    <Input
      className={`input-control ${className}`}
      label={label}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      name={name || ''}
      errorMessage={store.current.errorMessage}
      hasError={state === 'error'}
      errorMessageIcon='warning'
      placeholder='Type Here'
      maxLength={maxLength}
      onClick={handleClick}
      required={required}
      {...rest}
    />
  )
}
