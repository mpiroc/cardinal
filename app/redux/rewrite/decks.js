import { Map } from 'immutable'

const UPDATE_DECK_VALUE = 'UPDATE_DECK_VALUE'

function updateDeckValue(deck) {
  return {
    type: UPDATE_DECK_VALUE,
    deck,
  }
}

const initialDeckState = Map({
  deckId: '',
  name: '',
})

function deck(state = initialDeckState, action) {
  switch (action.type) {
    case UPDATE_DECK_VALUE:
      return state.merge(action.deck)
    default:
      return state
  }
}

const initialState = Map({
  decks: Map(),
})

export default function decks(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DECK_VALUE:
      const path = ['decks', action.deck.deckId]
      return state.setIn(path, deck(state.getIn(path), action.deck))
  }
}