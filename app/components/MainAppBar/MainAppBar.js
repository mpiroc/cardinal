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
    <AppBar title={'Cardinal'}>
      <Navigation type='horizontal'>
        <Button label={'Home'} style={{color: 'white'}} />
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
}