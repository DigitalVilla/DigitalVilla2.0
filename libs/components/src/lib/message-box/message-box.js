import React from 'react'
import { SVGButton, SVGIcon } from '../svg/svg'
import './message-box.scss'

function MessageBox({ className, message, icon, onClose, reference, ...rest }) {
  return (
    <div className={`${className} message-box`} {...rest}>
      {onClose && (
        <SVGButton
          icon={'close'}
          className='message-box-close'
          reference={reference}
        />
      )}
      {icon && <SVGIcon className='message-box-icon' icon={icon} />}
      <p>{message}</p>
    </div>
  )
}

export default MessageBox
