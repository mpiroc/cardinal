import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CardRTCard } from 'components'
import * as cardActionCreators from 'redux/modules/cards'

class CardRTCardContainer extends React.Component {
  constructor() {
    super()
    this.handleDeleteCard = this.handleDeleteCard.bind(this)
  }
  handleDeleteCard() {
    const { deckId, cardId, deleteAndHandleCard } = this.props
    deleteAndHandleCard(deckId, cardId)
  }
  render () {
    const {
      deckId,
      cardId,
      isDeleting,
      side1,
      side2,
    } = this.props

    return (
      <CardRTCard
        cardId={cardId}
        isDeleting={isDeleting}
        side1={side1}
        side2={side2}
        onDelete={this.handleDeleteCard}
      />
    )
  }
}

CardRTCardContainer.propTypes = {
  deckId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  deleteAndHandleCard: PropTypes.func.isRequired,
}

CardRTCardContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps ({ cards }, props) {
  const card = cards.getIn(['cards', props.cardId])

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

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(cardActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardRTCardContainer)