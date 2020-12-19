import React from 'react'
import { Main } from '../../layouts'
import { navigate } from '@reach/router'
import logo from '../../assets/dv_logo.png'
import './NotFound.scss'

export function NotFound() {
  const goBack = () => {
    navigate('/', { replace: true })
  }

  return (
    <Main className='not-found blank-layout'>
      <img src={logo} alt='Quantifi' className='blank-logo noSelect' />

      <div className='blank-card card'>
        <h1>404</h1>
        <h2>Landed in the middle of nowhere?</h2>
        <button className='btn primary radius' onClick={goBack}>
          Go Back!
        </button>
      </div>
    </Main>
  )
}

export default NotFound
