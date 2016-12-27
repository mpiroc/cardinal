import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MainAppBar } from 'components/Material'
import * as navDrawerActionCreators from 'redux/modules/navDrawer'

class MainAppBarContainer extends React.Component {
  constructor() {
    super()
    this.handleToggleNavDrawer = this.handleToggleNavDrawer.bind(this)
  }
  handleToggleNavDrawer(event) {
    event.preventDefault()
    this.props.toggleNavDrawer()
  }
  render () {
    return (
      <MainAppBar onToggleNavDrawer={this.handleToggleNavDrawer} />
    )
  }
}

MainAppBarContainer.propTypes = {
  toggleNavDrawer: PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(navDrawerActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppBarContainer)