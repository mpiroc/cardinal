import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAndHandleDeckHistory } from 'redux/modules/decks'
import { showNextCard } from 'redux/modules/review'

class ReviewContainer extends React.Component {
  async componentDidMount() {
    const {
      uid,
      deckId,
      fetchAndHandleDeckHistory,
      showNextCard
    } = this.props

    await fetchAndHandleDeckHistory(uid, deckId)

    await showNextCard(deckId)
  }
  render() {
    return <div />
  }
}

ReviewContainer.propTypes = {
  authedUid: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  fetchAndHandleDeckHistory: PropTypes.func.isRequired,
  showNextCard: PropTypes.func.isRequired,
}

function mapStateToProps (state, ownProps) {
  return {
    authedUid: state.auth.get('authedUid'),
    deckId: ownProps.params.deckId,
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

