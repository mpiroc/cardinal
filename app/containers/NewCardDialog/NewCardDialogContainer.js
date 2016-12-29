import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditCardDialog } from 'components'
import * as newCardDialogActionCreators from 'redux/modules/newCardDialog'

function mapStateToProps ({newCardDialog}, ownProps) {
  return {
    isActive: newCardDialog.get('isActive'),
    isSaving: newCardDialog.get('isSaving'),
    title: 'Create New Card',
    side1: newCardDialog.get('side1'),
    side2: newCardDialog.get('side2'),
    isSnackbarActive: newCardDialog.getIn(['snackbar', 'isActive']),
    snackbarError: newCardDialog.getIn(['snackbar', 'error'])
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const boundActionCreators = bindActionCreators(newCardDialogActionCreators, dispatch)

  return {
    onSide1Change: side1 => boundActionCreators.updateNewCardSide1(side1),
    onSide2Change: side2 => boundActionCreators.updateNewCardSide2(side2),
    onSave: boundActionCreators.saveAndHandleNewCard,
    onCancel: boundActionCreators.closeNewCardDialog,
    onDismissSnackbar: boundActionCreators.dismissNewCardSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCardDialog)