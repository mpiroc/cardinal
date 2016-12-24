import { Map } from 'immutable'

const UPDATE_DECK_VALUE = 'UPDATE_DECK_VALUE'
const ADD_DECK_CARD = 'ADD_DECK_CARD'
const REMOVE_DECK_CARD = 'REMOVE_DECK_CARD'

function updateDeckValue(deck) {
  return {
    type: UPDATE_DECK_VALUE,
    deck,
  }
}

function addDeckCard(deckId, cardId) {
  return {
    type: ADD_DECK_CARD,
    deckId,
    cardId,
  }
}

function removeDeckCard(deckId, cardId) {
  return {
    type: REMOVE_DECK_CARD,
    deckId,
    cardId,
  }
}

const initialDeckState = Map({
  deckId: '',
  name: '',
  cards: Map(),
})

function deck(state = initialDeckState, action) {
  switch (action.type) {
    case UPDATE_DECK_VALUE:
      return state.merge(action.deck)
    case ADD_DECK_CARD:
      return state.setIn(['cards', action.cardId], true)
    case REMOVE_DECK_CARD:
      return state.deleteIn(['cards', action.cardId])
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
      return state.setIn(path, deck(state.getIn(path), action))
    case ADD_DECK_CARD:
    case REMOVE_DECK_CARD:
      const path = ['decks', action.deckId]
      return state.setIn(path, deck(state.getIn(path), action))
    default:
      return state
  }
}