import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WarningSnackbar from 'components/WarningSnackbar/WarningSnackbar'
import * as cardActionCreators from 'redux/modules/cards'

function mapStateToProps ({cards}, ownProps) {
  const snackbar = cards.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators(cardActionCreators, dispatch)
}

function mergeProps ({ isActive, error }, { dismissCardsSnackbar }, ownProps) {
  return {
    isActive,
    error,
    onDismissSnackbar: dismissCardsSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WarningSnackbar)