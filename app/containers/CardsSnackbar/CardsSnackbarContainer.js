import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { WarningSnackbar } from 'components'
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

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    onDismissSnackbar: dispatchProps.dismissCardsSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WarningSnackbar)