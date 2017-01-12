import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAndHandleDeckHistory } from 'redux/modules/decks'
import { showNextCard } from 'redux/modules/review'
import Review from 'components/Review/Review'

class ReviewContainer extends React.Component {
  async componentDidMount() {
    const {
      authedUid,
      deckId,
      fetchAndHandleDeckHistory,
      showNextCard
    } = this.props

    await fetchAndHandleDeckHistory(authedUid, deckId)

    await showNextCard(deckId)
  }
  render() {
    const {
      side1,
      side2,
    } = this.props
    
    return <Review side1={side1} side2={side2} />
  }
}

ReviewContainer.propTypes = {
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  authedUid: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  fetchAndHandleDeckHistory: PropTypes.func.isRequired,
  showNextCard: PropTypes.func.isRequired,
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
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    fetchAndHandleDeckHistory,
    showNextCard,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewContainer)

