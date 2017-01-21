import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Decks from 'components/Decks/Decks'
import { setAndHandleUserDeckCollectionListeners } from 'redux/modules/firebase'

class DecksContainer extends React.Component {
  componentDidMount() {
    const {
      setAndHandleUserDeckCollectionListeners,
      isAuthed,
      authedUid,
    } = this.props

    // When the user logs out from this page, there will be a brief moment
    // between when we unauth the user and redux and when react-router
    // processes the push('/path') action.
    if (isAuthed === true) {
      setAndHandleUserDeckCollectionListeners(authedUid)
    }
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
  isAuthed: PropTypes.bool.isRequired,
  authedUid: PropTypes.string.isRequired,
  setAndHandleUserDeckCollectionListeners: PropTypes.func.isRequired,
}

function mapStateToProps ({decks, auth}, ownProps) {
  return {
    decks: decks.get('decks'),
    isAuthed: auth.get('isAuthed'),
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