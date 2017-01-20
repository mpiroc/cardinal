import { Map } from 'immutable'
import * as fb from 'helpers/firebase'
import * as usersModule from './users'
import * as decksModule from './decks'
import * as cardsModule from './cards'

// actions
const ADD_USER_VALUE_LISTENER = 'ADD_USER_VALUE_LISTENER'
const ADD_USER_DECK_ADDED_LISTENER = 'ADD_USER_DECK_ADDED_LISTENER'
const ADD_USER_DECK_REMOVED_LISTENER = 'ADD_USER_DECK_REMOVED_LISTENER'
const ADD_USER_DECK_VALUE_LISTENER = 'ADD_USER_DECK_VALUE_LISTENER'
const ADD_DECK_CARD_ADDED_LISTENER = 'ADD_DECK_CARD_ADDED_LISTENER'
const ADD_DECK_CARD_REMOVED_LISTENER = 'ADD_DECK_CARD_REMOVED_LISTENER'
const ADD_DECK_CARD_VALUE_LISTENER = 'ADD_DECK_CARD_VALUE_LISTENER'
const ADD_CARD_HISTORY_ADDED_LISTENER = 'ADD_CARD_HISTORY_ADDED_LISTENER'
const ADD_CARD_HISTORY_VALUE_LISTENER = 'ADD_CARD_HISTORY_VALUE_LISTENER'
const ADD_AUTH_STATE_CHANGED_LISTENER = 'ADD_AUTH_STATE_CHANGED_LISTENER'
const REMOVE_USER_VALUE_LISTENER = 'REMOVE_USER_LISTENER'
const REMOVE_USER_DECK_ADDED_LISTENER = 'REMOVE_USER_DECK_ADDED_LISTENER'
const REMOVE_USER_DECK_REMOVED_LISTENER = 'REMOVE_USER_DECK_REMOVED_LISTENER'
const REMOVE_USER_DECK_VALUE_LISTENER = 'REMOVE_USER_DECK_VALUE_LISTENER'
const REMOVE_DECK_CARD_ADDED_LISTENER = 'REMOVE_DECK_CARD_ADDED_LISTENER'
const REMOVE_DECK_CARD_REMOVED_LISTENER = 'REMOVE_DECK_CARD_REMOVED_LISTENER'
const REMOVE_DECK_CARD_VALUE_LISTENER = 'REMOVE_DECK_CARD_VALUE_LISTENER'
const REMOVE_CARD_HISTORY_ADDED_LISTENER = 'REMOVE_CARD_HISTORY_ADDED_LISTENER'
const REMOVE_CARD_HISTORY_VALUE_LISTENER = 'REMOVE_CARD_HISTORY_VALUE_LISTENER'

// thunks


// action creators
export function addUserValueListenerFlag(uid) {
  return {
    type: ADD_USER_VALUE_LISTENER,
    uid,
  }
}

