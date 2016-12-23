import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewCardModal } from 'components'
import * as newCardModalActionCreators from 'redux/modules/newCardModal'

// TODO: The container component is unnecessary--connect directly to the presentational component instead

class NewCardModalContainer extends React.Component {
  render () {
    const {
      isOpen, isSaving, side1, side2, error,
      updateNewCardSide1,
      updateNewCardSide2,
      closeNewCardModal,
      saveAndHandleNewCard
    } = this.props

    return (
      <NewCardModal
        isOpen={isOpen}
        isSaving={isSaving}
        side1={side1}
        side2={side2}
        error={error}
        updateNewCardSide1={updateNewCardSide1}
        updateNewCardSide2={updateNewCardSide2}
        closeNewCardModal={closeNewCardModal}
        saveAndHandleNewCard={saveAndHandleNewCard} />
    )
  }
}

NewCardModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateNewCardSide1: PropTypes.func.isRequired,
  updateNewCardSide2: PropTypes.func.isRequired,
  closeNewCardModal: PropTypes.func.isRequired,
}

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
)(NewCardModalContainer)