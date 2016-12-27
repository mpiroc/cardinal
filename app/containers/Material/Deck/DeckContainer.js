import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Deck } from 'components/Material'
import * as deckActionCreators from 'redux/modules/decks'

class DeckContainer extends React.Component {
  componentDidMount() {
    const { authedUid, setDeckValueListener, setDeckCardCollectionListeners, params } = this.props
    setDeckValueListener(authedUid, params.deckId)
    setDeckCardCollectionListeners(params.deckId)
  }
  render () {
    const { name, cards } = this.props
    return <Deck name={name} cards={cards} />
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
  const deck = decks.getIn(['decks', props.params.deckId])
  return {
    authedUid: auth.get('authedUid'),
    name: deck.get('name'),
    cards: deck.get('cards').map(cardId => cards.getIn(['cards', cardId]))
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckContainer)