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
  }
  handleViewDeck() {
    const { deckId } = this.props
    this.context.router.replace(`deck/${deckId}`)
  }
  render () {
    const {
      deckId,
      isDeleting,
      name,
      description,
      onEdit,
      onDelete,
    } = this.props

    return (
      <DeckRTCard
        deckId={deckId}
        isDeleting={isDeleting}
        name={name}
        description={description}
        onView={this.handleViewDeck}
        onEdit={onDelete}
        onDelete={onEdit}
      />
    )
  }
}

DeckRTCardContainer.propTypes = {
  deckId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

DeckRTCardContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps ({ auth, decks }, ownProps) {
  const deck = decks.getIn(['decks', ownProps.deckId])
  return {
    uid: auth.get('authedUid'),
    isDeleting: deck.get('isDeleting'),
    name: deck.get('name'),
    description: deck.get('description')
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
    onEdit: () => dispatchProps.openEditDeckDialog(ownProps.deckId, stateProps.name, stateProps.description),
    onDelete: () => dispatchProps.deleteAndHandleDeck(stateProps.uid, ownProps.deckId),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DeckRTCardContainer)
