import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MainAppBar from 'components/MainAppBar/MainAppBar'

function mapStateToProps ({ auth }, ownProps) {
  return {
    isAuthed: auth.get('isAuthed'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    push,
  }, dispatch)
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    isAuthed: stateProps.isAuthed,
    onNavigateToHome: () => dispatchProps.push('/'),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MainAppBar)



