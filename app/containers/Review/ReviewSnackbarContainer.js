import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import WarningSnackbar from 'components/WarningSnackbar/WarningSnackbar'
import { dismissReviewSnackbar } from 'redux/modules/review'

function mapStateToProps ({ review }, ownProps) {
  const snackbar = review.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    dismissReviewSnackbar
  }, dispatch)
}

function mergeProps ({ isActive, error }, { dismissReviewSnackbar }, ownProps) {
  return {
    isActive,
    error,
    onDismissSnackbar: dismissReviewSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WarningSnackbar)