import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SignInLink } from 'components'
import * as userActionCreators from 'redux/modules/users'

class SignInLinkContainer extends React.Component {
  async handleClick(event) {
    event.preventDefault()
    await this.props.authAndSaveUser()
    this.context.router.replace('decks')
  }
  render () {
    return (
      <SignInLink onClick={this.handleClick.bind(this)} isAuthed={this.props.isAuthed} />
    )
  }
}

SignInLinkContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

SignInLinkContainer.propTypes = {
  authAndSaveUser: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
}


function mapStateToProps ({users}, props) {
  return {
    isAuthed: users.get('authedUserId').length > 0,
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInLinkContainer)