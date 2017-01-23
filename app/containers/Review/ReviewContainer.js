import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAndHandleDeckHistory,
} from 'redux/modules/decks'
import {
  setAndHandleUserDeckValueListener,
  setAndHandleDeckCardCollectionListeners,
  setAndHandleCardHistoryCollectionListeners,
} from 'redux/modules/firebase'
import {
  gradeAndShowNextCard,
  showNextCard,
  setCurrentCard,
  toggleAnswerVisible,
  selectGrade,
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
      setAndHandleUserDeckValueListener,
      setAndHandleDeckCardCollectionListeners,
      setAndHandleCardHistoryCollectionListeners
    } = this.props

    setCurrentCard('')
    setAndHandleUserDeckValueListener(authedUid, deckId)
    setAndHandleDeckCardCollectionListeners(deckId)

    // Even though we are about to get the history through setAndHandleCardHistoryCollectionListeners,
    // we need to be sure that we have loaded all history before selecting the first card to
    // review. So we do a one-time fetch of *all* history for the deck when the component
    // first loads.
    await fetchAndHandleDeckHistory(authedUid, deckId)
    
    setAndHandleCardHistoryCollectionListeners(deckId)

    await showNextCard(moment().valueOf(), deckId)
  }
  render() {
    const {
      deckId,
      side1,
      side2,
      isAnswerVisible,
      selectedGrade,
      isCurrentCardSet,
      gradeAndShowNextCard,
      toggleAnswerVisible,
      selectGrade,
    } = this.props
    
    return (
      <Review
        side1={side1}
        side2={side2}
        isAnswerVisible={isAnswerVisible}
        selectedGrade={selectedGrade}
        isCurrentCardSet={isCurrentCardSet}
        onToggleAnswerVisible={toggleAnswerVisible}
        onSelectGrade={selectGrade}
        onGrade={grade => gradeAndShowNextCard(moment().valueOf(), deckId, grade)}
      />
    )
  }
}

ReviewContainer.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  isAnswerVisible: PropTypes.bool.isRequired,
  selectedGrade: PropTypes.number.isRequired,
  authedUid: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  fetchAndHandleDeckHistory: PropTypes.func.isRequired,
  gradeAndShowNextCard: PropTypes.func.isRequired,
  showNextCard: PropTypes.func.isRequired,
  setCurrentCard: PropTypes.func.isRequired,
  toggleAnswerVisible: PropTypes.func.isRequired,
  selectGrade: PropTypes.func.isRequired,
  setAndHandleUserDeckValueListener: PropTypes.func.isRequired,
  setAndHandleDeckCardCollectionListeners: PropTypes.func.isRequired,
  setAndHandleCardHistoryCollectionListeners: PropTypes.func.isRequired,
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
    selectedGrade: review.get('selectedGrade'),
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
    selectGrade,
    setAndHandleUserDeckValueListener,
    setAndHandleDeckCardCollectionListeners,
    setAndHandleCardHistoryCollectionListeners,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewContainer)

