import React, { PropTypes } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DeckRTCard from 'components/DeckRTCard/DeckRTCard'
import { openDeleteDeckConfirmationDialog } from 'redux/modules/deleteDeckConfirmationDialog'
import { openEditDeckDialog } from 'redux/modules/editDeckDialog'

function mapStateToProps ({ auth, decks }, { deckId }) {
  const deck = decks.getIn(['decks', deckId])
  return {
    uid: auth.get('authedUid'),
    isDeleting: deck.get('isDeleting'),
    name: deck.get('name'),
    description: deck.get('description'),
    cardCount: deck.get('cards').size,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    openDeleteDeckConfirmationDialog,
    openEditDeckDialog,
    push,
  }, dispatch)
}

function mergeProps (
    { uid, isDeleting, name, description, cardCount },
    dispatchProps,
    { deckId }) {
  return {
    deckId,
    isDeleting,
    name,
    cardCount,
    description: description ? description : '',
    onReview: () => dispatchProps.push(`review/${deckId}`),
    onView: () => dispatchProps.push(`deck/${deckId}`),
    onEdit: () => dispatchProps.openEditDeckDialog(deckId, name, description),
    onDelete: () => dispatchProps.openDeleteDeckConfirmationDialog(deckId, name, cardCount),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeckRTCard)
