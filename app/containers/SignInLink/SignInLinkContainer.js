import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DelegateLink } from 'components'
import * as authActionCreators from 'redux/modules/auth'
import * as userActionCreators from 'redux/modules/users'

class SignInLinkContainer extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async handleClick(event) {
    event.preventDefault()

    const { authAndSaveUser, setAndHandleUserValueListener, authedUid } = this.props
    await authAndSaveUser()
    setAndHandleUserValueListener(authedUid)
    
    this.context.router.replace('decks')
  }
  render () {
    return (
      <DelegateLink onClick={this.handleClick}>{'Sign In'}</DelegateLink>
    )
  }
}

SignInLinkContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

SignInLinkContainer.propTypes = {
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
)(SignInLinkContainer)