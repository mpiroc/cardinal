import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Decks } from 'components'
import * as userActionCreators from 'redux/modules/users'

class DecksContainer extends React.Component {
  componentDidMount() {
    const { setUserDeckCollectionListeners, authedUid } = this.props
    setUserDeckCollectionListeners(authedUid)
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
  setUserDeckCollectionListeners: PropTypes.func.isRequired,
}

function mapStateToProps ({decks, auth}, ownProps) {
  return {
    decks: decks.get('decks'),
    authedUid: auth.get('authedUid')
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksContainer)