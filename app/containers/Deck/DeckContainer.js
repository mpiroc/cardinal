import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Deck } from 'components'
import * as cardActionCreators from 'redux/modules/cards'

class DeckContainer extends React.Component {
  componentDidMount() {
    this.props.setAndHandleCardsListener()
  }
  render () {
    return (
      <Deck />
    )
  }
}

DeckContainer.propTypes = {
  setAndHandleCardsListener: PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(cardActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckContainer)