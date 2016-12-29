import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckRTCard } from 'components'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  const boundActionCreators = bindActionCreators(newDeckDialogActionCreators, dispatch)

  return {
    onOpenDialog: boundActionCreators.openNewDeckDialog
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckRTCard)