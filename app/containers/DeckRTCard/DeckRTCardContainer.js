import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DeckRTCard } from 'components'
import * as deckActionCreators from 'redux/modules/decks'
import * as editDeckDialogActionCreators from 'redux/modules/editDeckDialog'

class DeckRTCardContainer extends React.Component {
  constructor() {
    super()
    this.handleDeleteDeck = this.handleDeleteDeck.bind(this)
    this.handleOpenEditDialog = this.handleOpenEditDialog.bind(this)
  }
  handleDeleteDeck() {
    const { uid, deckId, deleteAndHandleDeck } = this.props
    deleteAndHandleDeck(uid, deckId)
  }
  handleOpenEditDialog() {
    const { openEditDeckDialog, deckId, name, description } = this.props
    this.props.openEditDeckDialog(deckId, name, description)
  }
  render () {
    const { deckId, isDeleting, name, description } = this.props

    return (
      <DeckRTCard
        deckId={deckId}
        isDeleting={isDeleting}
        name={name}
        description={description}
        onDelete={this.handleDeleteDeck}
        onOpenEditDialog={this.handleOpenEditDialog} />
    )
  }
}

DeckRTCardContainer.propTypes = {
  deckId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deleteAndHandleDeck: PropTypes.func.isRequired,
  openEditDeckDialog: PropTypes.func.isRequired,
}

function mapStateToProps ({ auth, decks }, props) {
  const deck = decks.getIn(['decks', props.deckId])
  return {
    uid: auth.get('authedUid'),
    isDeleting: deck.get('isDeleting'),
    name: deck.get('name'),
    description: deck.get('description')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({
    ...deckActionCreators,
    ...editDeckDialogActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckRTCardContainer)
