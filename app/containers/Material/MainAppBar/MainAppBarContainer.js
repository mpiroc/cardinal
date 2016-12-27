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
    const { isAuthed } = this.props
    return (
      <MainAppBar isAuthed={isAuthed} onToggleNavDrawer={this.handleToggleNavDrawer} />
    )
  }
}

MainAppBarContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  toggleNavDrawer: PropTypes.func.isRequired,
}

function mapStateToProps ({auth}, props) {
  return {
    isAuthed: auth.get('isAuthed')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(navDrawerActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppBarContainer)