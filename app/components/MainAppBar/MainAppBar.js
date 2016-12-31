import React, { PropTypes } from 'react'
import {
  AppBar,
  Navigation,
  Button,
} from 'react-toolbox'
import SignInButtonContainer from 'containers/SignInButton/SignInButtonContainer'
import SignOutButtonContainer from 'containers/SignOutButton/SignOutButtonContainer'

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