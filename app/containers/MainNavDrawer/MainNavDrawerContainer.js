import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MainNavDrawer } from 'components'
import * as navDrawerActionCreators from 'redux/modules/navDrawer'

class MainNavDrawerContainer extends React.Component {
  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose(event) {
    event.preventDefault()
    this.props.hideNavDrawer()
  }
  render () {
    return (
      <MainNavDrawer isActive={this.props.isActive} onClose={this.handleClose} />
    )
  }
}

MainNavDrawerContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideNavDrawer: PropTypes.func.isRequired,
}

function mapStateToProps ({navDrawer}, props) {
  return {
    isActive: navDrawer.get('isActive')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(navDrawerActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavDrawerContainer)