import React, { PropTypes } from 'react'
import { SignInLinkContainer } from 'containers'
import { navBar, navBarLink } from './styles.css'

export default function NavigationBar (props) {
  return (
    <div>
      <nav className={navBar}>
        <ul>
          <li className={navBarLink}>Profile</li>
          <li className={navBarLink}><SignInLinkContainer /></li>
          <li className={navBarLink}>Home</li>
        </ul>
      </nav>
    </div>
  )
}

NavigationBar.propTypes = {
  
}