export function addUserDeckAddedListenerFlag(uid) {
  return {
    type: ADD_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function addUserDeckRemovedListenerFlag(uid) {
  return {
    type: ADD_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function addUserDeckValueListenerFlag(uid, deckId) {
  return {
    type: ADD_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function addDeckCardAddedListenerFlag(deckId) {
  return {
    type: ADD_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function addDeckCardRemovedListenerFlag(deckId) {
  return {
    type: ADD_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function addDeckCardValueListenerFlag(deckId, cardId) {
  return {
    type: ADD_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function addCardHistoryAddedListenerFlag(deckId) {
  return {
    type: ADD_CARD_HISTORY_ADDED_LISTENER,
    deckId,
  }
}

export function addCardHistoryValueListenerFlag(deckId, cardId) {
  return {
    type: ADD_CARD_HISTORY_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function addAuthStateChangedListenerFlag() {
  return {
    type: ADD_AUTH_STATE_CHANGED_LISTENER
  }
}

export function removeUserValueListenerFlag(uid) {
  return {
    type: REMOVE_USER_VALUE_LISTENER,
    uid,
  }
}

export function removeUserDeckAddedListenerFlag(uid) {
  return {
    type: REMOVE_USER_DECK_ADDED_LISTENER,
    uid,
  }
}

export function removeUserDeckRemovedListenerFlag(uid) {
  return {
    type: REMOVE_USER_DECK_REMOVED_LISTENER,
    uid,
  }
}

export function removeUserDeckValueListenerFlag(uid, deckId) {
  return {
    type: REMOVE_USER_DECK_VALUE_LISTENER,
    uid,
    deckId,
  }
}

export function removeDeckCardAddedListenerFlag(deckId) {
  return {
    type: REMOVE_DECK_CARD_ADDED_LISTENER,
    deckId,
  }
}

export function removeDeckCardRemovedListenerFlag(deckId) {
  return {
    type: REMOVE_DECK_CARD_REMOVED_LISTENER,
    deckId,
  }
}

export function removeDeckCardValueListenerFlag(deckId, cardId) {
  return {
    type: REMOVE_DECK_CARD_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

export function removeCardHistoryAddedListenerFlag(deckId) {
  return {
    type: REMOVE_CARD_HISTORY_ADDED_LISTENER,
    deckId,
  }
}

export function removeCardHistoryValueListenerFlag(deckId, cardId) {
  return {
    type: REMOVE_CARD_HISTORY_VALUE_LISTENER,
    deckId,
    cardId,
  }
}

// userDecks reducer
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
    case REMOVE_USER_DECK_ADDED_LISTENER:
      return state.set('added', false)
    case REMOVE_USER_DECK_REMOVED_LISTENER:
      return state.set('removed', false)
    case REMOVE_USER_DECK_VALUE_LISTENER:
      return state.deleteIn(['decks', action.deckId])
    default:
      return state
  }
}

// deckCards reducer
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
    case REMOVE_DECK_CARD_ADDED_LISTENER:
      return state.set('added', false)
    case REMOVE_DECK_CARD_REMOVED_LISTENER:
      return state.set('removed', false)
    case REMOVE_DECK_CARD_VALUE_LISTENER:
      return state.deleteIn(['cards', action.cardId])
    default:
      return state
  }
}

// cardHistories reducer
const initialCardHistoriesState = Map({
  added: false,
  histories: Map(),
})

function cardHistories(state = initialCardHistoriesState, action) {
  switch(action.type) {
    case ADD_CARD_HISTORY_ADDED_LISTENER:
      return state.set('added', true)
    case ADD_CARD_HISTORY_VALUE_LISTENER:
      return state.setIn(['histories', action.cardId], true)
    case REMOVE_CARD_HISTORY_ADDED_LISTENER:
      return state.set('added', false)
    case REMOVE_CARD_HISTORY_VALUE_LISTENER:
      return state.deleteIn(['histories', action.cardId])
    default:
      return state
  }
}

// listeners reducer
const initialState = Map({
  users: Map(),
  userDecks: Map(),
  deckCards: Map(),
  cardHistories: Map(),
  authStateChanged: false,
})

export default function listeners (state = initialState, action) {
  let path = []
  switch(action.type) {
    case ADD_USER_VALUE_LISTENER:
      return state.setIn(['users', action.uid], true)
    case ADD_USER_DECK_ADDED_LISTENER:
    case ADD_USER_DECK_REMOVED_LISTENER:
    case ADD_USER_DECK_VALUE_LISTENER:
      path = ['userDecks', action.uid]
      return state.setIn(path, userDecks(state.getIn(path), action))
    case ADD_DECK_CARD_ADDED_LISTENER:
    case ADD_DECK_CARD_REMOVED_LISTENER:
    case ADD_DECK_CARD_VALUE_LISTENER:
      path = ['deckCards', action.deckId]
      return state.setIn(path, deckCards(state.getIn(path), action))
    case ADD_CARD_HISTORY_ADDED_LISTENER:
    case ADD_CARD_HISTORY_VALUE_LISTENER:
      path = ['cardHistories', action.deckId]
      return state.setIn(path, cardHistories(state.getIn(path), action))
    case ADD_AUTH_STATE_CHANGED_LISTENER:
      return state.set('authStateChanged', true)
    case REMOVE_USER_VALUE_LISTENER:
      return state.deleteIn(['users', action.uid], true)
    case REMOVE_USER_DECK_ADDED_LISTENER:
    case REMOVE_USER_DECK_REMOVED_LISTENER:
    case REMOVE_USER_DECK_VALUE_LISTENER:
      path = ['userDecks', action.uid]
      return state.setIn(path, userDecks(state.getIn(path), action))
    case REMOVE_DECK_CARD_ADDED_LISTENER:
    case REMOVE_DECK_CARD_REMOVED_LISTENER:
    case REMOVE_DECK_CARD_VALUE_LISTENER:
      path = ['deckCards', action.deckId]
      return state.setIn(path, deckCards(state.getIn(path), action))
    case REMOVE_CARD_HISTORY_ADDED_LISTENER:
    case REMOVE_CARD_HISTORY_VALUE_LISTENER:
      path = ['cardHistories', action.deckId]
      return state.setIn(path, cardHistories(state.getIn(path), action))
    default:
      return state
  }
}