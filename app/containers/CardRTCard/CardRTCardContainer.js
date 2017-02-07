import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  setAndHandleCardHistoryValueListener,
  setAndHandleCardContentValueListener,
} from 'redux/modules/firebase'
import CardRTCard from 'components/CardRTCard/CardRTCard'
import { openDeleteCardConfirmationDialog } from 'redux/modules/deleteCardConfirmationDialog'
import { openEditCardDialog } from 'redux/modules/editCardDialog'


class CardRTCardContainer extends React.Component {
  componentDidMount() {
    const {
      deckId,
      cardId,
      setAndHandleCardHistoryValueListener,
      setAndHandleCardContentValueListener,
    } = this.props

    setAndHandleCardHistoryValueListener(deckId, cardId)
    setAndHandleCardContentValueListener(deckId, cardId)
  }
  render() {
    const {
      isDeleting,
      side1,
      side2,
      nextReview,
      onEdit,
      onDelete,
    } = this.props

    return (
      <CardRTCard
        isDeleting={isDeleting}
        side1={side1}
        side2={side2}
        nextReview={nextReview}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )
  }
}

function formatNextReview(nextReviewMs) {
  if (nextReviewMs === undefined) {
    return 'Now'
  }

  const nowMoment = moment()
  const nextReviewMoment = moment(nextReviewMs)

  return nextReviewMoment.isBefore(nowMoment) ?
    'Now' :
    nextReviewMoment.fromNow()
}

function mapStateToProps ({ cards }, { cardId }) {
  const card = cards.getIn(['cards', cardId])

  if (card === undefined) {
    return {
      isLoading: true,
      isDeleting: false,
      side1: '',
      side2: '',
      nextReview: '',
    }
  }

  const side1 = card.getIn(['content', 'side1'])
  const side2 = card.getIn(['content', 'side2'])

  return {
    isLoading: false,
    isDeleting: card.get('isDeleting'),
    side1: side1 === undefined ? '' : side1,
    side2: side2 === undefined ? '' : side2,
    nextReview: formatNextReview(card.getIn(['history', 'nextReviewMs'])),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    setAndHandleCardHistoryValueListener,
    setAndHandleCardContentValueListener,
    openDeleteCardConfirmationDialog,
    openEditCardDialog,
  }, dispatch)
}

function mergeProps (
    {
      isLoading,
      isDeleting,
      side1,
      side2,
      nextReview,
    },
    {
      setAndHandleCardHistoryValueListener,
      setAndHandleCardContentValueListener,
      openEditCardDialog,
      openDeleteCardConfirmationDialog,
    },
    {
      deckId,
      cardId,
    }) {
  return {
    isLoading,
    isDeleting,
    side1,
    side2,
    nextReview,
    deckId,
    cardId,
    setAndHandleCardHistoryValueListener,
    setAndHandleCardContentValueListener,
    onEdit: () => openEditCardDialog(
      deckId,
      cardId,
      side1,
      side2,
    ),
    onDelete: () => openDeleteCardConfirmationDialog(
      deckId,
      cardId,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CardRTCardContainer)