import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CardRTCard } from 'components'
import * as cardActionCreators from 'redux/modules/cards'

function mapStateToProps ({ cards }, ownProps) {
  const card = cards.getIn(['cards', ownProps.cardId])

  if (card === undefined) {
    return {
      isLoading: true,
      isDeleting: false,
      side1: '',
      side2: '',
    }
  }

  return {
    isLoading: false,
    isDeleting: card.get('isDeleting'),
    side1: card.get('side1'),
    side2: card.get('side2'),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const boundActionCreators = bindActionCreators(cardActionCreators, dispatch)

  return {
    onDelete: () => boundActionCreators.deleteAndHandleCard(ownProps.deckId, ownProps.cardId)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardRTCard)