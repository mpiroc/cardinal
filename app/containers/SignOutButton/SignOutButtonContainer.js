import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { signOutAndUnauth } from 'redux/modules/auth'

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    signOutAndUnauth,
  }, dispatch)
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    style: {color: 'white'},
    label: 'Sign Out',
    onClick: dispatchProps.signOutAndUnauth,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Button)