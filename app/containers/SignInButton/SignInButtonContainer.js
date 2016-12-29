import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { authAndSaveUser } from 'redux/modules/auth'
import { setAndHandleUserValueListener } from 'redux/modules/users'

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
    style: {color: 'white'},
    label: 'Sign In',
    onClick: async () => {
      await dispatchProps.authAndSaveUser()
      dispatchProps.setAndHandleUserValueListener(stateProps.authedUid)
      
      ownProps.router.replace('/decks')
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Button))