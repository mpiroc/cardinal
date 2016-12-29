import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import * as authActionCreators from 'redux/modules/auth'
import * as userActionCreators from 'redux/modules/users'

class SignInButtonContainer extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async handleClick(event) {
    const { authAndSaveUser, setAndHandleUserValueListener, authedUid } = this.props
    await authAndSaveUser()
    setAndHandleUserValueListener(authedUid)
    
    this.context.router.replace('decks')
  }
  render () {
    return (
      <Button style={{color: 'white'}} label={'Sign In'} onClick={this.handleClick} />
    )
  }
}

SignInButtonContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

SignInButtonContainer.propTypes = {
  authAndSaveUser: PropTypes.func.isRequired,
  setAndHandleUserValueListener: PropTypes.func.isRequired,
  authedUid: PropTypes.string.isRequired,
}


function mapStateToProps ({auth, users}, props) {
  return {
    authedUid: auth.get('authedUid')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({
    ...authActionCreators,
    ...userActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInButtonContainer)