import { Map } from 'immutable'

const ADD_DECK_CARD = 'ADD_DECK_CARD'
const REMOVE_DECK_CARD = 'REMOVE_DECK_CARD'
const SETTING_DECK_VALUE_LISTENER = 'SETTING_DECK_VALUE_LISTENER'
const SETTING_DECK_VALUE_LISTENER_SUCCESS = 'SETTING_DECK_VALUE_LISTENER_SUCCESS'
const SETTING_DECK_VALUE_LISTENER_FAILURE = 'SETTING_DECK_VALUE_LISTENER_FAILURE'

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

function settingDeckValueListener(deckId) {
  return {
    type: SETTING_DECK_VALUE_LISTENER,
    deckId,
  }
}

function settingDeckValueListenerSuccess(deckId, deck) {
  return {
    type: SETTING_DECK_VALUE_LISTENER_SUCCESS,
    deckId,
    deck,
  }
}

function settingDeckValueListenerFailure(deckId, error) {
  return {
    type: SETTING_DECK_VALUE_LISTENER_FAILURE,
    deckId,
    error,
  }
}

const initialDeckState = Map({
  isLoading: true,
  loadingError: '',

  deckId: '',
  name: '',
  cards: Map(),
})

function deck(state = initialDeckState, action) {
  switch (action.type) {
    case ADD_DECK_CARD:
      return state.setIn(['cards', action.cardId], true)
    case REMOVE_DECK_CARD:
      return state.deleteIn(['cards', action.cardId])
    case SETTING_DECK_VALUE_LISTENER:
      return state
        .set('isLoading', true)
        .set('loadingError', '')
    case SETTING_DECK_VALUE_LISTENER_SUCCESS:
      // TODO: Can action.deck be null?
      return state
        .set('isLoading', false)
        .set('loadingError', '')
        .merge(action.deck)
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
      return state
        .set('isLoading', false)
        .set('loadingError', action.error)
    default:
      return state
  }
}

const initialState = Map({
  decks: Map(),
})

export default function decks(state = initialState, action) {
  switch (action.type) {
    case ADD_DECK_CARD:
    case REMOVE_DECK_CARD:
    case SETTING_DECK_VALUE_LISTENER:
    case SETTING_DECK_VALUE_LISTENER_SUCCESS:
    case SETTING_DECK_VALUE_LISTENER_FAILURE:
      const path = ['decks', action.deckId]
      return state.setIn(path, deck(state.getIn(path), action))
    default:
      return state
  }
}