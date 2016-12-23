import React, { PropTypes } from 'react'
import {
  NewCardLinkContainer,
  NewDeckLinkContainer,
  SignInLinkContainer
} from 'containers'
import { navBar, navBarContainer } from './styles.css'

export default function NavigationBar (props) {
  return (
    <div className={navBarContainer}>
      <nav className={navBar}>
        <ul>
          <li>
            <NewCardLinkContainer />
          </li>
          <li>
            <NewDeckLinkContainer />
          </li>
          {
            props.isAuthed ? null :
            <li>
              <SignInLinkContainer />
            </li>
          }
        </ul>
      </nav>
    </div>
  )
}

NavigationBar.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}