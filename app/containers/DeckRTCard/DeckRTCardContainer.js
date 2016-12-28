import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DeckRTCard } from 'components'
import * as deckActionCreators from 'redux/modules/decks'
import * as editDeckDialogActionCreators from 'redux/modules/editDeckDialog'

class DeckRTCardContainer extends React.Component {
  constructor() {
    super()
    this.handleViewDeck = this.handleViewDeck.bind(this)
    this.handleEditDeck = this.handleEditDeck.bind(this)
    this.handleDeleteDeck = this.handleDeleteDeck.bind(this)
  }
  handleViewDeck() {
    const { deckId } = this.props
    this.context.router.replace(`deck/${deckId}`)
  }
  handleEditDeck() {
    const { openEditDeckDialog, deckId, name, description } = this.props
    this.props.openEditDeckDialog(deckId, name, description)
  }
  handleDeleteDeck() {
    const { uid, deckId, deleteAndHandleDeck } = this.props
    deleteAndHandleDeck(uid, deckId)
  }
  render () {
    const { deckId, isDeleting, name, description } = this.props

    return (
      <DeckRTCard
        deckId={deckId}
        isDeleting={isDeleting}
        name={name}
        description={description}
        onView={this.handleViewDeck}
        onDelete={this.handleDeleteDeck}
        onEdit={this.handleEditDeck} />
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

DeckRTCardContainer.contextTypes = {
  router: PropTypes.object.isRequired,
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
