import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MainAppBar } from 'components'
import * as navDrawerActionCreators from 'redux/modules/navDrawer'

function mapStateToProps ({auth}, props) {
  return {
    isAuthed: auth.get('isAuthed')
  }
}

function mapDispatchToProps (dispatch, props) {
  const boundActionCreators = bindActionCreators(navDrawerActionCreators, dispatch)

  return {
    onToggleNavDrawer: boundActionCreators.toggleNavDrawer,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppBar)