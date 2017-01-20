import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Cards from 'components/Cards/Cards'
import {
  setAndHandleUserDeckValueListener,
  setAndHandleDeckCardCollectionListeners,
  setAndHandleCardHistoryCollectionListeners,
} from 'redux/modules/listeners'

class CardsContainer extends React.Component {
  componentDidMount() {
    const {
      deckId,
      authedUid,
      setAndHandleUserDeckValueListener,
      setAndHandleDeckCardCollectionListeners,
      setAndHandleCardHistoryCollectionListeners,
    } = this.props
    setAndHandleUserDeckValueListener(authedUid, deckId)
    setAndHandleDeckCardCollectionListeners(deckId)
    setAndHandleCardHistoryCollectionListeners(deckId)
  }
  render () {
    const { deckId, cards } = this.props
    return <Cards deckId={deckId} cards={cards} />
  }
}

CardsContainer.propTypes = {
  authedUid: PropTypes.string.isRequired,
  setAndHandleUserDeckValueListener: PropTypes.func.isRequired,
  setAndHandleDeckCardCollectionListeners: PropTypes.func.isRequired,
  setAndHandleCardHistoryCollectionListeners: PropTypes.func.isRequired,
  params: PropTypes.shape({
    deckId: PropTypes.string.isRequired
  })
}

function mapStateToProps ({ auth, decks, cards }, { params }) {
  const deckId = params.deckId
  const deck = decks.getIn(['decks', deckId])

  return {
    deckId: deckId,
    authedUid: auth.get('authedUid'),
    // deck will briefly be undefined if we entered the app at this page, rather than from the decks list
    cards: deck ? deck.get('cards') : Map(),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    setAndHandleUserDeckValueListener,
    setAndHandleDeckCardCollectionListeners,
    setAndHandleCardHistoryCollectionListeners,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer)