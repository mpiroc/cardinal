import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { authAndSaveUser } from 'redux/modules/auth'
import { setAndHandleUserValueListener } from 'redux/modules/users'

function mapStateToProps ({ auth }, ownProps) {
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

function mergeProps (
    { authedUid },
    dispatchProps,
    ownProps
  ) {
  return {
    style: {color: 'white'},
    label: 'Sign In',
    onClick: dispatchProps.authAndSaveUser,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Button)