import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditDeckDialog } from 'components'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

class NewDeckDialogContainer extends React.Component {
  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
  }
  handleNameChange(name) {
    this.props.updateNewDeckName(name)
  }
  handleDescriptionChange(description) {
    this.props.updateNewDeckDescription(description)
  }
  handleSave() {
    this.props.saveAndHandleNewDeck()
  }
  handleCancel() {
    this.props.closeNewDeckDialog()
  }
  render () {
    const { isActive, isSaving, name, description } = this.props
    return (
      <EditDeckDialog
        isActive={isActive}
        isSaving={isSaving}
        title={'Create New Deck'}
        name={name}
        description={description}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        onSave={this.handleSave}
        onCancel={this.handleCancel} />
    )
  }
}

NewDeckDialogContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  updateNewDeckName: PropTypes.func.isRequired,
  updateNewDeckDescription: PropTypes.func.isRequired,
  saveAndHandleNewDeck: PropTypes.func.isRequired,
  closeNewDeckDialog: PropTypes.func.isRequired,
}

function mapStateToProps ({newDeckDialog}, props) {
  // TODO: Display loading animation while saving
  return {
    isActive: newDeckDialog.get('isActive'),
    isSaving: newDeckDialog.get('isSaving'),
    name: newDeckDialog.get('name'),
    description: newDeckDialog.get('description'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckDialogActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckDialogContainer)