import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { WarningSnackbar } from 'components'
import * as deckActionCreators from 'redux/modules/decks'

function mapStateToProps ({decks}, props) {
  const snackbar = decks.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

function mergeProps (stateProps, dispatchProps, props) {
  return {
    ...stateProps,
    onDismissSnackbar: dispatchProps.dismissDecksSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WarningSnackbar)