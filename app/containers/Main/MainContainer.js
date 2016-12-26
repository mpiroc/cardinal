import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { saveUser } from 'helpers/firebase'
import { redirectIfNecessary } from 'helpers/routes'
import { NavigationBarContainer } from 'containers'
import { innerContainer } from 'sharedStyles/styles.css'
import * as authActionCreators from 'redux/modules/auth'
import * as userActionCreators from 'redux/modules/users'

class MainContainer extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
        }

        await saveUser(user)

        const { authUser, setAndHandleUserValueListener } = this.props
        authUser(user.uid)
        setAndHandleUserValueListener(user.uid)

        redirectIfNecessary(true, this.props.location.pathname, this.context.router.replace)
      }
    })
  }
  render () {
    return (
      <div>
        <NavigationBarContainer deckId={this.props.deckId} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  deckId: PropTypes.string,
  authUser: PropTypes.func.isRequired,
  setAndHandleUserValueListener: PropTypes.func.isRequired,
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {
    deckId: props.params ? props.params.deckId : null
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    ...authActionCreators,
    ...userActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)