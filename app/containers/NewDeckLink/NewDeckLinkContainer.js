import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DelegateLink } from 'components'
import * as newDeckModalActionCreators from 'redux/modules/newDeckModal'

class NewDeckLinkContainer extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (event) {
    event.preventDefault()
    this.props.openNewDeckModal()
  }
  render () {
    return (
      <DelegateLink onClick={this.handleClick} label={'New Deck'} />
    )
  }
}

NewDeckLinkContainer.propTypes = {
  openNewDeckModal: PropTypes.func.isRequired
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newDeckModalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeckLinkContainer)