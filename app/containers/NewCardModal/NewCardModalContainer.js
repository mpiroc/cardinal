import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewCardModal } from 'components'
import * as newCardModalActionCreators from 'redux/modules/newCardModal'

function mapStateToProps (state, props) {
  return {
    isOpen: state.newCardModal.get('isOpen'),
    isSaving: state.newCardModal.get('isSaving'),
    side1: state.newCardModal.get('side1'),
    side2: state.newCardModal.get('side2'),
    error: state.newCardModal.get('error'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newCardModalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardModal)