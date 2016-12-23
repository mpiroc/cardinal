import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckModal } from 'components'
import * as newDeckModalActionCreators from 'redux/modules/newDeckModal'

// TODO: The container component is unnecessary--connect directly to the presentational component instead

class NewDeckModalContainer extends React.Component {
  render () {
    const { isOpen, isSaving, name, error, updateNewDeckName, closeNewDeckModal, saveAndHandleNewDeck } = this.props
    return (
      <NewDeckModal
        isOpen={isOpen}
        isSaving={isSaving}
        name={name}
        error={error}
        updateNewDeckName={updateNewDeckName}
        closeNewDeckModal={closeNewDeckModal}
        saveAndHandleNewDeck={saveAndHandleNewDeck} />
    )
  }
}

NewDeckModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateNewDeckName: PropTypes.func.isRequired,
  closeNewDeckModal: PropTypes.func.isRequired,
  saveAndHandleNewDeck: PropTypes.func.isRequired,
}

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
)(NewDeckModalContainer)