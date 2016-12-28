import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DecksSnackbar } from 'components'
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
      <DecksSnackbar
        isActive={isActive}
        error={error}
        onDismissSnackbar={this.handleDismissSnackbar}
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