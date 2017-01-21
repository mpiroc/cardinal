import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { authAndSaveUser } from 'redux/modules/auth'

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    authAndSaveUser,
  }, dispatch)
}

function mergeProps (
    stateProps,
    { authAndSaveUser },
    ownProps
  ) {
  return {
    style: { color: 'white' },
    label: 'Sign In',
    onClick: () => authAndSaveUser(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Button)