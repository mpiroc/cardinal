import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAndHandleDeckHistory,
  setDeckValueListener,
  setDeckCardCollectionListeners,
} from 'redux/modules/decks'
import {
  showNextCard,
  setCurrentCard,
  toggleAnswerVisible,
} from 'redux/modules/review'
import Review from 'components/Review/Review'
import moment from 'moment'

class ReviewContainer extends React.Component {
  async componentDidMount() {
    const {
      authedUid,
      deckId,
      fetchAndHandleDeckHistory,
      showNextCard,
      setCurrentCard,
      setDeckValueListener,
      setDeckCardCollectionListeners,
    } = this.props

    setCurrentCard('')
    setDeckValueListener(authedUid, deckId)
    setDeckCardCollectionListeners(deckId)

    await fetchAndHandleDeckHistory(authedUid, deckId)

    await showNextCard(moment().valueOf(), deckId)
  }
  render() {
    const {
      side1,
      side2,
      isAnswerVisible,
      toggleAnswerVisible,
    } = this.props
    
    return <Review side1={side1} side2={side2} isAnswerVisible={isAnswerVisible}
      onToggleAnswerVisible={() => toggleAnswerVisible()} />
  }
}

ReviewContainer.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  isAnswerVisible: PropTypes.bool.isRequired,
  authedUid: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  fetchAndHandleDeckHistory: PropTypes.func.isRequired,
  showNextCard: PropTypes.func.isRequired,
  setCurrentCard: PropTypes.func.isRequired,
  toggleAnswerVisible: PropTypes.func.isRequired,
  setDeckValueListener: PropTypes.func.isRequired,
  setDeckCardCollectionListeners: PropTypes.func.isRequired,
}

function mapStateToProps (state, ownProps) {
  const { cards, review } = state
  const cardId = review.get('currentCardId')
  const card = cards.getIn(['cards', cardId])

  return {
    authedUid: state.auth.get('authedUid'),
    deckId: ownProps.params.deckId,
    side1: card ? card.get('side1') : '',
    side2: card ? card.get('side2') : '',
    isAnswerVisible: review.get('isAnswerVisible'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    fetchAndHandleDeckHistory,
    showNextCard,
    setCurrentCard,
    toggleAnswerVisible,
    setDeckValueListener,
    setDeckCardCollectionListeners,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewContainer)

