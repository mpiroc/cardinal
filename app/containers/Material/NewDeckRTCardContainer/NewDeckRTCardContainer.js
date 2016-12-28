import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewDeckRTCard } from 'components/Material'
import * as newDeckDialogActionCreators from 'redux/modules/newDeckDialog'

class NewDeckRTCardContainer extends React.Component {
  constructor() {
    super()
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
  }
  handleOpenDialog() {
    this.props.openNewDeckDialog()
  }
  render () {
    return (
      <NewDeckRTCard onOpenDialog={this.handleOpenDialog} />
    )
  }
}

NewDeckRTCardContainer.propTypes = {
  openNewDeckDialog: PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckDialogActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckRTCardContainer)