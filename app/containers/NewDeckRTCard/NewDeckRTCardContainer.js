import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckRTCard } from 'components'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const boundActionCreators = bindActionCreators(newDeckDialogActionCreators, dispatch)

  return {
    onOpenDialog: boundActionCreators.openNewDeckDialog
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckRTCard)