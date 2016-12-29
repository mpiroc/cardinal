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

export default function MainAppBar ({ isAuthed, onNavigateToHome }) {
  return (
    <AppBar title={'Cardinal'}>
      <Navigation type='horizontal'>
        <Button style={{color: 'white'}} label={'Home'} onClick={onNavigateToHome} />
        {
          isAuthed ?
            <SignOutButtonContainer /> :
            <SignInButtonContainer />
        }
      </Navigation>
    </AppBar>
  )
}

MainAppBar.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  onNavigateToHome: PropTypes.func.isRequired,
}