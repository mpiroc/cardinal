import { Map } from 'immutable'

const ADD_USER_VALUE_LISTENER = 'ADD_USER_LISTENER'
const ADD_USER_DECK_ADDED_LISTENER = 'ADD_USER_DECK_ADDED_LISTENER'
const ADD_USER_DECK_REMOVED_LISTENER = 'ADD_USER_DECK_REMOVED_LISTENER'
const ADD_USER_DECK_VALUE_LISTENER = 'ADD_USER_DECK_VALUE_LISTENER'
const ADD_DECK_CARD_ADDED_LISTENER = 'ADD_DECK_CARD_ADDED_LISTENER'
const ADD_DECK_CARD_REMOVED_LISTENER = 'ADD_DECK_CARD_REMOVED_LISTENER'
const ADD_DECK_CARD_VALUE_LISTENER = 'ADD_DECK_CARD_VALUE_LISTENER'

export function addUserValueListener(uid) {
  return {
    type: ADD_USER_VALUE_LISTENER,
    uid,
  }
}

export function addUserDeckAddedListener(uid) {
  return {
    type: ADD_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function addUserDeckRemovedListener(uid) {
  return {
    type: ADD_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function addUserDeckValueListener(uid, deckId) {
  return {
    type: ADD_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function addDeckCardAddedListener(deckId) {
  return {
    type: ADD_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function addDeckCardRemovedListener(deckId) {
  return {
    type: ADD_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function addDeckCardValueListener(deckId, cardId) {
  return {
    type: ADD_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

const initialUserDecksState = Map({
  added: false,
  removed: false,
  decks: Map(),
})

function userDecks(state = initialUserDecksState, action) {
  switch(action.type) {
    case ADD_USER_DECK_ADDED_LISTENER:
      return state.set('added', true)
    case ADD_USER_DECK_REMOVED_LISTENER:
      return state.set('removed', true)
    case ADD_USER_DECK_VALUE_LISTENER:
      return state.setIn(['decks', action.deckId], true)
    default:
      return state
  }
}

const initialDeckCardsState = Map({
  added: false,
  removed: false,
  cards: Map(),
})

function deckCards(state = initialDeckCardsState, action) {
  switch(action.type) {
    case ADD_DECK_CARD_ADDED_LISTENER:
      return state.set('added', true)
    case ADD_DECK_CARD_REMOVED_LISTENER:
      return state.set('removed', true)
    case ADD_DECK_CARD_VALUE_LISTENER:
      return state.setIn(['cards', action.cardId], true)
  }
}

const initialState = Map({
  users: Map(),
  userDecks: Map(),
  deckCards: Map(),
})

function listeners (state = initialState, action) {
  switch(action.type) {
    case ADD_USER_VALUE_LISTENER:
      return state.setIn(['users', action.uid], true)
    case ADD_USER_DECK_ADDED_LISTENER:
    case ADD_USER_DECK_REMOVED_LISTENER:
    case ADD_USER_DECK_VALUE_LISTENER:
      return state.setIn(
        ['userDecks', action.uid],
        userDecks(state.getIn(['userDecks', action.uid]), action)
      )
    case ADD_DECK_CARD_ADDED_LISTENER:
    case ADD_DECK_CARD_REMOVED_LISTENER:
    case ADD_DECK_CARD_VALUE_LISTENER:
      return state.setIn(
        ['deckCards', action.deckId]
        deckCards(state.getIn(['deckCards', action.deckId]), action)
      )
    default:
      return state
  }
}