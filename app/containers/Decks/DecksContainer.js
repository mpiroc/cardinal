import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Decks } from 'components'
import * as decksActionCreators from 'redux/modules/decks'

class DecksContainer extends React.Component {
  componentDidMount() {
    this.props.setAndHandleDecksListener()
  }
  render () {
    return (
      <Decks decks={this.props.decks} />
    )
  }
}

DecksContainer.propTypes = {
  decks: PropTypes.object.isRequired,
  setAndHandleDecksListener: PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
  return {
    decks: state.decks.get('decks'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(decksActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksContainer)