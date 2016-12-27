import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { saveUser } from 'helpers/firebase'
import { redirectIfNecessary } from 'helpers/routes'
import { MainSidebar } from 'components/Material'
import { MainNavDrawerContainer, MainAppBarContainer } from 'containers/Material'
import {
  Layout,
  Panel,
} from 'react-toolbox'
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
      <div style={{height: '100vh'}}>
        <Layout>
          <MainNavDrawerContainer />
          <Panel>
            <MainAppBarContainer />
            <div style={{padding: '1.8rem', height: '100%' }}>
              {this.props.children}
            </div>
          </Panel>
        </Layout>
      </div>
    )
  }
}

MainContainer.propTypes = {
  deckId: PropTypes.string,
  authUser: PropTypes.func.isRequired,
  setAndHandleUserValueListener: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
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