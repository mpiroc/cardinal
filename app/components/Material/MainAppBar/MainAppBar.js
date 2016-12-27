import React, { PropTypes } from 'react'
import {
  AppBar,
  Navigation,
  Button,
} from 'react-toolbox'

export default function MainAppBar (props) {
  return (
    <AppBar leftIcon='menu' title={'Cardinal'} onLeftIconClick={props.onToggleNavDrawer}>
      <Navigation type='horizontal'>
        <Button label={'Profile'} />
        <Button label={'Sign Out'} />
      </Navigation>
    </AppBar>
  )
}

MainAppBar.propTypes = {
  onToggleNavDrawer: PropTypes.func.isRequired,
}