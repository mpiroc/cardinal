import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Snackbar } from 'react-toolbox'
import * as deckActionCreators from 'redux/modules/decks'

class DecksSnackbarContainer extends React.Component {
  constructor() {
    super()
    this.handleDismissSnackbar = this.handleDismissSnackbar.bind(this)
  }
  handleDismissSnackbar() {
    this.props.dismissDecksSnackbar()
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
        label={`Error deleting deck: ${error}`}
        timeout={5000}
        onClick={this.handleDismissSnackbar}
        onTimeout={this.handleDismissSnackbar}
        type='warning'
      />
    )
  }
}

DecksSnackbarContainer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  dismissDecksSnackbar: PropTypes.func.isRequired,
}

function mapStateToProps ({decks}, props) {
  const snackbar = decks.get('snackbar')
  return {
    isActive: snackbar.get('isActive'),
    error: snackbar.get('error'),
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(deckActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksSnackbarContainer)