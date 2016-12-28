import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Snackbar from 'react-toolbox/lib/snackbar'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

class NewDeckSnackbarContainer extends React.Component {
  constructor() {
    super()
    this.handleDismissSnackbar = this.handleDismissSnackbar.bind(this)
  }
  handleDismissSnackbar() {
    this.props.dismissNewDeckSnackbar()
  }
  render () {
    const {
      isActive,
      error,
    } = this.props

    return (
      <Snackbar
        action={'Dismiss'}
        active={isActive}
        label={`Error saving deck: ${error}`}
        timeout={5000}
        onClick={this.handleDismissSnackbar}
        onTimeout={this.handleDismissSnackbar}
        type='warning'
      />
    )
  }
}

NewDeckSnackbarContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  dismissNewDeckSnackbar: PropTypes.func.isRequired,
}

function mapStateToProps ({newDeckDialog}, props) {
  const snackbar = newDeckDialog.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckDialogActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckSnackbarContainer)