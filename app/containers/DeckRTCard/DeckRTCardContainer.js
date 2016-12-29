import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DeckRTCard } from 'components'
import * as deckActionCreators from 'redux/modules/decks'
import * as editDeckDialogActionCreators from 'redux/modules/editDeckDialog'

function mapStateToProps ({ auth, decks }, { deckId, router }) {
  const deck = decks.getIn(['decks', deckId])
  return {
    uid: auth.get('authedUid'),
    isDeleting: deck.get('isDeleting'),
    name: deck.get('name'),
    description: deck.get('description'),
    onView: () => router.replace(`deck/${deckId}`),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    ...deckActionCreators,
    ...editDeckDialogActionCreators
  }, dispatch)
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...ownProps,
    onEdit: () => dispatchProps.openEditDeckDialog(
      ownProps.deckId,
      stateProps.name,
      stateProps.description,
    ),
    onDelete: () => dispatchProps.deleteAndHandleDeck(
      stateProps.uid,
      ownProps.deckId,
    ),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeckRTCard))
