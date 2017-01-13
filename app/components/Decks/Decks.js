import React, { PropTypes } from 'react'
import DeckRTCardContainer from 'containers/DeckRTCard/DeckRTCardContainer'
import NewDeckRTCardContainer from 'containers/NewDeckRTCard/NewDeckRTCardContainer'
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
      <DecksSnackbarContainer />
    </div>
  )
}

Decks.propTypes = {
  decks: PropTypes.object.isRequired
}