import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Decks from 'components/Decks/Decks'
import { setAndHandleUserDeckCollectionListeners } from 'redux/modules/firebase'

class DecksContainer extends React.Component {
  componentDidMount() {
    const { setAndHandleUserDeckCollectionListeners, authedUid } = this.props
    setAndHandleUserDeckCollectionListeners(authedUid)
  }
  render () {
    const { decks } = this.props
    return (
      <Decks decks={decks} />
    )
  }
}

DecksContainer.propTypes = {
  decks: PropTypes.object.isRequired,
  authedUid: PropTypes.string.isRequired,
  setAndHandleUserDeckCollectionListeners: PropTypes.func.isRequired,
}

function mapStateToProps ({decks, auth}, ownProps) {
  return {
    decks: decks.get('decks'),
    authedUid: auth.get('authedUid'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    setAndHandleUserDeckCollectionListeners,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksContainer)