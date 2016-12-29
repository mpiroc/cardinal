import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MainNavDrawer } from 'components'
import * as navDrawerActionCreators from 'redux/modules/navDrawer'

function mapStateToProps ({navDrawer}, props) {
  return {
    isActive: navDrawer.get('isActive')
  }
}

function mapDispatchToProps (dispatch, props) {
  const boundActionCreators = bindActionCreators(navDrawerActionCreators, dispatch)

  return {
    onClose: boundActionCreators.hideNavDrawer,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavDrawer)