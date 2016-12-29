import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { authAndSaveUser } from 'redux/modules/auth'
import { setAndHandleUserValueListener } from 'redux/modules/users'

class SignInButtonContainer extends React.Component {
  render () {
    return (
      <Button style={{color: 'white'}} label={'Sign In'} onClick={this.props.onSignIn} />
    )
  }
}

SignInButtonContainer.propTypes = {
  onSignIn: PropTypes.func.isRequired,
}


function mapStateToProps ({auth, users}, ownProps) {
  return {
    authedUid: auth.get('authedUid')
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    authAndSaveUser,
    setAndHandleUserValueListener,
  }, dispatch)
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    onSignIn: async () => {
      await dispatchProps.authAndSaveUser()
      dispatchProps.setAndHandleUserValueListener(stateProps.authedUid)
      
      ownProps.router.replace('/decks')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SignInButtonContainer)