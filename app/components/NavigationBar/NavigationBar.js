import React, { PropTypes } from 'react'
import { SignInLinkContainer } from 'containers'
import { navBar, navBarContainer } from './styles.css'

export default function NavigationBar (props) {
  return (
    <div className={navBarContainer}>
      <nav className={navBar}>
        <ul>
          <li>Home</li>
          <li>New Deck</li>
          <li><SignInLinkContainer /></li>
        </ul>
      </nav>
    </div>
  )
}

NavigationBar.propTypes = {
  
}