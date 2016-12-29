import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { signOutAndUnauth } from 'redux/modules/auth'

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, { router }) {
  return {
    onSignOut: async () => {
      await dispatch(signOutAndUnauth())
      router.replace('/')
    }
  }
}

function mergeProps (stateProps, { onSignOut }, ownProps) {
  return {
    style: {color: 'white'},
    label: 'Sign Out',
    onClick: onSignOut,
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Button))