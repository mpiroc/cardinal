import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import * as authActionCreators from 'redux/modules/auth'

class SignOutButtonContainer extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async handleClick(event) {
    await this.props.signOutAndUnauth()
    this.context.router.replace('/')
  }
  render () {
    return (
      <Button style={{color: 'white'}} label={'Sign Out'} onClick={this.handleClick} />
    )
  }
}

SignOutButtonContainer.propTypes = {
  signOutAndUnauth: PropTypes.func.isRequired,
}

SignOutButtonContainer.contextTypes = {
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
)(SignOutButtonContainer)