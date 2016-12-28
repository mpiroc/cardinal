import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Deck } from 'components'
import * as deckActionCreators from 'redux/modules/decks'

class DeckContainer extends React.Component {
  componentDidMount() {
    const {
      deckId,
      authedUid,
      setDeckValueListener,
      setDeckCardCollectionListeners,
    } = this.props
    setDeckValueListener(authedUid, deckId)
    setDeckCardCollectionListeners(deckId)
  }
  render () {
    const { deckId, name, cards } = this.props
    return <Deck deckId={deckId} name={name} cards={cards} />
  }
}

DeckContainer.propTypes = {
  authedUid: PropTypes.string.isRequired,
  setDeckValueListener: PropTypes.func.isRequired,
  setDeckCardCollectionListeners: PropTypes.func.isRequired,
  params: PropTypes.shape({
    deckId: PropTypes.string.isRequired
  })
}

function mapStateToProps ({ auth, decks, cards }, props) {
  const deckId = props.params.deckId
  const deck = decks.getIn(['decks', deckId])

  const temp1 = deck.get('cards').toObject()
  const temp2 = deck.get('cards').keySeq().toObject()
  const temp3 = deck.get('cards').keySeq().map(cardId => cards.getIn(['cards', cardId])).toObject()
  const temp4 = deck.get('cards').keySeq().map(cardId => cards.getIn(['cards', cardId])).filter(card => card !== undefined).toObject()

  return {
    deckId: deckId,
    authedUid: auth.get('authedUid'),
    name: deck.get('name'),
    cards: deck
      .get('cards')
      .keySeq()
      .map(cardId => { return {
        cardId,
        card: cards.getIn(['cards', cardId])
      }})
      .filter(card => card.card !== undefined)
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckContainer)