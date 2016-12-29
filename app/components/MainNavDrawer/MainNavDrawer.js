import React, { PropTypes } from 'react'
import {
  NavDrawer,
} from 'react-toolbox'
import {
  Menu,
  MenuItem,
} from 'react-toolbox/lib/menu'

export default function MainNavDrawer ({ isActive, onClose }) {
  return (
    <NavDrawer
        active={isActive}
        onOverlayClick={onClose}>
      <Menu outline={false}>
        <MenuItem caption={'Profile'} />
        <MenuItem caption={'Decks'} />
      </Menu>
    </NavDrawer>
  )
}

MainNavDrawer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}