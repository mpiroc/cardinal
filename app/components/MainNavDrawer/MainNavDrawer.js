import React, { PropTypes } from 'react'
import {
  NavDrawer,
  Navigation,
  Button,
} from 'react-toolbox'

export default function MainNavDrawer ({ isActive, onClose }) {
  return (
    <NavDrawer active={isActive}>
      <Navigation type='vertical'>
        <Button label={'Close'} onClick={onClose} />
        <Button label={'Decks'} />
      </Navigation>
    </NavDrawer>
  )
}

MainNavDrawer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}