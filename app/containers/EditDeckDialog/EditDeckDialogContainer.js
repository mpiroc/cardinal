import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditDeckDialog } from 'components'
import * as editDeckDialogActionCreators from 'redux/modules/editDeckDialog'

function mapStateToProps ({editDeckDialog}, ownProps) {
  return {
    isActive: editDeckDialog.get('isActive'),
    isSaving: editDeckDialog.get('isSaving'),
    title: 'Edit Deck',
    name: editDeckDialog.get('name'),
    description: editDeckDialog.get('description'),
    isSnackbarActive: editDeckDialog.getIn(['snackbar', 'isActive']),
    snackbarError: editDeckDialog.getIn(['snackbar', 'error'])
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const boundActionCreators = bindActionCreators(editDeckDialogActionCreators, dispatch)

  return {
    onNameChange: boundActionCreators.updateEditDeckName,
    onDescriptionChange: boundActionCreators.updateEditDeckDescription,
    onSave: boundActionCreators.saveAndHandleEditDeck,
    onCancel: boundActionCreators.closeEditDeckDialog,
    onDismissSnackbar: boundActionCreators.dismissEditDeckSnackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDeckDialog)