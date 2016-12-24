import { Map } from 'immutable'

const UPDATE_CARD_VALUE = 'UPDATE_CARD_VALUE'

function updateCardValue(card) {
  return {
    type: UPDATE_CARD_VALUE,
    card,
  }
}

const initialCardState = Map({
  cardId: '',
  side1: '',
  side2: '',
})

function card(state = initialCardState, action) {
  switch(action.type) {
    case UPDATE_CARD_VALUE:
      return state.merge(action.card)
    default:
      return state
  }
}

const initialState = Map({
  cards: Map(),
})

export default function cards(state = initialState, action) {
  switch(action.type) {
    case UPDATE_CARD_VALUE:
      const path = ['cards', action.card.cardId]
      return state.setIn(path, card(state.getIn(path), action.card))
    default:
      return state
  }
}