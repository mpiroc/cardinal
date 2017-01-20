import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { setAndHandleCardHistoryValueListener } from 'redux/modules/firebase'
import CardRTCard from 'components/CardRTCard/CardRTCard'
import { openDeleteCardConfirmationDialog } from 'redux/modules/deleteCardConfirmationDialog'
import { openEditCardDialog } from 'redux/modules/editCardDialog'


class CardRTCardContainer extends React.Component {
  componentDidMount() {
    const {
      deckId,
      cardId,
      setAndHandleCardHistoryValueListener,
    } = this.props

    // Neccessary to determine and display the next due date.
    setAndHandleCardHistoryValueListener(deckId, cardId)
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
    setAndHandleCardHistoryValueListener,
    openDeleteCardConfirmationDialog,
    openEditCardDialog,
  }, dispatch)
}

function mergeProps (
    { isLoading, isDeleting, side1, side2, nextReview, },
    { setAndHandleCardHistoryValueListener, openEditCardDialog, openDeleteCardConfirmationDialog },
    { deckId, cardId }) {
  return {
    isLoading,
    isDeleting,
    side1,
    side2,
    nextReview,
    deckId,
    cardId,
    setAndHandleCardHistoryValueListener,
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