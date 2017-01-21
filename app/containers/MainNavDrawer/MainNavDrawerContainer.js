import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MainNavDrawer from 'components/MainNavDrawer/MainNavDrawer'

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    push
  }, dispatch)
}

function mergeProps(stateProps, { push }, ownProps) {
  return {
    onNavHome: () => push('/'),
    onNavDecks: () => push('/decks'),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MainNavDrawer)