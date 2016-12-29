import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { signOutAndUnauth } from 'redux/modules/auth'

class SignOutButtonContainer extends React.Component {
  render () {
    return (
      <Button style={{color: 'white'}} label={'Sign Out'} onClick={this.props.onSignOut} />
    )
  }
}

SignOutButtonContainer.propTypes = {
  onSignOut: PropTypes.func.isRequired,
}

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onSignOut: async () => {
      await dispatch(signOutAndUnauth())
      ownProps.router.replace('/')
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutButtonContainer))