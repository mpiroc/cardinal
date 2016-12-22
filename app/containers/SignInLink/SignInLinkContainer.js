import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DelegateLink } from 'components'
import * as userActionCreators from 'redux/modules/users'

class SignInLinkContainer extends React.Component {
  async handleClick(event) {
    event.preventDefault()
    await this.props.authAndSaveUser()
    this.context.router.replace('decks')
  }
  render () {
    return (
      <DelegateLink onClick={this.handleClick.bind(this)}>{'Sign In'}</DelegateLink>
    )
  }
}

SignInLinkContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

SignInLinkContainer.propTypes = {
  authAndSaveUser: PropTypes.func.isRequired,
}


function mapStateToProps ({users}, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInLinkContainer)