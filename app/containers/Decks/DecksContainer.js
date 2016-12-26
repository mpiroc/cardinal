import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Decks } from 'components'
import * as userActionCreators from 'redux/rewrite/users'

class DecksContainer extends React.Component {
  componentDidMount() {
    const { setUserDeckCollectionListeners, authedUid } = this.props
    setUserDeckCollectionListeners(authedUid)
  }
  render () {
    return (
      <Decks decks={this.props.decks} />
    )
  }
}

DecksContainer.propTypes = {
  decks: PropTypes.object.isRequired,
  authedUid: PropTypes.string.isRequired,
  setUserDeckCollectionListeners: PropTypes.func.isRequired,
}

function mapStateToProps ({decks, auth}, props) {
  return {
    decks: decks.get('decks'),
    authedUid: auth.get('authedUid')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksContainer)