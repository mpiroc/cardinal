import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { MainAppBar } from 'components'

function mapStateToProps ({ auth }, { router }) {
  return {
    isAuthed: auth.get('isAuthed'),
    onNavigateToHome: () => router.replace('/'),
  }
}

export default withRouter(connect(
  mapStateToProps,
)(MainAppBar))



