import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckDialog } from 'components/Material'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

class NewDeckDialogContainer extends React.Component {
  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleSave() {
    this.props.closeNewDeckDialog()
  }
  handleCancel() {
    this.props.closeNewDeckDialog()
  }
  render () {
    return (
      <NewDeckDialog
        isActive={this.props.isActive}
        onSave={this.handleSave}
        onCancel={this.handleCancel} />
    )
  }
}

NewDeckDialogContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  closeNewDeckDialog: PropTypes.func.isRequired,
}

function mapStateToProps ({newDeckDialog}, props) {
  return {
    isActive: newDeckDialog.get('isActive')
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckDialogActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckDialogContainer)