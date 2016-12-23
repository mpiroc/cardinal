import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DelegateLink } from 'components'
import { NewCardModalContainer } from 'containers'
import * as newCardModalActionCreators from 'redux/modules/newCardModal'

class NewCardLinkContainer extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (event) {
    event.preventDefault()
    this.props.openNewCardModal()
  }
  render () {
    return (
      <DelegateLink onClick={this.handleClick}>
        {'New Card'}
        <span>
          <NewCardModalContainer deckId={this.props.deckId} />
        </span>
      </DelegateLink>
    )
  }
}

NewCardLinkContainer.propTypes = {
  deckId: PropTypes.string,
  openNewCardModal: PropTypes.func.isRequired
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(newCardModalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardLinkContainer)