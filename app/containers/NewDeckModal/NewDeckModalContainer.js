import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckModal } from 'components'
import * as newDeckModalActionCreators from 'redux/modules/newDeckModal'

function mapStateToProps (state, props) {
  return {
    isOpen: state.newDeckModal.get('isOpen'),
    isSaving: state.newDeckModal.get('isSaving'),
    name: state.newDeckModal.get('name'),
    error: state.newDeckModal.get('error'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckModalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckModal)