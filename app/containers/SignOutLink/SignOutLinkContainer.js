import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DelegateLink } from 'components'
import * as authActionCreators from 'redux/modules/auth'

class SignOutLinkContainer extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async handleClick(event) {
    event.preventDefault()

    await this.props.signOutAndUnauth()
    this.context.router.replace('/')
  }
  render () {
    return (
      <DelegateLink onClick={this.handleClick}>{'Sign Out'}</DelegateLink>
    )
  }
}

SignOutLinkContainer.propTypes = {
  signOutAndUnauth: PropTypes.func.isRequired,
}

SignOutLinkContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(authActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutLinkContainer)