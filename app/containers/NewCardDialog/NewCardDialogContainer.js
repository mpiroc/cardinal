import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditCardDialog } from 'components'
import * as newCardDialogActionCreators from 'redux/modules/newCardDialog'

class NewCardDialogContainer extends React.Component {
  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSide1Change = this.handleSide1Change.bind(this)
    this.handleSide2Change = this.handleSide2Change.bind(this)
  }
  handleSide1Change(side1) {
    this.props.updateNewCardSide1(side1)
  }
  handleSide2Change(side2) {
    this.props.updateNewCardSide2(side2)
  }
  handleSave() {
    this.props.saveAndHandleNewCard()
  }
  handleCancel() {
    this.props.closeNewCardDialog()
  }
  render () {
    const { isActive, isSaving, side1, side2 } = this.props
    return (
      <EditCardDialog
        isActive={isActive}
        isSaving={isSaving}
        title={'Create New Card'}
        side1={side1}
        side2={side2}
        onSide1Change={this.handleSide1Change}
        onSide2Change={this.handleSide2Change}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
    )
  }
}

NewCardDialogContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  updateNewCardSide1: PropTypes.func.isRequired,
  updateNewCardSide2: PropTypes.func.isRequired,
  saveAndHandleNewCard: PropTypes.func.isRequired,
  closeNewCardDialog: PropTypes.func.isRequired,
}

function mapStateToProps ({newCardDialog}, props) {
  return {
    isActive: newCardDialog.get('isActive'),
    isSaving: newCardDialog.get('isSaving'),
    side1: newCardDialog.get('side1'),
    side2: newCardDialog.get('side2'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newCardDialogActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardDialogContainer)