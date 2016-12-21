import React, { PropTypes } from 'react'
import { SignInLinkContainer } from 'containers'
import './styles.css'

export default function NavigationBar (props) {
  return (
    <div>
      <nav>
        <ul>
          <li>Profile</li>
          <li><SignInLinkContainer /></li>
          <li>Home</li>
        </ul>
      </nav>
    </div>
  )
}

NavigationBar.propTypes = {
  
}