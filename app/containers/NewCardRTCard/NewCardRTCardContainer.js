import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewCardRTCard } from 'components'
//import * as newCardDialogActionCreators from 'redux/modules/newCardDialog'

class NewCardRTCardContainer extends React.Component {
  constructor() {
    super()
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
  }
  handleOpenDialog() {
    //this.props.openNewCardDialog()
  }
  render () {
    return (
      <NewCardRTCard onOpenDialog={this.handleOpenDialog} />
    )
  }
}

NewCardRTCardContainer.propTypes = {
  //openNewCardDialog: PropTypes.func.isRequired
}

function mapStateToProps (state, props) {
  return {
  }
}

/*function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newCardDialogActionCreators, dispatch)
}*/

export default connect(
  mapStateToProps,
  //mapDispatchToProps
)(NewCardRTCardContainer)