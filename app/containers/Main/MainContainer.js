import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { saveUser } from 'helpers/firebase'
import { MainSidebar } from 'components'
import {
  MainAppBarContainer
} from 'containers'
import {
  Layout,
  Panel,
} from 'react-toolbox'
import * as authActionCreators from 'redux/modules/auth'
import * as userActionCreators from 'redux/modules/users'
import * as loginRedirectActionCreators from 'redux/modules/loginRedirect'

class MainContainer extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
        }

        await saveUser(user)

        const { authUser, setAndHandleUserValueListener, loginRedirect, clearLoginRedirect } = this.props
        authUser(user.uid)
        setAndHandleUserValueListener(user.uid)

        if (loginRedirect) {
          clearLoginRedirect()
          this.context.router.replace(loginRedirect)
        }
        else {
          this.context.router.replace('/')
        }
      }
    })
  }
  render () {
    return (
      <div style={{height: '100vh'}}>
        <Layout>
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
  loginRedirect: PropTypes.string,
  clearLoginRedirect: PropTypes.func.isRequired,
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps({loginRedirect}, props) {
  return {
    deckId: props.params ? props.params.deckId : null,
    loginRedirect: loginRedirect.get('redirect'),
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    ...authActionCreators,
    ...userActionCreators,
    ...loginRedirectActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)