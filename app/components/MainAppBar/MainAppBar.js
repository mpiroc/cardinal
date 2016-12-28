import React, { PropTypes } from 'react'
import {
  AppBar,
  Navigation,
  Button,
} from 'react-toolbox'
import {
  SignInButtonContainer,
  SignOutButtonContainer,
} from 'containers'

export default function MainAppBar (props) {
  return (
    <AppBar leftIcon='menu' title={'Cardinal'} onLeftIconClick={props.onToggleNavDrawer}>
      <Navigation type='horizontal'>
        <Button label={'Profile'} style={{color: 'white'}} />
        {
          props.isAuthed ?
            <SignOutButtonContainer /> :
            <SignInButtonContainer />
        }
      </Navigation>
    </AppBar>
  )
}

MainAppBar.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  onToggleNavDrawer: PropTypes.func.isRequired,
}