import React from 'react'
import classnames from 'classnames'
import logo from '../assets/logo_DV.png'

const Menu = (props) => {

    const moveTo = (e) => {
        let index = e.target.dataset.page
        props.api.silentMoveTo(index);
    }

    const handleClick = (e) => {
        props.setIsOpen()
    }

  return (
    <div id="menu" className='menu'>
      <img src={logo} alt="logo" onClick={handleClick} className={classnames("toggle-button", { "active": props.isOpen })} />

      <nav className={classnames("menu__nav", { "active": props.isOpen  })}>
        <ul className='menu__list'>
            {
                props.anchors.map((name, i) =>
                    <li key={i}  className="menu__item">
                        <button data-page={i + 1} onClick={ moveTo }>{ name }</button>
                    </li>
                )
            }
        </ul>
      </nav>
      <span className={classnames("menu__bg menu-abs ", { "active": props.isOpen })}> &nbsp;</span>
    </div>
  )
}

export default Menu