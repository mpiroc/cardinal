import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CardRTCard } from 'components'
import * as cardActionCreators from 'redux/modules/cards'
import * as editCardDialogActionCreators from 'redux/modules/editCardDialog'

function mapStateToProps ({ cards }, { cardId }) {
  const card = cards.getIn(['cards', cardId])

  if (card === undefined) {
    return {
      isLoading: true,
      isDeleting: false,
      side1: '',
      side2: '',
    }
  }

  return {
    isLoading: false,
    isDeleting: card.get('isDeleting'),
    side1: card.get('side1'),
    side2: card.get('side2'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    ...cardActionCreators,
    ...editCardDialogActionCreators,
  }, dispatch)
}

function mergeProps (
    { isLoading, isDeleting, side1, side2 },
    { openEditCardDialog, deleteAndHandleCard },
    { deckId, cardId }) {
  return {
    isLoading,
    isDeleting,
    side1,
    side2,
    cardId,
    onEdit: () => openEditCardDialog(
      deckId,
      cardId,
      side1,
      side2,
    ),
    onDelete: () => deleteAndHandleCard(
      deckId,
      cardId,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CardRTCard)