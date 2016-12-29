import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Cards } from 'components'
import * as deckActionCreators from 'redux/modules/decks'

class CardsContainer extends React.Component {
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
    const { deckId, cards } = this.props
    return <Cards deckId={deckId} cards={cards} />
  }
}

CardsContainer.propTypes = {
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

  return {
    deckId: deckId,
    authedUid: auth.get('authedUid'),
    cards: deck.get('cards'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer)