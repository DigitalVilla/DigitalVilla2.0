import React from 'react'
import { svgList } from './svgList'

export const SVGButton = ({
  reference = null,
  type = 'button',
  className = '',
  value = '',
  icon,
  ...rest
}) => {
  return (
    <button
      className={`svg-btn ${className}`}
      ref={reference}
      type={type}
      {...rest}
    >
      <SVGIcon icon={icon} />
      {value}
    </button>
  )
}

export const SVGIcon = ({ icon = 'info', className = '', ...rest }) => {
  return !svgList[icon] ? (
    <h1>Not Found</h1>
  ) : (
    <svg
      className={`svg-icon ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={svgList[icon].viewBox}
      fill='none'
      role='img'
      {...rest}
    >
      {svgList[icon].path.map((p, i) => {
        return <path key={p + i} d={p}></path>
      })}
    </svg>
  )
}
