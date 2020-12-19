import React from 'react'
import logo from '../../assets/dv_logo.png'
import { Link } from '@reach/router'
import './Navbar.scss'

export function Navbar(props) {
  return (
    <nav className='main-navbar'>
      <div className='container'>
        <a href='https://digitalvilla.ca'>
          <figure className='main-logo'>
            <img src={logo} alt='Quantifi Logo' />
          </figure>
        </a>
        <ul className='links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
