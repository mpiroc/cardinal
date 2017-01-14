import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog'
import {
  closeDialogAndDeleteCard,
  closeDeleteCardConfirmationDialog,
} from 'redux/modules/deleteCardConfirmationDialog'

function mapStateToProps ({ deleteCardConfirmationDialog }, ownProps) {
  return {
    title: 'Delete card',
    isActive: deleteCardConfirmationDialog.get('isActive'),
    message: 'Are you sure that you want to delete this card?',
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    onConfirm: closeDialogAndDeleteCard,
    onCancel: closeDeleteCardConfirmationDialog,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationDialog)