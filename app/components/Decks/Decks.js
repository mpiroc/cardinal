import React, { PropTypes } from 'react'
import DeckRTCardContainer from 'containers/DeckRTCard/DeckRTCardContainer'
import NewDeckRTCardContainer from 'containers/NewDeckRTCard/NewDeckRTCardContainer'
import DeleteDeckConfirmationDialogContainer from 'containers/DeleteDeckConfirmationDialog/DeleteDeckConfirmationDialogContainer'
import EditDeckDialogContainer from 'containers/EditDeckDialog/EditDeckDialogContainer'
import DecksSnackbarContainer from 'containers/Decks/DecksSnackbarContainer'

export default function Decks ({ decks }) {
  return (
    <div style={{ margin: '1.8rem' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '-0.9rem'
      }}>{
        decks.keySeq().map(
          deckId => <DeckRTCardContainer key={deckId} deckId={deckId} />
        )
      }</div>
      <NewDeckRTCardContainer />
      <DeleteDeckConfirmationDialogContainer />
      <EditDeckDialogContainer />
      <DecksSnackbarContainer />
    </div>
  )
}

Decks.propTypes = {
  decks: PropTypes.object.isRequired
}