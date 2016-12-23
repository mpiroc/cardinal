import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Deck } from 'components'
import * as deckActionCreators from 'redux/modules/decks'

class DeckContainer extends React.Component {
  render () {
    return (
      <Deck />
    )
  }
}

DeckContainer.propTypes = {
  
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckContainer)