import React from 'react'
import logo from './../images/logo_DV.png'
import Icon from './Icons'

const Menu = (props) => {

  const handleClick = (e) => {
    props.toggleMenu()
  }


  let icons = ['npm', 'github', 'linkedin', 'codepen', 'linkedin'];
  return (
    <div id="menu" className='menu'>
      <button className="menu-button" onClick={handleClick}>
        <img src={logo} alt="logo"/>
      </button>

      <nav className={props.isOpen ? "menu-nav active" : "menu-nav"}>
        <ul>
          {
            icons.map((el, i, arr) => {
              let defaultClass = `hide-${arr.length - i} show-${i + 1}`;
              return (<li key={i} className={props.isOpen ? defaultClass + ' active' :defaultClass}>
                <Icon icon={el} />
            </li> )
            }
            )
          }
        </ul>
      </nav>
    </div>
  )
}

export default Menu