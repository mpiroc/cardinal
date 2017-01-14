import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
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
  }, dispatch)
}

function mergeProps (
    { uid, isDeleting, name, description, cardCount },
    { openDeleteDeckConfirmationDialog, openEditDeckDialog },
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
    onDelete: () => openDeleteDeckConfirmationDialog(deckId, name, cardCount),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeckRTCard))
