import React, { PropTypes } from 'react'
import { SignInLinkContainer } from 'containers'
import { navBar, navBarContainer, navBarLink } from './styles.css'

export default function NavigationBar (props) {
  return (
    <div className={navBarContainer}>
      <nav className={navBar}>
        <ul>
          <li className={navBarLink}>Home</li>
          <li className={navBarLink}>New Deck</li>
          <li className={navBarLink}><SignInLinkContainer /></li>
        </ul>
      </nav>
    </div>
  )
}

NavigationBar.propTypes = {
  
}