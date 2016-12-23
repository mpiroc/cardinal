import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationBar } from 'components'

class NavigationBarContainer extends React.Component {
  render () {
    return (
      <NavigationBar isAuthed={this.props.isAuthed} />
    )
  }
}

NavigationBarContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

function mapStateToProps (state, props) {
  return {
    isAuthed: state.users.get('authedUserId').length > 0
  }
}

export default connect(
  mapStateToProps
)(NavigationBarContainer)