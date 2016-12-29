import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { MainAppBar } from 'components'

function mapStateToProps ({auth}, props) {
  return {
    isAuthed: auth.get('isAuthed')
  }
}

function mapDispatchToProps (dispatch, props) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainAppBar)