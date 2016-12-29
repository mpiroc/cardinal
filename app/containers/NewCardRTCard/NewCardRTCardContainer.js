import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewCardRTCard } from 'components'
import * as newCardDialogActionCreators from 'redux/modules/newCardDialog'

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const boundActionCreators = bindActionCreators(newCardDialogActionCreators, dispatch)

  return {
    onOpenDialog: () => boundActionCreators.openNewCardDialog(ownProps.deckId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardRTCard)