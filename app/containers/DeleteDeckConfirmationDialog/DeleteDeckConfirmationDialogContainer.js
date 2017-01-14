import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ConfirmationDialog from 'components/ConfirmationDialog/ConfirmationDialog'
import {
  closeDialogAndDeleteDeck,
  closeDeleteDeckConfirmationDialog,
} from 'redux/modules/deleteDeckConfirmationDialog'

function getMessage(name, cardCount) {
  if (cardCount === undefined) {
    return `Are you sure that you want to delete '${name}'? All cards in '${name}' will also be deleted.`
  }

  if (cardCount === 1) {
    return `Are you sure that you want to delete '${name}'? One card in '${name}' will also be deleted.`
  }

  return `Are you sure that you want to delete '${name}'? All ${cardCount} cards in '${name}' will also be deleted.`
}

function mapStateToProps ({ deleteDeckConfirmationDialog }, ownProps) {
  const name = deleteDeckConfirmationDialog.get('name')
  const cardCount = deleteDeckConfirmationDialog.get('cardCount')

  return {
    title: 'Delete deck',
    isActive: deleteDeckConfirmationDialog.get('isActive'),
    message: getMessage(name, cardCount),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    onConfirm: closeDialogAndDeleteDeck,
    onCancel: closeDeleteDeckConfirmationDialog,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationDialog)