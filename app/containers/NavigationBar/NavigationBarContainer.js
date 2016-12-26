import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationBar } from 'components'

function mapStateToProps (state, props) {
  return {
    isAuthed: state.auth.get('authedUid').length > 0,
  }
}

export default connect(
  mapStateToProps
)(NavigationBar)