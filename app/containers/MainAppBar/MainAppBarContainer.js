import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MainAppBar } from 'components'


class MainAppBarContainer extends React.Component {
  constructor() {
    super()
    this.handleNavigateToHome = this.handleNavigateToHome.bind(this)
  }
  handleNavigateToHome() {
    this.context.router.replace('/')
  }
  render () {
    const { isAuthed } = this.props
    return (
      <MainAppBar isAuthed={isAuthed} onNavigateToHome={this.handleNavigateToHome} />
    )
  }
}

MainAppBarContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

MainAppBarContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps ({auth}, props) {
  return {
    isAuthed: auth.get('isAuthed')
  }
}

export default connect(
  mapStateToProps,
)(MainAppBarContainer)



