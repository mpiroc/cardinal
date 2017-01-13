import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAndHandleDeckHistory,
  setDeckValueListener,
  setDeckCardCollectionListeners,
  setCardHistoryCollectionListeners,
} from 'redux/modules/decks'
import {
  gradeAndShowNextCard,
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
      setCardHistoryCollectionListeners
    } = this.props

    setCurrentCard('')
    setDeckValueListener(authedUid, deckId)
    setDeckCardCollectionListeners(deckId)

    // Even though we are about to get the history through setCardHistoryCollectionListeners,
    // we need to be sure that we have loaded all history before selecting the first card to
    // review. So we do a one-time fetch of *all* history for the deck when the component
    // first loads.
    await fetchAndHandleDeckHistory(authedUid, deckId)
    
    setCardHistoryCollectionListeners(deckId)

    await showNextCard(moment().valueOf(), deckId)
  }
  render() {
    const {
      deckId,
      side1,
      side2,
      isAnswerVisible,
      isCurrentCardSet,
      gradeAndShowNextCard,
      toggleAnswerVisible,
    } = this.props
    
    return (
      <Review
        side1={side1}
        side2={side2}
        isAnswerVisible={isAnswerVisible}
        isCurrentCardSet={isCurrentCardSet}
        onToggleAnswerVisible={() => toggleAnswerVisible()}
        onGrade={grade => gradeAndShowNextCard(moment().valueOf(), deckId, grade)}
      />
    )
  }
}

ReviewContainer.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  isAnswerVisible: PropTypes.bool.isRequired,
  authedUid: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  fetchAndHandleDeckHistory: PropTypes.func.isRequired,
  gradeAndShowNextCard: PropTypes.func.isRequired,
  showNextCard: PropTypes.func.isRequired,
  setCurrentCard: PropTypes.func.isRequired,
  toggleAnswerVisible: PropTypes.func.isRequired,
  setDeckValueListener: PropTypes.func.isRequired,
  setDeckCardCollectionListeners: PropTypes.func.isRequired,
  setCardHistoryCollectionListeners: PropTypes.func.isRequired,
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
    isCurrentCardSet: card !== undefined,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    fetchAndHandleDeckHistory,
    gradeAndShowNextCard,
    showNextCard,
    setCurrentCard,
    toggleAnswerVisible,
    setDeckValueListener,
    setDeckCardCollectionListeners,
    setCardHistoryCollectionListeners,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewContainer)

