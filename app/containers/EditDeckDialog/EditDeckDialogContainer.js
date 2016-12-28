import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditDeckDialog } from 'components'
import * as editDeckDialogActionCreators from 'redux/modules/editDeckDialog'

class EditDeckDialogContainer extends React.Component {
  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }
  handleNameChange(name) {
    this.props.updateEditDeckName(name)
  }
  handleDescriptionChange(description) {
    this.props.updateEditDeckDescription(description)
  }
  handleSave() {
    this.props.saveAndHandleEditDeck()
  }
  handleCancel() {
    this.props.closeEditDeckDialog()
  }
  render () {
    const { isActive, isSaving, deckId, name, description } = this.props
    return (
      <EditDeckDialog
        isActive={isActive}
        isSaving={isSaving}
        deckId={deckId}
        title={'Edit Deck'}
        name={name}
        description={description}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
    )
  }
}

EditDeckDialogContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  deckId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  updateEditDeckName: PropTypes.func.isRequired,
  updateEditDeckDescription: PropTypes.func.isRequired,
  saveAndHandleEditDeck: PropTypes.func.isRequired,
  closeEditDeckDialog: PropTypes.func.isRequired,
}

function mapStateToProps ({editDeckDialog}, props) {
  return {
    isActive: editDeckDialog.get('isActive'),
    isSaving: editDeckDialog.get('isSaving'),
    name: editDeckDialog.get('name'),
    description: editDeckDialog.get('description'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(editDeckDialogActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDeckDialogContainer)