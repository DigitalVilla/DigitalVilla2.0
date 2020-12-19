import React from 'react'
import './loader.scss'

export const Loader = ({ gradient, isLoading = true, ...rest }) => {
  return (
    <div
      className={`loader-page ${isLoading && ' active'} ${
        gradient && 'gradient'
      }`}
      aria-hidden={!isLoading}
      {...rest}
    >
      <div className='loader-container'>
        <div className='loader'>Loading...</div>
      </div>
    </div>
  )
}
