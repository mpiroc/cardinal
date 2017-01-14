import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import CardRTCard from 'components/CardRTCard/CardRTCard'
import { openDeleteCardConfirmationDialog } from 'redux/modules/deleteCardConfirmationDialog'
import { openEditCardDialog } from 'redux/modules/editCardDialog'

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

  return {
    isLoading: false,
    isDeleting: card.get('isDeleting'),
    side1: card.get('side1'),
    side2: card.get('side2'),
    nextReview: formatNextReview(card.getIn(['history', 'nextReviewMs'])),
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return bindActionCreators({
    openDeleteCardConfirmationDialog,
    openEditCardDialog,
  }, dispatch)
}

function mergeProps (
    { isLoading, isDeleting, side1, side2, nextReview, },
    { openEditCardDialog, openDeleteCardConfirmationDialog },
    { deckId, cardId }) {
  return {
    isLoading,
    isDeleting,
    side1,
    side2,
    nextReview,
    cardId,
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
)(CardRTCard)