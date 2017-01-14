import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DeckRTCard from 'components/DeckRTCard/DeckRTCard'
import * as deckActionCreators from 'redux/modules/decks'
import * as editDeckDialogActionCreators from 'redux/modules/editDeckDialog'

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
    ...deckActionCreators,
    ...editDeckDialogActionCreators
  }, dispatch)
}

function mergeProps (
    { uid, isDeleting, name, description, cardCount },
    { openEditDeckDialog, deleteAndHandleDeck },
    { deckId, router }) {
  return {
    deckId,
    isDeleting,
    name,
    cardCount,
    description: description ? description : '',
    onReview: () => router.replace(`review/${deckId}`),
    onView: () => router.replace(`deck/${deckId}`),
    onEdit: () => openEditDeckDialog(deckId, name, description),
    onDelete: () => deleteAndHandleDeck(uid, deckId),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeckRTCard))
