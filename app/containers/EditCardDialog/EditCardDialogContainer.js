import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditCardDialog } from 'components'
import * as editCardDialogActionCreators from 'redux/modules/editCardDialog'

function mapStateToProps({editCardDialog}, ownProps) {
  return {
    isActive: editCardDialog.get('isActive'),
    isSaving: editCardDialog.get('isSaving'),
    title: 'Edit Card',
    side1: editCardDialog.get('side1'),
    side2: editCardDialog.get('side2'),
    isSnackbarActive: editCardDialog.getIn(['snackbar', 'isActive']),
    snackbarError: editCardDialog.getIn(['snackbar', 'error'])
  }
}

function mapDispatchtoProps(dispatch, ownProps) {
  const boundActionCreators = bindActionCreators(editCardDialogActionCreators, dispatch)

  return {
    onSide1Change: boundActionCreators.updateEditCardSide1,
    onSide2Change: boundActionCreators.updateEditCardSide2,
    onSave: boundActionCreators.saveAndHandleEditCard,
    onCancel: boundActionCreators.closeEditCardDialog,
    onDismissSnackbar: boundActionCreators.dismissEditCardSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(EditCardDialog)