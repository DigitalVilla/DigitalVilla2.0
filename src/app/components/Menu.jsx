import React from 'react'
import CN from 'classnames'
import logo from '../assets/logo_DV.png'
import Icon from './Icons'

const Menu = (props) => {

//   const moveTo = (e) => {
//     let index = e.target.dataset.page
//     props.api.silentMoveTo(index);
//   }

  const handleClick = (e) => {
    props.toggleMenu()
  }


  let icons = ['npm', 'github', 'linkedin', 'codepen', 'linkedin'];
  return (
    <div id="menu" className='menu'>
      <div className="menu-button">
        <img src={logo} alt="logo" onClick={handleClick}/>
      </div>

      <nav className={CN("menu-nav", { "active": props.isOpen })}>
        <ul>
          {
            icons.map((el, i, arr) =>
              <li key={i} className={CN("hide-" + (arr.length - ((i))) + " show-" + (i + 1), { "active": props.isOpen })}>
                {/* <button className="menu-link" data-page={i + 1} onClick={ moveTo }>{ name }</button> */}
                <Icon icon={el} />
              </li>
            )
          }
        </ul>
      </nav>
    </div>
  )
}

export default Menu