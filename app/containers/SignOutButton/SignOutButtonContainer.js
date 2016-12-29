import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { signOutAndUnauth } from 'redux/modules/auth'

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onSignOut: async () => {
      await dispatch(signOutAndUnauth())
      ownProps.router.replace('/')
    }
  }
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    style: {color: 'white'},
    label: 'Sign Out',
    onClick: dispatchProps.onSignOut,
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Button))