import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { WarningSnackbar } from 'components'
import * as deckActionCreators from 'redux/modules/decks'

function mapStateToProps ({decks}, ownProps) {
  const snackbar = decks.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators(deckActionCreators, dispatch)
}

function mergeProps ({ isActive, error }, { dismissDecksSnackbar }, ownProps) {
  return {
    isActive,
    error,
    onDismissSnackbar: dismissDecksSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WarningSnackbar)