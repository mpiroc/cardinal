import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { WarningSnackbar } from 'components'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

function mapStateToProps ({newDeckDialog}, ownProps) {
  const snackbar = newDeckDialog.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators(newDeckDialogActionCreators, dispatch)
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    onDismissSnackbar: dispatchProps.dismissNewDeckSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WarningSnackbar)