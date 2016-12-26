import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Deck } from 'components'
import * as deckActionCreators from 'redux/rewrite/decks'

class DeckContainer extends React.Component {
  componentDidMount() {
    const { authedUid, setDeckValueListener, setDeckCardCollectionListeners, params } = this.props
    setDeckValueListener(authedUid, params.deckId)
    setDeckCardCollectionListeners(params.deckId)
  }
  render () {
    return (
      <Deck deckId={this.props.params.deckId} />
    )
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

function mapStateToProps ({ auth }, props) {
  return {
    authedUid: auth.get('authedUid')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckContainer)