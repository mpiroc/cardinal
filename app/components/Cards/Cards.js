import React, { PropTypes } from 'react'
import CardRTCardContainer from 'containers/CardRTCard/CardRTCardContainer'
import NewCardRTCardContainer from 'containers/NewCardRTCard/NewCardRTCardContainer'
import DeleteCardConfirmationDialogContainer from 'containers/DeleteCardConfirmationDialog/DeleteCardConfirmationDialogContainer'
import EditCardDialogContainer from 'containers/EditCardDialog/EditCardDialogContainer'
import CardsSnackbarContainer from 'containers/Cards/CardsSnackbarContainer'

export default function Cards ({ deckId, cards }) {
  return (
    <div style={{ margin: '1.8rem' }}>
      <div>{
        cards.keySeq().map(
          cardId => <CardRTCardContainer key={cardId} deckId={deckId} cardId={cardId} />
        )
      }</div>
      <NewCardRTCardContainer deckId={deckId} />
      <EditCardDialogContainer />
      <DeleteCardConfirmationDialogContainer />
      <CardsSnackbarContainer />
    </div>
  )
}

Cards.propTypes = {
  deckId: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired,
}