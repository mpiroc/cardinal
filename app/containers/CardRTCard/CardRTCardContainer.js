import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CardRTCard } from 'components'
import * as cardActionCreators from 'redux/modules/cards'

class CardRTCardContainer extends React.Component {
  render () {
    const { cardId, side1, side2 } = this.props

    return (
      <CardRTCard
        cardId={cardId}
        side1={side1}
        side2={side2}
      />
    )
  }
}

CardRTCardContainer.propTypes = {
  cardId: PropTypes.string.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
}

CardRTCardContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps ({ cards }, props) {
  const card = cards.getIn(['cards', props.cardId])

  // TODO: Better if card always exists, but has empty side1 and side2 with isLoading=true
  if (card === undefined) {
    return {
      side1: 'Loading...',
      side2: 'Loading...',
    }
  }

  return {
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